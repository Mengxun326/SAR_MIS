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
     * 处分期限（月）
     */
    private Integer duration;

    /**
     * 是否已解除（0-未解除，1-已解除）
     */
    private Integer isRevoked;

    /**
     * 解除日期
     */
    private Date revokeDate;

    /**
     * 处理人
     */
    private String handler;

    /**
     * 备注
     */
    private String remark;

    private static final long serialVersionUID = 1L;
} 