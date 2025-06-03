package com.yupi.project.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 毕业信息
 */
@TableName(value = "student_graduation")
@Data
public class StudentGraduation implements Serializable {

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;

    /**
     * 学号
     */
    private String studentId;

    /**
     * 毕业日期
     */
    private Date graduationDate;

    /**
     * 毕业证书编号
     */
    private String diplomaNo;

    /**
     * 学位名称
     */
    private String degreeName;

    /**
     * 学位证书编号
     */
    private String degreeNo;

    /**
     * 毕业状态
     */
    private String status;

    /**
     * 创建用户 id
     */
    private Long createUser;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 是否删除
     */
    @TableLogic
    private Integer isDelete;
} 