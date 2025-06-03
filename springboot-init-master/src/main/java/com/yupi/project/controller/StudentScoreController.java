package com.yupi.project.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.yupi.project.annotation.AuthCheck;
import com.yupi.project.common.BaseResponse;
import com.yupi.project.common.DeleteRequest;
import com.yupi.project.common.ErrorCode;
import com.yupi.project.common.ResultUtils;
import com.yupi.project.constant.UserConstant;
import com.yupi.project.exception.BusinessException;
import com.yupi.project.model.dto.studentscore.StudentScoreAddRequest;
import com.yupi.project.model.dto.studentscore.StudentScoreQueryRequest;
import com.yupi.project.model.dto.studentscore.StudentScoreUpdateRequest;
import com.yupi.project.model.entity.StudentScore;
import com.yupi.project.model.entity.User;
import com.yupi.project.service.StudentScoreService;
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
 * 学生成绩信息接口
 */
@RestController
@RequestMapping("/student/score")
@Slf4j
public class StudentScoreController {

    @Resource
    private StudentScoreService studentScoreService;

    @Resource
    private UserService userService;

    /**
     * 创建
     *
     * @param studentScoreAddRequest
     * @param request
     * @return
     */
    @PostMapping("/add")
    @AuthCheck(mustRole = UserConstant.TEACHER_ROLE)
    public BaseResponse<Boolean> addStudentScore(@RequestBody StudentScoreAddRequest studentScoreAddRequest, HttpServletRequest request) {
        if (studentScoreAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        StudentScore studentScore = new StudentScore();
        BeanUtils.copyProperties(studentScoreAddRequest, studentScore);
        // 校验
        validStudentScore(studentScore, true);
        User loginUser = userService.getLoginUser(request);
        boolean result = studentScoreService.addStudentScore(studentScore);
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
    public BaseResponse<Boolean> deleteStudentScore(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
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
        StudentScore oldStudentScore = studentScoreService.getById(id);
        if (oldStudentScore == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        boolean b = studentScoreService.removeById(id);
        return ResultUtils.success(b);
    }

    /**
     * 更新
     *
     * @param studentScoreUpdateRequest
     * @param request
     * @return
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = UserConstant.TEACHER_ROLE)
    public BaseResponse<Boolean> updateStudentScore(@RequestBody StudentScoreUpdateRequest studentScoreUpdateRequest,
            HttpServletRequest request) {
        if (studentScoreUpdateRequest == null || studentScoreUpdateRequest.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        StudentScore studentScore = new StudentScore();
        BeanUtils.copyProperties(studentScoreUpdateRequest, studentScore);
        // 参数校验
        validStudentScore(studentScore, false);
        User loginUser = userService.getLoginUser(request);
        boolean result = studentScoreService.updateStudentScore(studentScore);
        return ResultUtils.success(result);
    }

    /**
     * 根据 id 获取
     *
     * @param id
     * @return
     */
    @GetMapping("/get")
    public BaseResponse<StudentScore> getStudentScoreById(long id) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        StudentScore studentScore = studentScoreService.getById(id);
        return ResultUtils.success(studentScore);
    }

    /**
     * 获取列表（仅管理员可使用）
     *
     * @param studentScoreQueryRequest
     * @return
     */
    @PostMapping("/list/page")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Page<StudentScore>> listStudentScoreByPage(@RequestBody StudentScoreQueryRequest studentScoreQueryRequest) {
        if (studentScoreQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Page<StudentScore> studentScorePage = studentScoreService.listStudentScoreByPage(studentScoreQueryRequest);
        return ResultUtils.success(studentScorePage);
    }

    /**
     * 获取学生GPA
     *
     * @param studentId
     * @param semester
     * @return
     */
    @GetMapping("/gpa")
    public BaseResponse<BigDecimal> getStudentGPA(@RequestParam String studentId, @RequestParam String semester) {
        if (StringUtils.isAnyBlank(studentId, semester)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        BigDecimal gpa = studentScoreService.getStudentGPA(studentId, semester);
        return ResultUtils.success(gpa);
    }

    /**
     * 获取课程成绩分布
     *
     * @param courseCode
     * @param semester
     * @return
     */
    @GetMapping("/distribution")
    public BaseResponse<Map<String, Integer>> getCourseScoreDistribution(@RequestParam String courseCode, @RequestParam String semester) {
        if (StringUtils.isAnyBlank(courseCode, semester)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Map<String, Integer> distribution = studentScoreService.getCourseScoreDistribution(courseCode, semester);
        return ResultUtils.success(distribution);
    }

    /**
     * 获取学生成绩趋势
     *
     * @param studentId
     * @return
     */
    @GetMapping("/trend")
    public BaseResponse<Map<String, BigDecimal>> getStudentScoreTrend(@RequestParam String studentId) {
        if (StringUtils.isBlank(studentId)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Map<String, BigDecimal> trend = studentScoreService.getStudentScoreTrend(studentId);
        return ResultUtils.success(trend);
    }

    /**
     * 获取班级成绩排名
     *
     * @param courseCode
     * @param semester
     * @return
     */
    @GetMapping("/ranking")
    public BaseResponse<List<Map<String, Object>>> getClassRanking(@RequestParam String courseCode, @RequestParam String semester) {
        if (StringUtils.isAnyBlank(courseCode, semester)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        List<Map<String, Object>> ranking = studentScoreService.getClassRanking(courseCode, semester);
        return ResultUtils.success(ranking);
    }

    /**
     * 校验学生成绩信息
     *
     * @param studentScore
     * @param add
     */
    private void validStudentScore(StudentScore studentScore, boolean add) {
        if (studentScore == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String studentId = studentScore.getStudentId();
        String courseCode = studentScore.getCourseCode();
        String semester = studentScore.getSemester();
        BigDecimal score = studentScore.getScore();
        String examType = studentScore.getExamType();
        
        // 创建时，参数不能为空
        if (add) {
            if (StringUtils.isAnyBlank(studentId, courseCode, semester, examType)) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "必填参数不能为空");
            }
            if (score == null) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "成绩不能为空");
            }
        }
        
        // 有参数则校验
        if (score != null) {
            if (score.compareTo(BigDecimal.ZERO) < 0 || score.compareTo(new BigDecimal("100")) > 0) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "成绩必须在0-100之间");
            }
        }
        if (StringUtils.isNotBlank(examType) && !examType.matches("^(正常|补考|重修)$")) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "考试类型只能是：正常、补考、重修");
        }
    }
} 