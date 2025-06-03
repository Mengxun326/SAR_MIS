package com.yupi.project.controller;

import com.yupi.project.common.BaseResponse;
import com.yupi.project.common.ResultUtils;
import com.yupi.project.service.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

/**
 * 统计数据接口
 */
@RestController
@RequestMapping("/statistics")
@Slf4j
public class StatisticsController {

    @Resource
    private StudentService studentService;

    @Resource
    private CourseService courseService;

    @Resource
    private StudentAwardService studentAwardService;

    @Resource
    private UserService userService;

    /**
     * 获取首页统计数据
     *
     * @return
     */
    @GetMapping("/dashboard")
    public BaseResponse<Map<String, Object>> getDashboardStatistics() {
        Map<String, Object> statistics = new HashMap<>();

        try {
            // 在校学生总数
            long studentCount = studentService.count();
            statistics.put("studentCount", studentCount);

            // 开设课程数
            long courseCount = courseService.count();
            statistics.put("courseCount", courseCount);

            // 本月奖励次数
            String currentMonth = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM"));
            long monthlyAwardCount = studentAwardService.getMonthlyAwardCount(currentMonth);
            statistics.put("monthlyAwardCount", monthlyAwardCount);

            // 教职工人数（管理员和教师角色的用户）
            long teacherCount = userService.getTeacherCount();
            statistics.put("teacherCount", teacherCount);

            return ResultUtils.success(statistics);
        } catch (Exception e) {
            log.error("获取统计数据失败", e);
            // 返回默认值
            statistics.put("studentCount", 0);
            statistics.put("courseCount", 0);
            statistics.put("monthlyAwardCount", 0);
            statistics.put("teacherCount", 0);
            return ResultUtils.success(statistics);
        }
    }

    /**
     * 测试接口连通性
     *
     * @return
     */
    @GetMapping("/test")
    public BaseResponse<String> testConnection() {
        return ResultUtils.success("统计接口连接正常！");
    }
} 