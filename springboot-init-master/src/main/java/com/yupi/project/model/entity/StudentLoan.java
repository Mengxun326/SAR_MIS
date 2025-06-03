package com.yupi.project.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 学生贷款信息
 */
@TableName(value = "student_loan")
@Data
public class StudentLoan implements Serializable {

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;

    /**
     * 学号
     */
    private String studentId;

    /**
     * 贷款类型
     */
    private String loanType;

    /**
     * 贷款金额
     */
    private BigDecimal loanAmount;

    /**
     * 贷款日期
     */
    private Date loanDate;

    /**
     * 贷款期限(月)
     */
    private Integer loanTerm;

    /**
     * 贷款状态
     */
    private String status;

    /**
     * 创建用户 id
     */
    private Long createUser;

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