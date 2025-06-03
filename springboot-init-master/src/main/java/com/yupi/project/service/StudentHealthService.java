package com.yupi.project.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yupi.project.model.dto.studenthealth.StudentHealthQueryRequest;
import com.yupi.project.model.entity.StudentHealth;

/**
 * 学生健康信息服务
 */
public interface StudentHealthService extends IService<StudentHealth> {

    /**
     * 添加学生健康信息
     *
     * @param studentHealth
     * @return
     */
    boolean addStudentHealth(StudentHealth studentHealth);

    /**
     * 更新学生健康信息
     *
     * @param studentHealth
     * @return
     */
    boolean updateStudentHealth(StudentHealth studentHealth);

    /**
     * 分页获取学生健康信息列表
     *
     * @param studentHealthQueryRequest
     * @return
     */
    Page<StudentHealth> listStudentHealthByPage(StudentHealthQueryRequest studentHealthQueryRequest);
} 