package com.yupi.project.model.dto.studenthealth;

import com.yupi.project.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Date;

/**
 * 查询学生健康信息请求
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class StudentHealthQueryRequest extends PageRequest implements Serializable {

    /**
     * 学号
     */
    private String studentId;

    /**
     * 血型
     */
    private String bloodType;

    /**
     * 体检日期
     */
    private Date checkDate;

    /**
     * 健康状况
     */
    private String healthStatus;

    private static final long serialVersionUID = 1L;
} 