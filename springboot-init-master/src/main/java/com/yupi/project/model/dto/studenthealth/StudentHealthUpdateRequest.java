package com.yupi.project.model.dto.studenthealth;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 更新学生健康信息请求
 */
@Data
public class StudentHealthUpdateRequest implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * 学号
     */
    private String studentId;

    /**
     * 身高(cm)
     */
    private BigDecimal height;

    /**
     * 体重(kg)
     */
    private BigDecimal weight;

    /**
     * 视力
     */
    private String vision;

    /**
     * 血型
     */
    private String bloodType;

    /**
     * 体检日期
     */
    private Date checkDate;

    /**
     * 健康状况描述
     */
    private String healthStatus;

    private static final long serialVersionUID = 1L;
} 