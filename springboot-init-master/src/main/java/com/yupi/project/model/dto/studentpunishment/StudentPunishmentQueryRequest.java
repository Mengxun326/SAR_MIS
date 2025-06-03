package com.yupi.project.model.dto.studentpunishment;

import com.yupi.project.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Date;

/**
 * 查询学生处分信息请求
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class StudentPunishmentQueryRequest extends PageRequest implements Serializable {

    /**
     * 学号
     */
    private String studentId;

    /**
     * 处分类型（警告/严重警告/记过/记大过/开除）
     */
    private String punishmentType;

    /**
     * 是否已解除（0-未解除，1-已解除）
     */
    private Integer isRevoked;

    /**
     * 处分开始日期
     */
    private Date startDate;

    /**
     * 处分结束日期
     */
    private Date endDate;

    private static final long serialVersionUID = 1L;
} 