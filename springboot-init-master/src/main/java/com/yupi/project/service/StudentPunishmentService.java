package com.yupi.project.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yupi.project.model.dto.studentpunishment.StudentPunishmentQueryRequest;
import com.yupi.project.model.entity.StudentPunishment;

/**
 * 学生处分信息服务
 */
public interface StudentPunishmentService extends IService<StudentPunishment> {

    /**
     * 校验学生处分信息
     *
     * @param studentPunishment
     * @param add
     */
    void validStudentPunishment(StudentPunishment studentPunishment, boolean add);

    /**
     * 添加学生处分信息
     *
     * @param studentPunishment
     * @return
     */
    boolean addStudentPunishment(StudentPunishment studentPunishment);

    /**
     * 更新学生处分信息
     *
     * @param studentPunishment
     * @return
     */
    boolean updateStudentPunishment(StudentPunishment studentPunishment);

    /**
     * 分页获取学生处分列表
     *
     * @param studentPunishmentQueryRequest
     * @return
     */
    Page<StudentPunishment> listStudentPunishmentByPage(StudentPunishmentQueryRequest studentPunishmentQueryRequest);

    /**
     * 解除学生处分
     *
     * @param id
     * @param handler
     * @return
     */
    boolean revokeStudentPunishment(Long id, String handler);
} 