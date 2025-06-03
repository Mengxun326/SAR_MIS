package com.yupi.project.model.dto.student;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 更新学生体检信息请求
 */
@Data
public class StudentHealthUpdateRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    private Long id;

    /**
     * 学号
     */
    private String studentId;

    /**
     * 体检日期
     */
    private Date checkDate;

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
     * 健康状况描述
     */
    private String healthStatus;
} 