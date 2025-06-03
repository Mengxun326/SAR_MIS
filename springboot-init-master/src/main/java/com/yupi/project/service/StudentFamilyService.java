package com.yupi.project.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yupi.project.model.dto.studentfamily.StudentFamilyQueryRequest;
import com.yupi.project.model.entity.StudentFamily;

/**
 * 学生家庭信息服务
 */
public interface StudentFamilyService extends IService<StudentFamily> {

    /**
     * 添加学生家庭信息
     *
     * @param studentFamily
     * @return
     */
    boolean addStudentFamily(StudentFamily studentFamily);

    /**
     * 更新学生家庭信息
     *
     * @param studentFamily
     * @return
     */
    boolean updateStudentFamily(StudentFamily studentFamily);

    /**
     * 分页获取学生家庭信息列表
     *
     * @param studentFamilyQueryRequest
     * @return
     */
    Page<StudentFamily> listStudentFamilyByPage(StudentFamilyQueryRequest studentFamilyQueryRequest);
} 