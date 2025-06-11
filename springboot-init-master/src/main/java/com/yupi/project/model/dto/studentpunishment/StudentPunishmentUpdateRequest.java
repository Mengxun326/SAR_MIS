package com.yupi.project.model.dto.studentpunishment;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 更新学生处分信息请求
 */
@Data
public class StudentPunishmentUpdateRequest implements Serializable {

    /**
     * id
     */
    private Long id;

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
     * 解除处分日期
     */
    private Date cancelDate;

    /**
     * 备注
     */
    private String description;

    private static final long serialVersionUID = 1L;
} 