package com.yupi.project.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yupi.project.model.dto.studentstatuschange.StudentStatusChangeQueryRequest;
import com.yupi.project.model.entity.StudentStatusChange;

/**
 * 学生学籍异动信息服务
 */
public interface StudentStatusChangeService extends IService<StudentStatusChange> {

    /**
     * 校验学生学籍异动信息
     *
     * @param studentStatusChange
     * @param add
     */
    void validStudentStatusChange(StudentStatusChange studentStatusChange, boolean add);

    /**
     * 添加学生学籍异动信息
     *
     * @param studentStatusChange
     * @return
     */
    boolean addStudentStatusChange(StudentStatusChange studentStatusChange);

    /**
     * 更新学生学籍异动信息
     *
     * @param studentStatusChange
     * @return
     */
    boolean updateStudentStatusChange(StudentStatusChange studentStatusChange);

    /**
     * 分页获取学生学籍异动列表
     *
     * @param studentStatusChangeQueryRequest
     * @return
     */
    Page<StudentStatusChange> listStudentStatusChangeByPage(StudentStatusChangeQueryRequest studentStatusChangeQueryRequest);

    /**
     * 审批学生学籍异动申请
     *
     * @param id
     * @param approvalStatus
     * @param approvalComment
     * @param approver
     * @return
     */
    boolean approveStudentStatusChange(Long id, String approvalStatus, String approvalComment, String approver);
} 