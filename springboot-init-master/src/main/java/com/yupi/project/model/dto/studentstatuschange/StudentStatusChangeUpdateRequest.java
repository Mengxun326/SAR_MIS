package com.yupi.project.model.dto.studentstatuschange;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 更新学生学籍异动信息请求
 */
@Data
public class StudentStatusChangeUpdateRequest implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * 学号
     */
    private String studentId;

    /**
     * 异动类型（休学/复学/退学/转专业/转学）
     */
    private String changeType;

    /**
     * 异动日期
     */
    private Date changeDate;

    /**
     * 原因
     */
    private String reason;

    /**
     * 审批人
     */
    private String approver;

    /**
     * 审批状态
     */
    private String status;

    private static final long serialVersionUID = 1L;
} 