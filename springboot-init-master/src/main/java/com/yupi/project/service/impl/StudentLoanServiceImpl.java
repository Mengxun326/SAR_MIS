package com.yupi.project.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yupi.project.mapper.StudentLoanMapper;
import com.yupi.project.model.entity.StudentLoan;
import com.yupi.project.service.StudentLoanService;
import org.springframework.stereotype.Service;

/**
 * 学生贷款信息服务实现类
 */
@Service
public class StudentLoanServiceImpl extends ServiceImpl<StudentLoanMapper, StudentLoan>
        implements StudentLoanService {

} 