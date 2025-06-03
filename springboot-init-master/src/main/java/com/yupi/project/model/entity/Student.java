package com.yupi.project.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 学生
 */
@TableName(value = "student")
@Data
public class Student implements Serializable {

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    @TableId(type = IdType.ASSIGN_ID)
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;

    /**
     * 关联用户id
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long userId;

    /**
     * 学号
     */
    private String studentId;

    /**
     * 姓名
     */
    private String name;

    /**
     * 性别（0-女，1-男）
     */
    private Integer gender;

    /**
     * 出生日期
     */
    private Date birthDate;

    /**
     * 身份证号
     */
    private String idCard;

    /**
     * 民族
     */
    private String nationality;

    /**
     * 政治面貌
     */
    private String politicalStatus;

    /**
     * 入学日期
     */
    private Date enrollmentDate;

    /**
     * 专业
     */
    private String major;

    /**
     * 班级
     */
    @TableField("`class`")
    private String className;

    /**
     * 学籍状态（在读/休学/退学/毕业）
     */
    private String status;

    /**
     * 联系电话
     */
    private String phone;

    /**
     * 电子邮箱
     */
    private String email;

    /**
     * 家庭住址
     */
    private String address;

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