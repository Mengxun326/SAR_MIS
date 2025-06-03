package com.yupi.project.model.dto.courseselection;

import lombok.Data;

import java.io.Serializable;

/**
 * 添加选课信息请求
 */
@Data
public class CourseSelectionAddRequest implements Serializable {

    /**
     * 课程id
     */
    private Long courseId;

    private static final long serialVersionUID = 1L;
} 