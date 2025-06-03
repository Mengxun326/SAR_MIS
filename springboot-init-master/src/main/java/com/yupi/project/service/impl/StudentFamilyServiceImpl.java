package com.yupi.project.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yupi.project.common.ErrorCode;
import com.yupi.project.constant.CommonConstant;
import com.yupi.project.exception.BusinessException;
import com.yupi.project.mapper.StudentFamilyMapper;
import com.yupi.project.model.dto.studentfamily.StudentFamilyQueryRequest;
import com.yupi.project.model.entity.StudentFamily;
import com.yupi.project.service.StudentFamilyService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

/**
 * 学生家庭信息服务实现
 */
@Service
public class StudentFamilyServiceImpl extends ServiceImpl<StudentFamilyMapper, StudentFamily>
        implements StudentFamilyService {

    @Override
    public boolean addStudentFamily(StudentFamily studentFamily) {
        if (studentFamily == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        // 校验必要参数
        validStudentFamily(studentFamily, true);
        
        return this.save(studentFamily);
    }

    @Override
    public boolean updateStudentFamily(StudentFamily studentFamily) {
        if (studentFamily == null || studentFamily.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        // 校验必要参数
        validStudentFamily(studentFamily, false);
        
        // 判断是否存在
        StudentFamily oldStudentFamily = this.getById(studentFamily.getId());
        if (oldStudentFamily == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        
        return this.updateById(studentFamily);
    }

    @Override
    public Page<StudentFamily> listStudentFamilyByPage(StudentFamilyQueryRequest studentFamilyQueryRequest) {
        if (studentFamilyQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        StudentFamily studentFamilyQuery = new StudentFamily();
        BeanUtils.copyProperties(studentFamilyQueryRequest, studentFamilyQuery);
        
        long current = studentFamilyQueryRequest.getCurrent();
        long size = studentFamilyQueryRequest.getPageSize();
        String sortField = studentFamilyQueryRequest.getSortField();
        String sortOrder = studentFamilyQueryRequest.getSortOrder();
        
        // 限制爬虫
        if (size > 50) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        QueryWrapper<StudentFamily> queryWrapper = new QueryWrapper<>(studentFamilyQuery);
        queryWrapper.orderBy(StringUtils.isNotBlank(sortField),
                sortOrder.equals(CommonConstant.SORT_ORDER_ASC), sortField);
        
        return this.page(new Page<>(current, size), queryWrapper);
    }

    /**
     * 校验学生家庭信息
     *
     * @param studentFamily
     * @param add
     */
    private void validStudentFamily(StudentFamily studentFamily, boolean add) {
        if (studentFamily == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        String studentId = studentFamily.getStudentId();
        String parentName = studentFamily.getParentName();
        String relationship = studentFamily.getRelationship();
        String phone = studentFamily.getPhone();
        
        // 创建时，参数不能为空
        if (add) {
            if (StringUtils.isAnyBlank(studentId, parentName, relationship, phone)) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "必填参数不能为空");
            }
        }
    }
} 