package com.yupi.project.model.dto.studentscore;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 添加学生成绩信息请求
 */
@Data
public class StudentScoreAddRequest implements Serializable {

    /**
     * 学号
     */
    private String studentId;

    /**
     * 课程代码
     */
    private String courseCode;

    /**
     * 学期
     */
    private String semester;

    /**
     * 成绩
     */
    private BigDecimal score;

    /**
     * 考试类型（正常/补考/重修）
     */
    private String examType;

    private static final long serialVersionUID = 1L;
} 