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
import com.yupi.project.model.dto.studentfamily.StudentFamilyAddRequest;
import com.yupi.project.model.dto.studentfamily.StudentFamilyQueryRequest;
import com.yupi.project.model.dto.studentfamily.StudentFamilyUpdateRequest;
import com.yupi.project.model.entity.StudentFamily;
import com.yupi.project.model.entity.User;
import com.yupi.project.service.StudentFamilyService;
import com.yupi.project.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * 学生家庭信息接口
 */
@RestController
@RequestMapping("/student/family")
@Slf4j
public class StudentFamilyController {

    @Resource
    private StudentFamilyService studentFamilyService;

    @Resource
    private UserService userService;

    /**
     * 创建
     *
     * @param studentFamilyAddRequest
     * @param request
     * @return
     */
    @PostMapping("/add")
    public BaseResponse<Boolean> addStudentFamily(@RequestBody StudentFamilyAddRequest studentFamilyAddRequest, HttpServletRequest request) {
        if (studentFamilyAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        StudentFamily studentFamily = new StudentFamily();
        BeanUtils.copyProperties(studentFamilyAddRequest, studentFamily);
        User loginUser = userService.getLoginUser(request);
        boolean result = studentFamilyService.addStudentFamily(studentFamily);
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
    public BaseResponse<Boolean> deleteStudentFamily(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
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
        
        User loginUser = userService.getLoginUser(request);
        // 判断是否存在
        StudentFamily oldStudentFamily = studentFamilyService.getById(id);
        if (oldStudentFamily == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        boolean result = studentFamilyService.removeById(id);
        return ResultUtils.success(result);
    }

    /**
     * 更新
     *
     * @param studentFamilyUpdateRequest
     * @param request
     * @return
     */
    @PostMapping("/update")
    public BaseResponse<Boolean> updateStudentFamily(@RequestBody StudentFamilyUpdateRequest studentFamilyUpdateRequest,
            HttpServletRequest request) {
        if (studentFamilyUpdateRequest == null || studentFamilyUpdateRequest.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        StudentFamily studentFamily = new StudentFamily();
        BeanUtils.copyProperties(studentFamilyUpdateRequest, studentFamily);
        User loginUser = userService.getLoginUser(request);
        boolean result = studentFamilyService.updateStudentFamily(studentFamily);
        return ResultUtils.success(result);
    }

    /**
     * 根据 id 获取
     *
     * @param id
     * @return
     */
    @GetMapping("/get")
    public BaseResponse<StudentFamily> getStudentFamilyById(long id) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        StudentFamily studentFamily = studentFamilyService.getById(id);
        return ResultUtils.success(studentFamily);
    }

    /**
     * 获取列表（仅管理员可使用）
     *
     * @param studentFamilyQueryRequest
     * @return
     */
    @PostMapping("/list/page")
    public BaseResponse<Page<StudentFamily>> listStudentFamilyByPage(@RequestBody StudentFamilyQueryRequest studentFamilyQueryRequest) {
        if (studentFamilyQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Page<StudentFamily> studentFamilyPage = studentFamilyService.listStudentFamilyByPage(studentFamilyQueryRequest);
        return ResultUtils.success(studentFamilyPage);
    }

    /**
     * 校验学生家庭信息
     *
     * @param studentFamily
     * @param add
     */
    private void validStudentFamily(StudentFamily studentFamily, boolean add) {
        if (studentFamily == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String studentId = studentFamily.getStudentId();
        String parentName = studentFamily.getParentName();
        String relationship = studentFamily.getRelationship();
        String phone = studentFamily.getPhone();
        
        // 创建时，参数不能为空
        if (add) {
            if (StringUtils.isAnyBlank(studentId, parentName, relationship, phone)) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR);
            }
        }
        // 有参数则校验
        if (StringUtils.isNotBlank(phone) && !phone.matches("^1[3-9]\\d{9}$")) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "手机号格式不正确");
        }
    }
} 