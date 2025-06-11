package com.yupi.project.model.dto.studentpunishment;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 添加学生处分信息请求
 */
@Data
public class StudentPunishmentAddRequest implements Serializable {

    /**
     * 学号
     */
    private String studentId;

    /**
     * 处分类型（警告/严重警告/记过/记大过/开除）
     */
    private String punishmentType;

    /**
     * 处分原因
     */
    private String reason;

    /**
     * 处分日期
     */
    private Date punishmentDate;

    /**
     * 备注
     */
    private String description;

    private static final long serialVersionUID = 1L;
} 