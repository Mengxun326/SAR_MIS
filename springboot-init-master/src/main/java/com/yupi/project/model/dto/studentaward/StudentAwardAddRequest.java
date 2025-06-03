package com.yupi.project.model.dto.studentaward;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 添加学生奖励请求
 */
@Data
public class StudentAwardAddRequest implements Serializable {

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

    private static final long serialVersionUID = 1L;
} 