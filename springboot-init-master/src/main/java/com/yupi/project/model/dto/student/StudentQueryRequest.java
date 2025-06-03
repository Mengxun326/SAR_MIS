package com.yupi.project.model.dto.student;

import com.yupi.project.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Date;

/**
 * 查询学生请求
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class StudentQueryRequest extends PageRequest implements Serializable {

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
     * 姓名
     */
    private String name;

    /**
     * 性别
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
     * 学院
     */
    private String department;

    /**
     * 专业
     */
    private String major;

    /**
     * 班级
     */
    private String className;

    /**
     * 学籍状态
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
} 