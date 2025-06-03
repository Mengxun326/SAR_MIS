package com.yupi.project.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 课程信息
 */
@TableName(value = "course")
@Data
public class Course implements Serializable {

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    @TableId(type = IdType.ASSIGN_ID)
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;

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
     * 当前选课人数
     */
    private Integer currentStudent;

    /**
     * 任课教师id
     */
    @JsonSerialize(using = ToStringSerializer.class)
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

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 是否删除
     */
    @TableLogic
    private Integer isDelete;
} 