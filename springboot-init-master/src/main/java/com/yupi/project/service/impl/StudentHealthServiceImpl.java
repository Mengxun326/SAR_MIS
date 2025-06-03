package com.yupi.project.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yupi.project.common.ErrorCode;
import com.yupi.project.constant.CommonConstant;
import com.yupi.project.exception.BusinessException;
import com.yupi.project.mapper.StudentHealthMapper;
import com.yupi.project.model.dto.studenthealth.StudentHealthQueryRequest;
import com.yupi.project.model.entity.StudentHealth;
import com.yupi.project.service.StudentHealthService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

/**
 * 学生健康信息服务实现
 */
@Service
public class StudentHealthServiceImpl extends ServiceImpl<StudentHealthMapper, StudentHealth>
        implements StudentHealthService {

    @Override
    public boolean addStudentHealth(StudentHealth studentHealth) {
        if (studentHealth == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        return this.save(studentHealth);
    }

    @Override
    public boolean updateStudentHealth(StudentHealth studentHealth) {
        if (studentHealth == null || studentHealth.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        // 判断是否存在
        StudentHealth oldStudentHealth = this.getById(studentHealth.getId());
        if (oldStudentHealth == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        
        return this.updateById(studentHealth);
    }

    @Override
    public Page<StudentHealth> listStudentHealthByPage(StudentHealthQueryRequest studentHealthQueryRequest) {
        if (studentHealthQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        StudentHealth studentHealthQuery = new StudentHealth();
        BeanUtils.copyProperties(studentHealthQueryRequest, studentHealthQuery);
        
        long current = studentHealthQueryRequest.getCurrent();
        long size = studentHealthQueryRequest.getPageSize();
        String sortField = studentHealthQueryRequest.getSortField();
        String sortOrder = studentHealthQueryRequest.getSortOrder();
        
        // 限制爬虫
        if (size > 50) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        QueryWrapper<StudentHealth> queryWrapper = new QueryWrapper<>(studentHealthQuery);
        queryWrapper.orderBy(StringUtils.isNotBlank(sortField),
                sortOrder.equals(CommonConstant.SORT_ORDER_ASC), sortField);
        
        return this.page(new Page<>(current, size), queryWrapper);
    }
} 