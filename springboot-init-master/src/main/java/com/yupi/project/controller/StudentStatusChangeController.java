package com.yupi.project.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.yupi.project.annotation.AuthCheck;
import com.yupi.project.common.BaseResponse;
import com.yupi.project.common.DeleteRequest;
import com.yupi.project.common.ErrorCode;
import com.yupi.project.common.ResultUtils;
import com.yupi.project.constant.UserConstant;
import com.yupi.project.exception.BusinessException;
import com.yupi.project.model.dto.studentstatuschange.StudentStatusChangeAddRequest;
import com.yupi.project.model.dto.studentstatuschange.StudentStatusChangeQueryRequest;
import com.yupi.project.model.dto.studentstatuschange.StudentStatusChangeUpdateRequest;
import com.yupi.project.model.entity.StudentStatusChange;
import com.yupi.project.model.entity.User;
import com.yupi.project.service.StudentStatusChangeService;
import com.yupi.project.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * 学生学籍异动信息接口
 */
@RestController
@RequestMapping("/student-status-change")
@Slf4j
public class StudentStatusChangeController {

    @Resource
    private StudentStatusChangeService studentStatusChangeService;

    @Resource
    private UserService userService;

    /**
     * 创建
     *
     * @param studentStatusChangeAddRequest
     * @param request
     * @return
     */
    @PostMapping("/add")
    public BaseResponse<Long> addStudentStatusChange(@RequestBody StudentStatusChangeAddRequest studentStatusChangeAddRequest,
            HttpServletRequest request) {
        if (studentStatusChangeAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        StudentStatusChange studentStatusChange = new StudentStatusChange();
        BeanUtils.copyProperties(studentStatusChangeAddRequest, studentStatusChange);
        boolean result = studentStatusChangeService.addStudentStatusChange(studentStatusChange);
        if (!result) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR);
        }
        return ResultUtils.success(studentStatusChange.getId());
    }

    /**
     * 删除
     *
     * @param deleteRequest
     * @param request
     * @return
     */
    @PostMapping("/delete")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> deleteStudentStatusChange(@RequestBody DeleteRequest deleteRequest,
            HttpServletRequest request) {
        if (deleteRequest == null || StringUtils.isBlank(deleteRequest.getId())) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        // 安全转换ID
        long id;
        try {
            id = Long.parseLong(deleteRequest.getId());
        } catch (NumberFormatException e) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "ID格式不正确");
        }
        
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "ID必须大于0");
        }
        
        boolean result = studentStatusChangeService.removeById(id);
        return ResultUtils.success(result);
    }

    /**
     * 更新
     *
     * @param studentStatusChangeUpdateRequest
     * @param request
     * @return
     */
    @PostMapping("/update")
    public BaseResponse<Boolean> updateStudentStatusChange(
            @RequestBody StudentStatusChangeUpdateRequest studentStatusChangeUpdateRequest,
            HttpServletRequest request) {
        if (studentStatusChangeUpdateRequest == null || studentStatusChangeUpdateRequest.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        StudentStatusChange studentStatusChange = new StudentStatusChange();
        BeanUtils.copyProperties(studentStatusChangeUpdateRequest, studentStatusChange);
        boolean result = studentStatusChangeService.updateStudentStatusChange(studentStatusChange);
        return ResultUtils.success(result);
    }

    /**
     * 根据 id 获取
     *
     * @param id
     * @return
     */
    @GetMapping("/get")
    public BaseResponse<StudentStatusChange> getStudentStatusChangeById(long id) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        StudentStatusChange studentStatusChange = studentStatusChangeService.getById(id);
        return ResultUtils.success(studentStatusChange);
    }

    /**
     * 分页获取列表
     *
     * @param studentStatusChangeQueryRequest
     * @return
     */
    @PostMapping("/list/page")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Page<StudentStatusChange>> listStudentStatusChangeByPage(
            @RequestBody StudentStatusChangeQueryRequest studentStatusChangeQueryRequest) {
        if (studentStatusChangeQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Page<StudentStatusChange> studentStatusChangePage = studentStatusChangeService
                .listStudentStatusChangeByPage(studentStatusChangeQueryRequest);
        return ResultUtils.success(studentStatusChangePage);
    }

    /**
     * 审批
     *
     * @param id
     * @param approvalStatus
     * @param approvalComment
     * @param request
     * @return
     */
    @PostMapping("/approve/{id}")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> approveStudentStatusChange(@PathVariable Long id,
            @RequestParam String approvalStatus,
            @RequestParam(required = false) String approvalComment,
            HttpServletRequest request) {
        if (id == null || StringUtils.isBlank(approvalStatus)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        if (!"已通过".equals(approvalStatus) && !"已驳回".equals(approvalStatus)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "审批状态不合法");
        }
        User loginUser = userService.getLoginUser(request);
        boolean result = studentStatusChangeService.approveStudentStatusChange(id, approvalStatus, approvalComment,
                loginUser.getUserName());
        return ResultUtils.success(result);
    }
} 