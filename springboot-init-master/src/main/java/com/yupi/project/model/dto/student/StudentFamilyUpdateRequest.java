package com.yupi.project.model.dto.student;

import lombok.Data;

import java.io.Serializable;

/**
 * 更新学生家庭信息请求
 */
@Data
public class StudentFamilyUpdateRequest implements Serializable {

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
     * 家长姓名
     */
    private String parentName;

    /**
     * 与学生关系
     */
    private String relationship;

    /**
     * 联系电话
     */
    private String phone;

    /**
     * 职业
     */
    private String occupation;

    /**
     * 工作单位
     */
    private String workUnit;

    /**
     * 家庭住址
     */
    private String address;
} 