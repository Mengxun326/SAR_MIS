package com.yupi.project.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yupi.project.common.ErrorCode;
import com.yupi.project.constant.CommonConstant;
import com.yupi.project.exception.BusinessException;
import com.yupi.project.mapper.StudentStatusChangeMapper;
import com.yupi.project.model.dto.studentstatuschange.StudentStatusChangeQueryRequest;
import com.yupi.project.model.entity.StudentStatusChange;
import com.yupi.project.service.StudentStatusChangeService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

/**
 * 学生学籍异动信息服务实现
 */
@Service
public class StudentStatusChangeServiceImpl extends ServiceImpl<StudentStatusChangeMapper, StudentStatusChange>
        implements StudentStatusChangeService {

    /**
     * 有效异动类型列表
     */
    private static final List<String> VALID_CHANGE_TYPES = Arrays.asList(
            "休学", "复学", "退学", "转专业", "转学");

    @Override
    public void validStudentStatusChange(StudentStatusChange studentStatusChange, boolean add) {
        if (studentStatusChange == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        String studentId = studentStatusChange.getStudentId();
        String changeType = studentStatusChange.getChangeType();
        String reason = studentStatusChange.getReason();
        Date changeDate = studentStatusChange.getChangeDate();

        // 创建时，参数不能为空
        if (add) {
            if (StringUtils.isAnyBlank(studentId, changeType, reason)) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数不能为空");
            }
            if (changeDate == null) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "异动日期不能为空");
            }
        }

        // 有参数则校验
        if (StringUtils.isNotBlank(changeType) && !VALID_CHANGE_TYPES.contains(changeType)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "异动类型不合法");
        }
    }

    @Override
    public boolean addStudentStatusChange(StudentStatusChange studentStatusChange) {
        // 校验
        validStudentStatusChange(studentStatusChange, true);

        // 初始化审批状态为待审批
        studentStatusChange.setStatus("待审批");
        
        // 申请时审批人为空，在审批时才设置
        studentStatusChange.setApprover("待分配");

        return this.save(studentStatusChange);
    }

    @Override
    public boolean updateStudentStatusChange(StudentStatusChange studentStatusChange) {
        // 校验
        validStudentStatusChange(studentStatusChange, false);

        // 判断是否存在
        Long id = studentStatusChange.getId();
        if (id == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        StudentStatusChange oldStatusChange = this.getById(id);
        if (oldStatusChange == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }

        // 如果已审批，不允许修改
        if (!"待审批".equals(oldStatusChange.getStatus())) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "已审批的申请不能修改");
        }

        return this.updateById(studentStatusChange);
    }

    @Override
    public Page<StudentStatusChange> listStudentStatusChangeByPage(StudentStatusChangeQueryRequest studentStatusChangeQueryRequest) {
        if (studentStatusChangeQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        StudentStatusChange studentStatusChangeQuery = new StudentStatusChange();
        String studentId = studentStatusChangeQueryRequest.getStudentId();
        String changeType = studentStatusChangeQueryRequest.getChangeType();
        String status = studentStatusChangeQueryRequest.getStatus();

        if (StringUtils.isNotBlank(studentId)) {
            studentStatusChangeQuery.setStudentId(studentId);
        }
        if (StringUtils.isNotBlank(changeType)) {
            studentStatusChangeQuery.setChangeType(changeType);
        }
        if (StringUtils.isNotBlank(status)) {
            studentStatusChangeQuery.setStatus(status);
        }

        long current = studentStatusChangeQueryRequest.getCurrent();
        long size = studentStatusChangeQueryRequest.getPageSize();
        String sortField = studentStatusChangeQueryRequest.getSortField();
        String sortOrder = studentStatusChangeQueryRequest.getSortOrder();

        // 限制爬虫
        if (size > 50) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        QueryWrapper<StudentStatusChange> queryWrapper = new QueryWrapper<>(studentStatusChangeQuery);
        queryWrapper.ge(studentStatusChangeQueryRequest.getStartDate() != null, "changeDate",
                studentStatusChangeQueryRequest.getStartDate());
        queryWrapper.le(studentStatusChangeQueryRequest.getEndDate() != null, "changeDate",
                studentStatusChangeQueryRequest.getEndDate());
        queryWrapper.orderBy(StringUtils.isNotBlank(sortField),
                sortOrder.equals(CommonConstant.SORT_ORDER_ASC),
                sortField);

        return this.page(new Page<>(current, size), queryWrapper);
    }

    @Override
    public boolean approveStudentStatusChange(Long id, String approvalStatus, String approvalComment, String approver) {
        if (id == null || StringUtils.isBlank(approvalStatus) || StringUtils.isBlank(approver)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        // 判断是否存在
        StudentStatusChange studentStatusChange = this.getById(id);
        if (studentStatusChange == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }

        // 判断是否已审批
        if (!"待审批".equals(studentStatusChange.getStatus())) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "该申请已审批");
        }

        // 更新审批信息
        studentStatusChange.setStatus(approvalStatus);
        studentStatusChange.setApprover(approver);

        return this.updateById(studentStatusChange);
    }
} 