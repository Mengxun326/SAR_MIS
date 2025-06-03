package com.yupi.project.model.dto.course;

import com.yupi.project.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * 查询课程信息请求
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class CourseQueryRequest extends PageRequest implements Serializable {

    /**
     * 课程代码
     */
    private String courseCode;

    /**
     * 课程名称
     */
    private String courseName;

    /**
     * 课程类型（必修/选修）
     */
    private String courseType;

    /**
     * 开课院系
     */
    private String department;

    /**
     * 任课教师id
     */
    private Long teacherId;

    /**
     * 开课学期
     */
    private String semester;

    private static final long serialVersionUID = 1L;
} 