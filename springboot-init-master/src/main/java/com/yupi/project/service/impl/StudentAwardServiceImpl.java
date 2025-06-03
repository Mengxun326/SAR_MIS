package com.yupi.project.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yupi.project.common.ErrorCode;
import com.yupi.project.exception.BusinessException;
import com.yupi.project.mapper.StudentAwardMapper;
import com.yupi.project.model.dto.studentaward.StudentAwardQueryRequest;
import com.yupi.project.model.entity.Student;
import com.yupi.project.model.entity.StudentAward;
import com.yupi.project.service.StudentAwardService;
import com.yupi.project.service.StudentService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 学生奖励服务实现
 */
@Service
@Slf4j
public class StudentAwardServiceImpl extends ServiceImpl<StudentAwardMapper, StudentAward> implements StudentAwardService {

    @Resource
    private StudentService studentService;

    @Override
    public void validStudentAward(StudentAward studentAward, boolean add) {
        if (studentAward == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        String studentId = studentAward.getStudentId();
        String awardName = studentAward.getAwardName();
        String awardLevel = studentAward.getAwardLevel();

        // 创建时，参数不能为空
        if (add) {
            if (StringUtils.isAnyBlank(studentId, awardName, awardLevel)) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR);
            }
        }
        // 有参数则校验
        if (StringUtils.isNotBlank(studentId)) {
            // 校验学号是否存在
            QueryWrapper<Student> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("studentId", studentId);
            long count = studentService.count(queryWrapper);
            if (count <= 0) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "学号不存在");
            }
        }
    }

    @Override
    public QueryWrapper<StudentAward> getQueryWrapper(StudentAwardQueryRequest studentAwardQueryRequest) {
        if (studentAwardQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }

        StudentAward studentAwardQuery = new StudentAward();
        String studentId = studentAwardQueryRequest.getStudentId();
        String awardName = studentAwardQueryRequest.getAwardName();
        String awardLevel = studentAwardQueryRequest.getAwardLevel();

        QueryWrapper<StudentAward> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq(StringUtils.isNotBlank(studentId), "studentId", studentId);
        queryWrapper.like(StringUtils.isNotBlank(awardName), "awardName", awardName);
        queryWrapper.eq(StringUtils.isNotBlank(awardLevel), "awardLevel", awardLevel);
        return queryWrapper;
    }

    @Override
    public boolean addStudentAward(StudentAward studentAward) {
        // 校验
        validStudentAward(studentAward, true);
        return this.save(studentAward);
    }

    @Override
    public boolean updateStudentAward(StudentAward studentAward) {
        // 校验
        validStudentAward(studentAward, false);
        return this.updateById(studentAward);
    }

    @Override
    public Page<StudentAward> listStudentAwardByPage(StudentAwardQueryRequest studentAwardQueryRequest) {
        if (studentAwardQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        long current = studentAwardQueryRequest.getCurrent();
        long size = studentAwardQueryRequest.getPageSize();
        // 限制爬虫
        if (size > 50) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        QueryWrapper<StudentAward> queryWrapper = getQueryWrapper(studentAwardQueryRequest);
        return this.page(new Page<>(current, size), queryWrapper);
    }

    @Override
    public long getMonthlyAwardCount(String month) {
        if (StringUtils.isBlank(month)) {
            return 0;
        }
        
        QueryWrapper<StudentAward> queryWrapper = new QueryWrapper<>();
        // 查询指定月份的奖励记录，格式 2024-01
        queryWrapper.like("awardDate", month);
        return this.count(queryWrapper);
    }
} 