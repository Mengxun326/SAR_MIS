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
import com.yupi.project.model.dto.studenthealth.StudentHealthAddRequest;
import com.yupi.project.model.dto.studenthealth.StudentHealthQueryRequest;
import com.yupi.project.model.dto.studenthealth.StudentHealthUpdateRequest;
import com.yupi.project.model.entity.StudentHealth;
import com.yupi.project.model.entity.User;
import com.yupi.project.service.StudentHealthService;
import com.yupi.project.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 学生健康信息接口
 */
@RestController
@RequestMapping("/student/health")
@Slf4j
public class StudentHealthController {

    @Resource
    private StudentHealthService studentHealthService;

    @Resource
    private UserService userService;

    /**
     * 创建
     *
     * @param studentHealthAddRequest
     * @param request
     * @return
     */
    @PostMapping("/add")
    public BaseResponse<Boolean> addStudentHealth(@RequestBody StudentHealthAddRequest studentHealthAddRequest, HttpServletRequest request) {
        if (studentHealthAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        StudentHealth studentHealth = new StudentHealth();
        BeanUtils.copyProperties(studentHealthAddRequest, studentHealth);
        // 校验
        validStudentHealth(studentHealth, true);
        User loginUser = userService.getLoginUser(request);
        boolean result = studentHealthService.addStudentHealth(studentHealth);
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
    public BaseResponse<Boolean> deleteStudentHealth(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
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
        StudentHealth oldStudentHealth = studentHealthService.getById(id);
        if (oldStudentHealth == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        boolean result = studentHealthService.removeById(id);
        return ResultUtils.success(result);
    }

    /**
     * 更新
     *
     * @param studentHealthUpdateRequest
     * @param request
     * @return
     */
    @PostMapping("/update")
    public BaseResponse<Boolean> updateStudentHealth(@RequestBody StudentHealthUpdateRequest studentHealthUpdateRequest,
            HttpServletRequest request) {
        if (studentHealthUpdateRequest == null || studentHealthUpdateRequest.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        StudentHealth studentHealth = new StudentHealth();
        BeanUtils.copyProperties(studentHealthUpdateRequest, studentHealth);
        // 参数校验
        validStudentHealth(studentHealth, false);
        User loginUser = userService.getLoginUser(request);
        boolean result = studentHealthService.updateStudentHealth(studentHealth);
        return ResultUtils.success(result);
    }

    /**
     * 根据 id 获取
     *
     * @param id
     * @return
     */
    @GetMapping("/get")
    public BaseResponse<StudentHealth> getStudentHealthById(long id) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        StudentHealth studentHealth = studentHealthService.getById(id);
        return ResultUtils.success(studentHealth);
    }

    /**
     * 获取列表（仅管理员可使用）
     *
     * @param studentHealthQueryRequest
     * @return
     */
    @PostMapping("/list/page")
    public BaseResponse<Page<StudentHealth>> listStudentHealthByPage(@RequestBody StudentHealthQueryRequest studentHealthQueryRequest) {
        if (studentHealthQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Page<StudentHealth> studentHealthPage = studentHealthService.listStudentHealthByPage(studentHealthQueryRequest);
        return ResultUtils.success(studentHealthPage);
    }

    /**
     * 校验学生健康信息
     *
     * @param studentHealth
     * @param add
     */
    private void validStudentHealth(StudentHealth studentHealth, boolean add) {
        if (studentHealth == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String studentId = studentHealth.getStudentId();
        BigDecimal height = studentHealth.getHeight();
        BigDecimal weight = studentHealth.getWeight();
        String vision = studentHealth.getVision();
        String bloodType = studentHealth.getBloodType();
        Date checkDate = studentHealth.getCheckDate();
        
        // 创建时，参数不能为空
        if (add) {
            if (StringUtils.isBlank(studentId)) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "学号不能为空");
            }
            if (checkDate == null) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "体检日期不能为空");
            }
        }
        
        // 有参数则校验
        if (height != null && height.compareTo(BigDecimal.ZERO) <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "身高必须大于0");
        }
        if (weight != null && weight.compareTo(BigDecimal.ZERO) <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "体重必须大于0");
        }
        if (StringUtils.isNotBlank(bloodType) && !bloodType.matches("^(A|B|AB|O)$")) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "血型只能是A、B、AB、O");
        }
    }
} 