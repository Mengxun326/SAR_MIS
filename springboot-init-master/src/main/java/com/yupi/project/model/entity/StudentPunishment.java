package com.yupi.project.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import java.io.Serializable;
import java.util.Date;

/**
 * 学生处分信息
 */
@TableName(value = "student_punishment")
@Data
public class StudentPunishment implements Serializable {

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
     * 处分类型（警告/严重警告/记过/记大过/开除）
     */
    private String punishmentType;

    /**
     * 处分原因
     */
    private String reason;

    /**
     * 处分日期
     */
    @TableField("punishDate")
    private Date punishmentDate;

    /**
     * 解除处分日期
     */
    @TableField("cancelDate")
    private Date cancelDate;

    /**
     * 备注
     */
    @TableField("description")
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