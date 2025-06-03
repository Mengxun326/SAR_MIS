package com.yupi.project.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 学生成绩信息
 */
@TableName(value = "student_score")
@Data
public class StudentScore implements Serializable {

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    @TableId(type = IdType.ASSIGN_ID)
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;

    /**
     * 学号
     */
    private String studentId;

    /**
     * 课程代码
     */
    private String courseCode;

    /**
     * 学期
     */
    private String semester;

    /**
     * 成绩
     */
    private BigDecimal score;

    /**
     * 绩点
     */
    private BigDecimal gradePoint;

    /**
     * 考试类型（正常/补考/重修）
     */
    private String examType;

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