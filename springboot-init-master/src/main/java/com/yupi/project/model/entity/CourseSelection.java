package com.yupi.project.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import java.io.Serializable;
import java.util.Date;

/**
 * 选课信息
 */
@TableName(value = "course_selection")
@Data
public class CourseSelection implements Serializable {

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    @TableId(type = IdType.ASSIGN_ID)
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;

    /**
     * 学生id
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long studentId;

    /**
     * 课程id
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long courseId;

    /**
     * 选课时间
     */
    private Date selectTime;

    /**
     * 选课状态（已选/退选）
     */
    private String status;

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