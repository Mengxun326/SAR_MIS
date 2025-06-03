package com.yupi.project.model.dto.courseselection;

import com.yupi.project.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Date;

/**
 * 查询选课信息请求
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class CourseSelectionQueryRequest extends PageRequest implements Serializable {

    /**
     * 学生id
     */
    private Long studentId;

    /**
     * 课程id
     */
    private Long courseId;

    /**
     * 选课状态（已选/退选）
     */
    private String status;

    /**
     * 开始时间
     */
    private Date startTime;

    /**
     * 结束时间
     */
    private Date endTime;

    private static final long serialVersionUID = 1L;
} 