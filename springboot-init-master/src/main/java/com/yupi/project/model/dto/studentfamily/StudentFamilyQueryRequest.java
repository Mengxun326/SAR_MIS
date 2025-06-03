package com.yupi.project.model.dto.studentfamily;

import com.yupi.project.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * 查询学生家庭信息请求
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class StudentFamilyQueryRequest extends PageRequest implements Serializable {

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

    private static final long serialVersionUID = 1L;
} 