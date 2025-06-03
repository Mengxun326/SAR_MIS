package com.yupi.project.model.dto.studentstatuschange;

import com.yupi.project.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Date;

/**
 * 查询学生学籍异动信息请求
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class StudentStatusChangeQueryRequest extends PageRequest implements Serializable {

    /**
     * 学号
     */
    private String studentId;

    /**
     * 异动类型（休学/复学/退学/转专业/转学）
     */
    private String changeType;

    /**
     * 审批状态
     */
    private String status;

    /**
     * 异动开始日期
     */
    private Date startDate;

    /**
     * 异动结束日期
     */
    private Date endDate;

    private static final long serialVersionUID = 1L;
} 