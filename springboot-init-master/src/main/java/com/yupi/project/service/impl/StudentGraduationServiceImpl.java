package com.yupi.project.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yupi.project.mapper.StudentGraduationMapper;
import com.yupi.project.model.entity.StudentGraduation;
import com.yupi.project.service.StudentGraduationService;
import org.springframework.stereotype.Service;

/**
 * 毕业信息服务实现类
 */
@Service
public class StudentGraduationServiceImpl extends ServiceImpl<StudentGraduationMapper, StudentGraduation>
        implements StudentGraduationService {

} 