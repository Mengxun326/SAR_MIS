package com.yupi.project.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yupi.project.model.dto.studentaward.StudentAwardQueryRequest;
import com.yupi.project.model.entity.StudentAward;

/**
 * 学生奖励服务
 */
public interface StudentAwardService extends IService<StudentAward> {

    /**
     * 校验学生奖励信息
     *
     * @param studentAward 学生奖励信息
     * @param add         是否为创建校验
     */
    void validStudentAward(StudentAward studentAward, boolean add);

    /**
     * 获取查询条件
     *
     * @param studentAwardQueryRequest 查询参数
     * @return 查询条件
     */
    QueryWrapper<StudentAward> getQueryWrapper(StudentAwardQueryRequest studentAwardQueryRequest);

    /**
     * 添加学生奖励信息
     *
     * @param studentAward 学生奖励信息
     * @return 是否成功
     */
    boolean addStudentAward(StudentAward studentAward);

    /**
     * 更新学生奖励信息
     *
     * @param studentAward 学生奖励信息
     * @return 是否成功
     */
    boolean updateStudentAward(StudentAward studentAward);

    /**
     * 分页获取学生奖励列表
     *
     * @param studentAwardQueryRequest 查询参数
     * @return 分页结果
     */
    Page<StudentAward> listStudentAwardByPage(StudentAwardQueryRequest studentAwardQueryRequest);

    /**
     * 获取指定月份的奖励次数
     *
     * @param month 月份，格式为 yyyy-MM
     * @return 奖励次数
     */
    long getMonthlyAwardCount(String month);
} 