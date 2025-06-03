package com.yupi.project.model.dto.course;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 更新课程信息请求
 */
@Data
public class CourseUpdateRequest implements Serializable {

    /**
     * id
     */
    private String id;

    /**
     * 课程代码
     */
    private String courseCode;

    /**
     * 课程名称
     */
    private String courseName;

    /**
     * 学分
     */
    private BigDecimal credit;

    /**
     * 课时
     */
    private Integer courseHour;

    /**
     * 课程类型（必修/选修）
     */
    private String courseType;

    /**
     * 开课院系
     */
    private String department;

    /**
     * 最大选课人数
     */
    private Integer maxStudent;

    /**
     * 任课教师id
     */
    private Long teacherId;

    /**
     * 开课学期
     */
    private String semester;

    /**
     * 上课时间
     */
    private String courseTime;

    /**
     * 上课地点
     */
    private String location;

    private static final long serialVersionUID = 1L;
} 