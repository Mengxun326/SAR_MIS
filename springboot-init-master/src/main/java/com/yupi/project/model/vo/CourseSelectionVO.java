package com.yupi.project.model.vo;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 选课信息视图
 */
@Data
public class CourseSelectionVO implements Serializable {

    /**
     * id
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;

    /**
     * 学生id
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long studentId;

    /**
     * 学生姓名
     */
    private String studentName;

    /**
     * 课程id
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long courseId;

    /**
     * 课程名称
     */
    private String courseName;

    /**
     * 课程代码
     */
    private String courseCode;

    /**
     * 选课时间
     */
    private Date selectTime;

    /**
     * 选课状态（已选/退选）
     */
    private String status;

    private static final long serialVersionUID = 1L;
} 