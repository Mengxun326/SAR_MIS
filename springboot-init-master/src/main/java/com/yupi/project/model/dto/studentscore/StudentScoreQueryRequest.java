package com.yupi.project.model.dto.studentscore;

import com.yupi.project.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 查询学生成绩信息请求
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class StudentScoreQueryRequest extends PageRequest implements Serializable {

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
     * 考试类型（正常/补考/重修）
     */
    private String examType;

    /**
     * 最低分数
     */
    private BigDecimal minScore;

    /**
     * 最高分数
     */
    private BigDecimal maxScore;

    private static final long serialVersionUID = 1L;
} 