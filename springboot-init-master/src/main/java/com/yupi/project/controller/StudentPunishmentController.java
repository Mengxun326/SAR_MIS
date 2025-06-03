package com.yupi.project.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.yupi.project.annotation.AuthCheck;
import com.yupi.project.common.BaseResponse;
import com.yupi.project.common.DeleteRequest;
import com.yupi.project.common.ErrorCode;
import com.yupi.project.common.ResultUtils;
import com.yupi.project.constant.UserConstant;
import com.yupi.project.exception.BusinessException;
import com.yupi.project.model.dto.studentpunishment.StudentPunishmentAddRequest;
import com.yupi.project.model.dto.studentpunishment.StudentPunishmentQueryRequest;
import com.yupi.project.model.dto.studentpunishment.StudentPunishmentUpdateRequest;
import com.yupi.project.model.entity.StudentPunishment;
import com.yupi.project.model.entity.User;
import com.yupi.project.service.StudentPunishmentService;
import com.yupi.project.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * 学生处分信息接口
 */
@RestController
@RequestMapping("/student-punishment")
@Slf4j
public class StudentPunishmentController {

    @Resource
    private StudentPunishmentService studentPunishmentService;

    @Resource
    private UserService userService;

    /**
     * 创建
     *
     * @param studentPunishmentAddRequest
     * @param request
     * @return
     */
    @PostMapping("/add")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Long> addStudentPunishment(@RequestBody StudentPunishmentAddRequest studentPunishmentAddRequest,
            HttpServletRequest request) {
        if (studentPunishmentAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        StudentPunishment studentPunishment = new StudentPunishment();
        BeanUtils.copyProperties(studentPunishmentAddRequest, studentPunishment);
        User loginUser = userService.getLoginUser(request);
        studentPunishment.setHandler(loginUser.getUserName());
        boolean result = studentPunishmentService.addStudentPunishment(studentPunishment);
        if (!result) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR);
        }
        return ResultUtils.success(studentPunishment.getId());
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
    public BaseResponse<Boolean> deleteStudentPunishment(@RequestBody DeleteRequest deleteRequest,
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
        
        boolean result = studentPunishmentService.removeById(id);
        return ResultUtils.success(result);
    }

    /**
     * 更新
     *
     * @param studentPunishmentUpdateRequest
     * @param request
     * @return
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateStudentPunishment(
            @RequestBody StudentPunishmentUpdateRequest studentPunishmentUpdateRequest,
            HttpServletRequest request) {
        if (studentPunishmentUpdateRequest == null || studentPunishmentUpdateRequest.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        StudentPunishment studentPunishment = new StudentPunishment();
        BeanUtils.copyProperties(studentPunishmentUpdateRequest, studentPunishment);
        User loginUser = userService.getLoginUser(request);
        studentPunishment.setHandler(loginUser.getUserName());
        boolean result = studentPunishmentService.updateStudentPunishment(studentPunishment);
        return ResultUtils.success(result);
    }

    /**
     * 根据 id 获取
     *
     * @param id
     * @return
     */
    @GetMapping("/get")
    public BaseResponse<StudentPunishment> getStudentPunishmentById(long id) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        StudentPunishment studentPunishment = studentPunishmentService.getById(id);
        return ResultUtils.success(studentPunishment);
    }

    /**
     * 分页获取列表
     *
     * @param studentPunishmentQueryRequest
     * @return
     */
    @PostMapping("/list/page")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Page<StudentPunishment>> listStudentPunishmentByPage(
            @RequestBody StudentPunishmentQueryRequest studentPunishmentQueryRequest) {
        if (studentPunishmentQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Page<StudentPunishment> studentPunishmentPage = studentPunishmentService
                .listStudentPunishmentByPage(studentPunishmentQueryRequest);
        return ResultUtils.success(studentPunishmentPage);
    }

    /**
     * 解除处分
     *
     * @param id
     * @param request
     * @return
     */
    @PostMapping("/revoke/{id}")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> revokeStudentPunishment(@PathVariable Long id, HttpServletRequest request) {
        if (id == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User loginUser = userService.getLoginUser(request);
        boolean result = studentPunishmentService.revokeStudentPunishment(id, loginUser.getUserName());
        return ResultUtils.success(result);
    }
} 