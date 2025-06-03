package com.yupi.project.model.dto.student;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 更新学生奖励信息请求
 */
@Data
public class StudentAwardUpdateRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * id
     */
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
} 