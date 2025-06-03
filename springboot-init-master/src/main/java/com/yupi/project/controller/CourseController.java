package com.yupi.project.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.yupi.project.annotation.AuthCheck;
import com.yupi.project.common.BaseResponse;
import com.yupi.project.common.DeleteRequest;
import com.yupi.project.common.ErrorCode;
import com.yupi.project.common.ResultUtils;
import com.yupi.project.constant.UserConstant;
import com.yupi.project.exception.BusinessException;
import com.yupi.project.model.dto.course.CourseAddRequest;
import com.yupi.project.model.dto.course.CourseQueryRequest;
import com.yupi.project.model.dto.course.CourseUpdateRequest;
import com.yupi.project.model.entity.Course;
import com.yupi.project.model.entity.User;
import com.yupi.project.service.CourseService;
import com.yupi.project.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * 课程信息接口
 */
@RestController
@RequestMapping("/course")
@Slf4j
public class CourseController {

    @Resource
    private CourseService courseService;

    @Resource
    private UserService userService;

    /**
     * 创建
     *
     * @param courseAddRequest
     * @param request
     * @return
     */
    @PostMapping("/add")
    @AuthCheck(mustRole = UserConstant.TEACHER_ROLE)
    public BaseResponse<Boolean> addCourse(@RequestBody CourseAddRequest courseAddRequest, HttpServletRequest request) {
        if (courseAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Course course = new Course();
        BeanUtils.copyProperties(courseAddRequest, course);
        // 校验
        validCourse(course, true);
        User loginUser = userService.getLoginUser(request);
        boolean result = courseService.addCourse(course);
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
    public BaseResponse<Boolean> deleteCourse(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
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
        Course oldCourse = courseService.getById(id);
        if (oldCourse == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        boolean b = courseService.removeById(id);
        return ResultUtils.success(b);
    }

    /**
     * 更新
     *
     * @param courseUpdateRequest
     * @param request
     * @return
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = UserConstant.TEACHER_ROLE)
    public BaseResponse<Boolean> updateCourse(@RequestBody CourseUpdateRequest courseUpdateRequest,
            HttpServletRequest request) {
        if (courseUpdateRequest == null || StringUtils.isBlank(courseUpdateRequest.getId())) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        // 安全转换ID
        long id;
        try {
            id = Long.parseLong(courseUpdateRequest.getId());
        } catch (NumberFormatException e) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "ID格式不正确");
        }
        
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "ID必须大于0");
        }
        
        Course course = new Course();
        BeanUtils.copyProperties(courseUpdateRequest, course);
        course.setId(id); // 设置转换后的Long类型ID
        
        // 参数校验
        validCourse(course, false);
        User loginUser = userService.getLoginUser(request);
        
        // 判断是否存在
        Course oldCourse = courseService.getById(id);
        if (oldCourse == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        // 只能更新自己的课程
        if (!oldCourse.getTeacherId().equals(loginUser.getId()) && !loginUser.getUserRole().equals(UserConstant.ADMIN_ROLE)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        boolean result = courseService.updateCourse(course);
        return ResultUtils.success(result);
    }

    /**
     * 根据 id 获取
     *
     * @param id
     * @return
     */
    @GetMapping("/get")
    public BaseResponse<Course> getCourseById(long id) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Course course = courseService.getById(id);
        return ResultUtils.success(course);
    }

    /**
     * 获取列表（仅管理员可使用）
     *
     * @param courseQueryRequest
     * @return
     */
    @PostMapping("/list/page")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Page<Course>> listCourseByPage(@RequestBody CourseQueryRequest courseQueryRequest) {
        if (courseQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Page<Course> coursePage = courseService.listCourseByPage(courseQueryRequest);
        return ResultUtils.success(coursePage);
    }

    /**
     * 获取教师课程列表
     *
     * @param teacherId
     * @param semester
     * @return
     */
    @GetMapping("/teacher/list")
    public BaseResponse<List<Course>> getTeacherCourses(@RequestParam Long teacherId, @RequestParam String semester) {
        if (teacherId == null || StringUtils.isBlank(semester)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        List<Course> courseList = courseService.getTeacherCourses(teacherId, semester);
        return ResultUtils.success(courseList);
    }

    /**
     * 获取院系课程统计
     *
     * @param semester
     * @return
     */
    @GetMapping("/stats/department")
    public BaseResponse<Map<String, Integer>> getDepartmentCourseStats(@RequestParam String semester) {
        if (StringUtils.isBlank(semester)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Map<String, Integer> stats = courseService.getDepartmentCourseStats(semester);
        return ResultUtils.success(stats);
    }

    /**
     * 获取课程类型统计
     *
     * @param semester
     * @return
     */
    @GetMapping("/stats/type")
    public BaseResponse<Map<String, Integer>> getCourseTypeStats(@RequestParam String semester) {
        if (StringUtils.isBlank(semester)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Map<String, Integer> stats = courseService.getCourseTypeStats(semester);
        return ResultUtils.success(stats);
    }

    /**
     * 检查课程是否可以选课
     *
     * @param id
     * @return
     */
    @GetMapping("/check")
    public BaseResponse<Boolean> checkCourseAvailable(@RequestParam Long id) {
        if (id == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean available = courseService.checkCourseAvailable(id);
        return ResultUtils.success(available);
    }

    /**
     * 校验课程信息
     *
     * @param course
     * @param add
     */
    private void validCourse(Course course, boolean add) {
        if (course == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String courseCode = course.getCourseCode();
        String courseName = course.getCourseName();
        BigDecimal credit = course.getCredit();
        Integer courseHour = course.getCourseHour();
        String courseType = course.getCourseType();
        String department = course.getDepartment();
        Integer maxStudent = course.getMaxStudent();
        Long teacherId = course.getTeacherId();
        String semester = course.getSemester();
        String courseTime = course.getCourseTime();
        String location = course.getLocation();
        
        // 创建时，参数不能为空
        if (add) {
            if (StringUtils.isAnyBlank(courseCode, courseName, courseType, department, semester, courseTime, location)) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "必填参数不能为空");
            }
            if (credit == null || courseHour == null || maxStudent == null || teacherId == null) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "必填参数不能为空");
            }
        }
        
        // 有参数则校验
        if (credit != null && credit.compareTo(BigDecimal.ZERO) <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "学分必须大于0");
        }
        if (courseHour != null && courseHour <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "课时必须大于0");
        }
        if (maxStudent != null && maxStudent <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "最大选课人数必须大于0");
        }
        if (StringUtils.isNotBlank(courseType) && !courseType.matches("^(必修|选修)$")) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "课程类型只能是：必修、选修");
        }
    }
} 