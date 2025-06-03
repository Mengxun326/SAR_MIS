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
import com.yupi.project.model.dto.student.StudentAddRequest;
import com.yupi.project.model.dto.student.StudentQueryRequest;
import com.yupi.project.model.dto.student.StudentUpdateRequest;
import com.yupi.project.model.entity.Student;
import com.yupi.project.model.entity.User;
import com.yupi.project.model.vo.UserVO;
import com.yupi.project.service.StudentService;
import com.yupi.project.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * 学生接口
 */
@RestController
@RequestMapping("/student")
@Slf4j
public class StudentController {

    @Resource
    private StudentService studentService;

    @Resource
    private UserService userService;

    // region 增删改查

    /**
     * 创建
     *
     * @param studentAddRequest
     * @param request
     * @return
     */
    @PostMapping("/add")
    public BaseResponse<Long> addStudent(@RequestBody StudentAddRequest studentAddRequest, HttpServletRequest request) {
        if (studentAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Student student = new Student();
        BeanUtils.copyProperties(studentAddRequest, student);
        User loginUser = userService.getLoginUser(request);
        student.setUserId(loginUser.getId());
        boolean result = studentService.addStudent(student);
        if (!result) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR);
        }
        long newStudentId = student.getId();
        return ResultUtils.success(newStudentId);
    }

    /**
     * 删除
     *
     * @param deleteRequest
     * @param request
     * @return
     */
    @PostMapping("/delete")
    public BaseResponse<Boolean> deleteStudent(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
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
        Student oldStudent = studentService.getById(id);
        if (oldStudent == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        // 仅本人或管理员可删除
        if (!oldStudent.getUserId().equals(user.getId()) && !userService.isAdmin(request)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        boolean b = studentService.removeById(id);
        return ResultUtils.success(b);
    }

    /**
     * 更新（仅管理员）
     *
     * @param studentUpdateRequest
     * @return
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateStudent(@RequestBody StudentUpdateRequest studentUpdateRequest) {
        if (studentUpdateRequest == null || StringUtils.isBlank(studentUpdateRequest.getId())) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        // 调试日志
        log.info("收到更新请求，原始ID字符串: {}", studentUpdateRequest.getId());
        
        // 安全转换ID
        long id;
        try {
            id = Long.parseLong(studentUpdateRequest.getId());
            log.info("ID转换成功，Long类型ID: {}", id);
        } catch (NumberFormatException e) {
            log.error("ID转换失败，原始字符串: {}", studentUpdateRequest.getId(), e);
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "ID格式不正确");
        }
        
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "ID必须大于0");
        }
        
        Student student = new Student();
        BeanUtils.copyProperties(studentUpdateRequest, student);
        student.setId(id); // 设置转换后的Long类型ID
        
        // 参数校验
        validStudent(student, false);
        
        // 判断是否存在
        log.info("正在查询ID为 {} 的学生记录", id);
        Student oldStudent = studentService.getById(id);
        if (oldStudent == null) {
            log.error("未找到ID为 {} 的学生记录", id);
            
            // 额外检查：尝试通过不忽略软删除的方式查询
            Student deletedStudent = studentService.getOne(new QueryWrapper<Student>().eq("id", id).eq("isDelete", 1));
            if (deletedStudent != null) {
                log.error("找到ID为 {} 的已删除学生记录，学号: {}", id, deletedStudent.getStudentId());
                throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "该学生信息已被删除");
            }
            
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        log.info("找到学生记录，学号: {}, 姓名: {}", oldStudent.getStudentId(), oldStudent.getName());
        
        boolean result = studentService.updateById(student);
        log.info("更新结果: {}", result);
        return ResultUtils.success(result);
    }

    /**
     * 根据 id 获取
     *
     * @param id
     * @return
     */
    @GetMapping("/get")
    public BaseResponse<Student> getStudentById(@RequestParam("id") String id) {
        if (StringUtils.isBlank(id)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        long studentId;
        try {
            studentId = Long.parseLong(id);
        } catch (NumberFormatException e) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "ID格式不正确");
        }
        if (studentId <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Student student = studentService.getById(studentId);
        return ResultUtils.success(student);
    }

    /**
     * 分页获取列表
     *
     * @param studentQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/list/page")
    public BaseResponse<Page<Student>> listStudentByPage(@RequestBody StudentQueryRequest studentQueryRequest,
            HttpServletRequest request) {
        if (studentQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Student studentQuery = new Student();
        BeanUtils.copyProperties(studentQueryRequest, studentQuery);
        long current = studentQueryRequest.getCurrent();
        long size = studentQueryRequest.getPageSize();
        String sortField = studentQueryRequest.getSortField();
        String sortOrder = studentQueryRequest.getSortOrder();
        // 限制爬虫
        if (size > 50) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        QueryWrapper<Student> queryWrapper = new QueryWrapper<>(studentQuery);
        queryWrapper.orderBy(StringUtils.isNotBlank(sortField),
                sortOrder.equals(CommonConstant.SORT_ORDER_ASC), sortField);
        Page<Student> studentPage = studentService.page(new Page<>(current, size), queryWrapper);
        return ResultUtils.success(studentPage);
    }

    // endregion

    /**
     * 校验学生信息
     *
     * @param student
     * @param add
     */
    private void validStudent(Student student, boolean add) {
        if (student == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String studentId = student.getStudentId();
        String name = student.getName();
        
        // 创建时，参数不能为空
        if (add) {
            if (StringUtils.isAnyBlank(studentId, name)) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "学号和姓名不能为空");
            }
        }
        // 有参数则校验
        if (StringUtils.isNotBlank(studentId) && studentId.length() > 32) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "学号过长");
        }
        if (StringUtils.isNotBlank(name) && name.length() > 50) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "姓名过长");
        }
    }
} 