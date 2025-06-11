package com.yupi.project.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yupi.project.common.ErrorCode;
import com.yupi.project.constant.CommonConstant;
import com.yupi.project.exception.BusinessException;
import com.yupi.project.mapper.StudentPunishmentMapper;
import com.yupi.project.model.dto.studentpunishment.StudentPunishmentQueryRequest;
import com.yupi.project.model.entity.StudentPunishment;
import com.yupi.project.service.StudentPunishmentService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

/**
 * 学生处分信息服务实现
 */
@Service
public class StudentPunishmentServiceImpl extends ServiceImpl<StudentPunishmentMapper, StudentPunishment>
        implements StudentPunishmentService {

    /**
     * 有效处分类型列表
     */
    private static final List<String> VALID_PUNISHMENT_TYPES = Arrays.asList(
            "警告", "严重警告", "记过", "记大过", "开除");

    @Override
    public void validStudentPunishment(StudentPunishment studentPunishment, boolean add) {
        if (studentPunishment == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        String studentId = studentPunishment.getStudentId();
        String punishmentType = studentPunishment.getPunishmentType();
        String reason = studentPunishment.getReason();
        Date punishmentDate = studentPunishment.getPunishmentDate();

        // 创建时，参数不能为空
        if (add) {
            if (StringUtils.isAnyBlank(studentId, punishmentType, reason)) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数不能为空");
            }
            if (punishmentDate == null) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "处分日期不能为空");
            }
        }

        // 有参数则校验
        if (StringUtils.isNotBlank(punishmentType) && !VALID_PUNISHMENT_TYPES.contains(punishmentType)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "处分类型不合法");
        }
    }

    @Override
    public boolean addStudentPunishment(StudentPunishment studentPunishment) {
        // 校验
        validStudentPunishment(studentPunishment, true);

        return this.save(studentPunishment);
    }

    @Override
    public boolean updateStudentPunishment(StudentPunishment studentPunishment) {
        // 校验
        validStudentPunishment(studentPunishment, false);

        // 判断是否存在
        Long id = studentPunishment.getId();
        if (id == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        StudentPunishment oldPunishment = this.getById(id);
        if (oldPunishment == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }

        // 如果处分已解除，不允许修改
        if (oldPunishment.getCancelDate() != null) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "处分已解除，不能修改");
        }

        return this.updateById(studentPunishment);
    }

    @Override
    public Page<StudentPunishment> listStudentPunishmentByPage(StudentPunishmentQueryRequest studentPunishmentQueryRequest) {
        if (studentPunishmentQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        String studentId = studentPunishmentQueryRequest.getStudentId();
        String punishmentType = studentPunishmentQueryRequest.getPunishmentType();
        Boolean isRevoked = studentPunishmentQueryRequest.getIsRevoked();

        long current = studentPunishmentQueryRequest.getCurrent();
        long size = studentPunishmentQueryRequest.getPageSize();
        String sortField = studentPunishmentQueryRequest.getSortField();
        String sortOrder = studentPunishmentQueryRequest.getSortOrder();

        // 限制爬虫
        if (size > 50) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        QueryWrapper<StudentPunishment> queryWrapper = new QueryWrapper<>();
        
        // 添加查询条件
        if (StringUtils.isNotBlank(studentId)) {
            queryWrapper.eq("studentId", studentId);
        }
        if (StringUtils.isNotBlank(punishmentType)) {
            queryWrapper.eq("punishmentType", punishmentType);
        }
        if (isRevoked != null) {
            if (isRevoked) {
                queryWrapper.isNotNull("cancelDate");
            } else {
                queryWrapper.isNull("cancelDate");
            }
        }
        
        // 添加日期范围查询
        if (studentPunishmentQueryRequest.getStartDate() != null) {
            queryWrapper.ge("punishDate", studentPunishmentQueryRequest.getStartDate());
        }
        if (studentPunishmentQueryRequest.getEndDate() != null) {
            queryWrapper.le("punishDate", studentPunishmentQueryRequest.getEndDate());
        }
        
        // 排序
        if (StringUtils.isNotBlank(sortField)) {
            queryWrapper.orderBy(true,
                    CommonConstant.SORT_ORDER_ASC.equals(sortOrder),
                    sortField);
        } else {
            // 默认按处分日期倒序
            queryWrapper.orderByDesc("punishDate");
        }

        return this.page(new Page<>(current, size), queryWrapper);
    }

    @Override
    public boolean revokeStudentPunishment(Long id) {
        if (id == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        // 判断是否存在
        StudentPunishment studentPunishment = this.getById(id);
        if (studentPunishment == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }

        // 判断是否已解除
        if (studentPunishment.getCancelDate() != null) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "处分已解除");
        }

        // 更新处分状态 - 设置解除日期
        studentPunishment.setCancelDate(new Date());

        return this.updateById(studentPunishment);
    }
} 