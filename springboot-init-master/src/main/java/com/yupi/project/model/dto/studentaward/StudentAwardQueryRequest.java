package com.yupi.project.model.dto.studentaward;

import com.yupi.project.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * 学生奖励查询请求
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class StudentAwardQueryRequest extends PageRequest implements Serializable {
    /**
     * 学号
     */
    private String studentId;

    /**
     * 奖项名称
     */
    private String awardName;

    /**
     * 奖项级别
     */
    private String awardLevel;

    private static final long serialVersionUID = 1L;
} 