package com.yupi.project.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import java.io.Serializable;
import java.util.Date;

/**
 * 学生学籍异动信息
 */
@TableName(value = "student_status_change")
@Data
public class StudentStatusChange implements Serializable {

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
     * 异动类型（休学/复学/退学/转专业/转学）
     */
    private String changeType;

    /**
     * 异动日期
     */
    private Date changeDate;

    /**
     * 原因
     */
    private String reason;

    /**
     * 审批人
     */
    private String approver;

    /**
     * 审批状态（0-待审批，1-已通过，2-已驳回）
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