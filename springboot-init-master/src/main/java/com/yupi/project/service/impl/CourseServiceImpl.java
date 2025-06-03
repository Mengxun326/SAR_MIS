package com.yupi.project.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yupi.project.common.ErrorCode;
import com.yupi.project.constant.CommonConstant;
import com.yupi.project.exception.BusinessException;
import com.yupi.project.mapper.CourseMapper;
import com.yupi.project.model.dto.course.CourseQueryRequest;
import com.yupi.project.model.entity.Course;
import com.yupi.project.service.CourseService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 课程信息服务实现
 */
@Service
public class CourseServiceImpl extends ServiceImpl<CourseMapper, Course>
        implements CourseService {

    @Override
    public boolean addCourse(Course course) {
        if (course == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        // 课程代码不能重复
        QueryWrapper<Course> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("courseCode", course.getCourseCode());
        long count = this.count(queryWrapper);
        if (count > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "课程代码已存在");
        }
        
        // 初始化当前选课人数
        course.setCurrentStudent(0);
        
        return this.save(course);
    }

    @Override
    public boolean updateCourse(Course course) {
        if (course == null || course.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        // 判断是否存在
        Course oldCourse = this.getById(course.getId());
        if (oldCourse == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        
        // 如果修改了课程代码，需要检查是否重复
        if (!oldCourse.getCourseCode().equals(course.getCourseCode())) {
            QueryWrapper<Course> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("courseCode", course.getCourseCode());
            long count = this.count(queryWrapper);
            if (count > 0) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "课程代码已存在");
            }
        }
        
        return this.updateById(course);
    }

    @Override
    public Page<Course> listCourseByPage(CourseQueryRequest courseQueryRequest) {
        if (courseQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        Course courseQuery = new Course();
        BeanUtils.copyProperties(courseQueryRequest, courseQuery);
        
        long current = courseQueryRequest.getCurrent();
        long size = courseQueryRequest.getPageSize();
        String sortField = courseQueryRequest.getSortField();
        String sortOrder = courseQueryRequest.getSortOrder();
        
        // 限制爬虫
        if (size > 50) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        QueryWrapper<Course> queryWrapper = new QueryWrapper<>(courseQuery);
        queryWrapper.orderBy(StringUtils.isNotBlank(sortField),
                sortOrder.equals(CommonConstant.SORT_ORDER_ASC), sortField);
        
        return this.page(new Page<>(current, size), queryWrapper);
    }

    @Override
    public List<Course> getTeacherCourses(Long teacherId, String semester) {
        if (teacherId == null || StringUtils.isBlank(semester)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        QueryWrapper<Course> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("teacherId", teacherId)
                .eq("semester", semester);
        
        return this.list(queryWrapper);
    }

    @Override
    public Map<String, Integer> getDepartmentCourseStats(String semester) {
        if (StringUtils.isBlank(semester)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        QueryWrapper<Course> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("semester", semester);
        
        List<Course> courseList = this.list(queryWrapper);
        
        return courseList.stream()
                .collect(Collectors.groupingBy(
                        Course::getDepartment,
                        LinkedHashMap::new,
                        Collectors.collectingAndThen(
                                Collectors.counting(),
                                Long::intValue
                        )
                ));
    }

    @Override
    public Map<String, Integer> getCourseTypeStats(String semester) {
        if (StringUtils.isBlank(semester)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        QueryWrapper<Course> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("semester", semester);
        
        List<Course> courseList = this.list(queryWrapper);
        
        return courseList.stream()
                .collect(Collectors.groupingBy(
                        Course::getCourseType,
                        LinkedHashMap::new,
                        Collectors.collectingAndThen(
                                Collectors.counting(),
                                Long::intValue
                        )
                ));
    }

    @Override
    public boolean checkCourseAvailable(Long courseId) {
        if (courseId == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        Course course = this.getById(courseId);
        if (course == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        
        // 检查是否达到最大选课人数
        return course.getCurrentStudent() < course.getMaxStudent();
    }
} 