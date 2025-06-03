package com.yupi.project.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.yupi.project.annotation.AuthCheck;
import com.yupi.project.common.BaseResponse;
import com.yupi.project.common.ErrorCode;
import com.yupi.project.common.ResultUtils;
import com.yupi.project.constant.UserConstant;
import com.yupi.project.exception.BusinessException;
import com.yupi.project.model.dto.courseselection.CourseSelectionAddRequest;
import com.yupi.project.model.dto.courseselection.CourseSelectionQueryRequest;
import com.yupi.project.model.entity.User;
import com.yupi.project.model.vo.CourseSelectionVO;
import com.yupi.project.service.CourseSelectionService;
import com.yupi.project.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * 选课信息接口
 */
@RestController
@RequestMapping("/course-selection")
@Slf4j
public class CourseSelectionController {

    @Resource
    private CourseSelectionService courseSelectionService;

    @Resource
    private UserService userService;

    /**
     * 选课
     *
     * @param courseSelectionAddRequest
     * @param request
     * @return
     */
    @PostMapping("/select")
    public BaseResponse<Boolean> selectCourse(@RequestBody CourseSelectionAddRequest courseSelectionAddRequest,
            HttpServletRequest request) {
        if (courseSelectionAddRequest == null || courseSelectionAddRequest.getCourseId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User loginUser = userService.getLoginUser(request);
        boolean result = courseSelectionService.selectCourse(loginUser.getId(), courseSelectionAddRequest.getCourseId());
        return ResultUtils.success(result);
    }

    /**
     * 退课
     *
     * @param courseId
     * @param request
     * @return
     */
    @PostMapping("/drop/{courseId}")
    public BaseResponse<Boolean> dropCourse(@PathVariable Long courseId, HttpServletRequest request) {
        if (courseId == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User loginUser = userService.getLoginUser(request);
        boolean result = courseSelectionService.dropCourse(loginUser.getId(), courseId);
        return ResultUtils.success(result);
    }

    /**
     * 分页获取选课信息列表
     *
     * @param courseSelectionQueryRequest
     * @return
     */
    @PostMapping("/list/page")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Page<CourseSelectionVO>> listCourseSelectionByPage(@RequestBody CourseSelectionQueryRequest courseSelectionQueryRequest) {
        if (courseSelectionQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Page<CourseSelectionVO> courseSelectionVOPage = courseSelectionService.listCourseSelectionByPage(courseSelectionQueryRequest);
        return ResultUtils.success(courseSelectionVOPage);
    }

    /**
     * 获取学生的选课列表
     *
     * @param request
     * @return
     */
    @GetMapping("/student/list")
    public BaseResponse<List<CourseSelectionVO>> getStudentCourseSelections(HttpServletRequest request) {
        User loginUser = userService.getLoginUser(request);
        List<CourseSelectionVO> courseSelectionVOList = courseSelectionService.getStudentCourseSelections(loginUser.getId());
        return ResultUtils.success(courseSelectionVOList);
    }

    /**
     * 获取课程的选课学生列表
     *
     * @param courseId
     * @return
     */
    @GetMapping("/course/{courseId}/students")
    @AuthCheck(mustRole = UserConstant.TEACHER_ROLE)
    public BaseResponse<List<CourseSelectionVO>> getCourseStudentSelections(@PathVariable Long courseId) {
        if (courseId == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        List<CourseSelectionVO> courseSelectionVOList = courseSelectionService.getCourseStudentSelections(courseId);
        return ResultUtils.success(courseSelectionVOList);
    }

    /**
     * 检查学生是否已选某课程
     *
     * @param courseId
     * @param request
     * @return
     */
    @GetMapping("/check/{courseId}")
    public BaseResponse<Boolean> checkStudentSelected(@PathVariable Long courseId, HttpServletRequest request) {
        if (courseId == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User loginUser = userService.getLoginUser(request);
        boolean selected = courseSelectionService.checkStudentSelected(loginUser.getId(), courseId);
        return ResultUtils.success(selected);
    }

    /**
     * 获取选课统计信息
     *
     * @param courseId
     * @return
     */
    @GetMapping("/stats/{courseId}")
    @AuthCheck(mustRole = UserConstant.TEACHER_ROLE)
    public BaseResponse<Map<String, Integer>> getCourseSelectionStats(@PathVariable Long courseId) {
        if (courseId == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Map<String, Integer> stats = courseSelectionService.getCourseSelectionStats(courseId);
        return ResultUtils.success(stats);
    }
} 