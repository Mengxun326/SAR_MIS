package com.yupi.project.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yupi.project.model.dto.student.StudentQueryRequest;
import com.yupi.project.model.entity.Student;

/**
 * 学生服务
 */
public interface StudentService extends IService<Student> {

    /**
     * 添加学生
     *
     * @param student 学生信息
     * @return 是否添加成功
     */
    boolean addStudent(Student student);

    /**
     * 校验学生信息
     *
     * @param student      学生信息
     * @param add 是否为创建校验
     */
    void validStudent(Student student, boolean add);

    /**
     * 获取查询条件
     *
     * @param studentQueryRequest
     * @return
     */
    QueryWrapper<Student> getQueryWrapper(StudentQueryRequest studentQueryRequest);

    /**
     * 分页获取学生列表
     *
     * @param studentQueryRequest
     * @return
     */
    Page<Student> listStudentByPage(StudentQueryRequest studentQueryRequest);
} 