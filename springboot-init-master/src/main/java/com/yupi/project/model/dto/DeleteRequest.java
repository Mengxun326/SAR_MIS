package com.yupi.project.model.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;

import java.io.Serializable;

/**
 * 删除请求
 */
@Data
public class DeleteRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;
} 