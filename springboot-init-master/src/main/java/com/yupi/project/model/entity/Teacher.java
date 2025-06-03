package com.yupi.project.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 教师实体类
 */
@TableName(value = "teacher")
@Data
public class Teacher implements Serializable {

    /**
     * 教师ID
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
     * 工号
     */
    private String teacherNumber;

    /**
     * 姓名
     */
    private String name;

    /**
     * 性别（0-女，1-男）
     */
    private Integer gender;

    /**
     * 年龄
     */
    private Integer age;

    /**
     * 职称
     */
    private String title;

    /**
     * 所属院系
     */
    private String department;

    /**
     * 研究方向
     */
    private String researchArea;

    /**
     * 联系电话
     */
    private String phone;

    /**
     * 邮箱
     */
    private String email;

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

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
} 