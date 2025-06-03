package com.yupi.project.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 学生奖励信息
 */
@TableName(value = "student_award")
@Data
public class StudentAward implements Serializable {

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
     * 奖项名称
     */
    private String awardName;

    /**
     * 奖项级别
     */
    private String awardLevel;

    /**
     * 获奖日期
     */
    private Date awardDate;

    /**
     * 奖金金额
     */
    private BigDecimal awardAmount;

    /**
     * 奖项描述
     */
    private String description;

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