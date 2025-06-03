package com.yupi.project.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yupi.project.common.ErrorCode;
import com.yupi.project.exception.BusinessException;
import com.yupi.project.mapper.StudentMapper;
import com.yupi.project.model.dto.student.StudentQueryRequest;
import com.yupi.project.model.entity.Student;
import com.yupi.project.service.StudentService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 学生服务实现
 */
@Service
@Slf4j
public class StudentServiceImpl extends ServiceImpl<StudentMapper, Student> implements StudentService {

    /**
     * 校验学生信息
     */
    @Override
    public void validStudent(Student student, boolean add) {
        if (student == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String studentId = student.getStudentId();
        String name = student.getName();
        String idCard = student.getIdCard();
        // 创建时，参数不能为空
        if (add) {
            if (StringUtils.isAnyBlank(studentId, name, idCard)) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR);
            }
        }
        // 有参数则校验
        if (StringUtils.isNotBlank(studentId) && studentId.length() > 20) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "学号过长");
        }
        if (StringUtils.isNotBlank(name) && name.length() > 50) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "名字过长");
        }
        if (StringUtils.isNotBlank(idCard) && idCard.length() != 18) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "身份证号格式错误");
        }
    }

    /**
     * 添加学生
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean addStudent(Student student) {
        if (student == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        // 校验学生信息
        validStudent(student, true);
        String studentId = student.getStudentId();
        
        log.info("开始查询学号为 {} 的学生记录", studentId);
        // 使用自定义方法查询（包括已删除记录）
        Student existStudent = baseMapper.getByStudentIdWithLogicDelete(studentId);
        
        // 如果找到记录
        if (existStudent != null) {
            log.info("找到学号为 {} 的记录，id={}, isDelete={}", studentId, existStudent.getId(), existStudent.getIsDelete());
            // 如果记录已被删除，则恢复该记录
            if (existStudent.getIsDelete() == 1) {
                log.info("该记录已被删除，准备恢复并更新");
                student.setId(existStudent.getId());
                student.setIsDelete(0);
                // 如果状态为空，设置默认值
                if (student.getStatus() == null) {
                    student.setStatus("在读");
                }
                try {
                    int rows = ((StudentMapper)baseMapper).updateByIdWithoutLogicDelete(student);
                    log.info("更新结果: {}", rows > 0);
                    return rows > 0;
                } catch (Exception e) {
                    log.error("更新失败", e);
                    throw new BusinessException(ErrorCode.OPERATION_ERROR, "更新失败：" + e.getMessage());
                }
            } else {
                log.info("该记录未被删除，抛出重复学号异常");
                throw new BusinessException(ErrorCode.OPERATION_ERROR, "该学号已存在");
            }
        }
        
        log.info("未找到已存在记录，准备新增学生");
        // 如果状态为空，设置默认值
        if (student.getStatus() == null) {
            student.setStatus("在读");
        }
        try {
            boolean result = this.save(student);
            log.info("新增结果: {}", result);
            return result;
        } catch (Exception e) {
            log.error("新增失败", e);
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "新增失败：" + e.getMessage());
        }
    }

    @Override
    public QueryWrapper<Student> getQueryWrapper(StudentQueryRequest studentQueryRequest) {
        if (studentQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        String studentId = studentQueryRequest.getStudentId();
        String name = studentQueryRequest.getName();
        Integer gender = studentQueryRequest.getGender();
        String major = studentQueryRequest.getMajor();
        String className = studentQueryRequest.getClassName();
        String status = studentQueryRequest.getStatus();
        QueryWrapper<Student> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq(StringUtils.isNotBlank(studentId), "studentId", studentId);
        queryWrapper.like(StringUtils.isNotBlank(name), "name", name);
        queryWrapper.eq(gender != null, "gender", gender);
        queryWrapper.eq(StringUtils.isNotBlank(major), "major", major);
        queryWrapper.eq(StringUtils.isNotBlank(className), "class", className);
        queryWrapper.eq(StringUtils.isNotBlank(status), "status", status);
        return queryWrapper;
    }

    @Override
    public Page<Student> listStudentByPage(StudentQueryRequest studentQueryRequest) {
        if (studentQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        QueryWrapper<Student> queryWrapper = getQueryWrapper(studentQueryRequest);
        long current = studentQueryRequest.getCurrent();
        long size = studentQueryRequest.getPageSize();
        return this.page(new Page<>(current, size), queryWrapper);
    }
} 