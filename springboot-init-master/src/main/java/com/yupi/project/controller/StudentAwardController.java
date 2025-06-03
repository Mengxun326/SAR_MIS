package com.yupi.project.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.yupi.project.annotation.AuthCheck;
import com.yupi.project.common.BaseResponse;
import com.yupi.project.common.DeleteRequest;
import com.yupi.project.common.ErrorCode;
import com.yupi.project.common.ResultUtils;
import com.yupi.project.constant.CommonConstant;
import com.yupi.project.constant.UserConstant;
import com.yupi.project.exception.BusinessException;
import com.yupi.project.model.dto.studentaward.StudentAwardAddRequest;
import com.yupi.project.model.dto.studentaward.StudentAwardQueryRequest;
import com.yupi.project.model.dto.studentaward.StudentAwardUpdateRequest;
import com.yupi.project.model.entity.StudentAward;
import com.yupi.project.model.entity.User;
import com.yupi.project.service.StudentAwardService;
import com.yupi.project.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;

/**
 * 学生奖励信息接口
 */
@RestController
@RequestMapping("/student/award")
@Slf4j
public class StudentAwardController {

    @Resource
    private StudentAwardService studentAwardService;

    @Resource
    private UserService userService;

    // region 增删改查

    /**
     * 创建
     *
     * @param studentAwardAddRequest
     * @param request
     * @return
     */
    @PostMapping("/add")
    public BaseResponse<Boolean> addStudentAward(@RequestBody StudentAwardAddRequest studentAwardAddRequest, HttpServletRequest request) {
        if (studentAwardAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        StudentAward studentAward = new StudentAward();
        BeanUtils.copyProperties(studentAwardAddRequest, studentAward);
        // 校验
        validStudentAward(studentAward, true);
        User loginUser = userService.getLoginUser(request);
        boolean result = studentAwardService.addStudentAward(studentAward);
        return ResultUtils.success(result);
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
    public BaseResponse<Boolean> deleteStudentAward(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
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
        
        User user = userService.getLoginUser(request);
        // 判断是否存在
        StudentAward oldStudentAward = studentAwardService.getById(id);
        if (oldStudentAward == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        boolean b = studentAwardService.removeById(id);
        return ResultUtils.success(b);
    }

    /**
     * 更新
     *
     * @param studentAwardUpdateRequest
     * @param request
     * @return
     */
    @PostMapping("/update")
    public BaseResponse<Boolean> updateStudentAward(@RequestBody StudentAwardUpdateRequest studentAwardUpdateRequest,
            HttpServletRequest request) {
        if (studentAwardUpdateRequest == null || studentAwardUpdateRequest.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        StudentAward studentAward = new StudentAward();
        BeanUtils.copyProperties(studentAwardUpdateRequest, studentAward);
        // 参数校验
        validStudentAward(studentAward, false);
        User loginUser = userService.getLoginUser(request);
        boolean result = studentAwardService.updateStudentAward(studentAward);
        return ResultUtils.success(result);
    }

    /**
     * 根据 id 获取
     *
     * @param id
     * @return
     */
    @GetMapping("/get")
    public BaseResponse<StudentAward> getStudentAwardById(long id) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        StudentAward studentAward = studentAwardService.getById(id);
        return ResultUtils.success(studentAward);
    }

    /**
     * 分页获取列表
     *
     * @param studentAwardQueryRequest
     * @return
     */
    @PostMapping("/list/page")
    public BaseResponse<Page<StudentAward>> listStudentAwardByPage(@RequestBody StudentAwardQueryRequest studentAwardQueryRequest) {
        if (studentAwardQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Page<StudentAward> studentAwardPage = studentAwardService.listStudentAwardByPage(studentAwardQueryRequest);
        return ResultUtils.success(studentAwardPage);
    }

    /**
     * 校验学生奖励信息
     *
     * @param studentAward
     * @param add
     */
    private void validStudentAward(StudentAward studentAward, boolean add) {
        if (studentAward == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String studentId = studentAward.getStudentId();
        String awardName = studentAward.getAwardName();
        String awardLevel = studentAward.getAwardLevel();
        BigDecimal awardAmount = studentAward.getAwardAmount();
        
        // 创建时，参数不能为空
        if (add) {
            if (StringUtils.isAnyBlank(studentId, awardName, awardLevel)) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "必填参数不能为空");
            }
        }
        // 有参数则校验
        if (awardAmount != null && awardAmount.compareTo(BigDecimal.ZERO) < 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "奖金金额不能为负数");
        }
    }
} 