package com.yupi.project.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yupi.project.common.ErrorCode;
import com.yupi.project.constant.CommonConstant;
import com.yupi.project.exception.BusinessException;
import com.yupi.project.mapper.CourseMapper;
import com.yupi.project.mapper.CourseSelectionMapper;
import com.yupi.project.mapper.UserMapper;
import com.yupi.project.model.dto.courseselection.CourseSelectionQueryRequest;
import com.yupi.project.model.entity.Course;
import com.yupi.project.model.entity.CourseSelection;
import com.yupi.project.model.entity.User;
import com.yupi.project.model.vo.CourseSelectionVO;
import com.yupi.project.service.CourseSelectionService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 选课信息服务实现
 */
@Service
public class CourseSelectionServiceImpl extends ServiceImpl<CourseSelectionMapper, CourseSelection>
        implements CourseSelectionService {

    @Resource
    private CourseMapper courseMapper;

    @Resource
    private UserMapper userMapper;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean selectCourse(Long studentId, Long courseId) {
        if (studentId == null || courseId == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        // 检查课程是否存在
        Course course = courseMapper.selectById(courseId);
        if (course == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "课程不存在");
        }

        // 检查是否已选
        if (checkStudentSelected(studentId, courseId)) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "已经选过该课程");
        }

        // 检查是否可以选课
        if (course.getCurrentStudent() >= course.getMaxStudent()) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "课程已满");
        }

        // 创建选课记录
        CourseSelection courseSelection = new CourseSelection();
        courseSelection.setStudentId(studentId);
        courseSelection.setCourseId(courseId);
        courseSelection.setSelectTime(new Date());
        courseSelection.setStatus("已选");

        // 更新课程选课人数
        course.setCurrentStudent(course.getCurrentStudent() + 1);
        courseMapper.updateById(course);

        return this.save(courseSelection);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean dropCourse(Long studentId, Long courseId) {
        if (studentId == null || courseId == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        // 检查课程是否存在
        Course course = courseMapper.selectById(courseId);
        if (course == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "课程不存在");
        }

        // 检查是否已选
        QueryWrapper<CourseSelection> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("studentId", studentId)
                .eq("courseId", courseId)
                .eq("status", "已选");
        CourseSelection courseSelection = this.getOne(queryWrapper);
        if (courseSelection == null) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "未选择该课程");
        }

        // 更新选课状态
        courseSelection.setStatus("退选");
        this.updateById(courseSelection);

        // 更新课程选课人数
        course.setCurrentStudent(course.getCurrentStudent() - 1);
        courseMapper.updateById(course);

        return true;
    }

    @Override
    public Page<CourseSelectionVO> listCourseSelectionByPage(CourseSelectionQueryRequest courseSelectionQueryRequest) {
        if (courseSelectionQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        long current = courseSelectionQueryRequest.getCurrent();
        long size = courseSelectionQueryRequest.getPageSize();
        String sortField = courseSelectionQueryRequest.getSortField();
        String sortOrder = courseSelectionQueryRequest.getSortOrder();

        // 限制爬虫
        if (size > 50) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        QueryWrapper<CourseSelection> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq(courseSelectionQueryRequest.getStudentId() != null, "studentId", courseSelectionQueryRequest.getStudentId())
                .eq(courseSelectionQueryRequest.getCourseId() != null, "courseId", courseSelectionQueryRequest.getCourseId())
                .eq(StringUtils.isNotBlank(courseSelectionQueryRequest.getStatus()), "status", courseSelectionQueryRequest.getStatus())
                .ge(courseSelectionQueryRequest.getStartTime() != null, "selectTime", courseSelectionQueryRequest.getStartTime())
                .le(courseSelectionQueryRequest.getEndTime() != null, "selectTime", courseSelectionQueryRequest.getEndTime())
                .orderBy(StringUtils.isNotBlank(sortField),
                        sortOrder.equals(CommonConstant.SORT_ORDER_ASC),
                        sortField);

        Page<CourseSelection> courseSelectionPage = this.page(new Page<>(current, size), queryWrapper);
        Page<CourseSelectionVO> courseSelectionVOPage = new Page<>(current, size, courseSelectionPage.getTotal());

        // 关联查询用户和课程信息
        List<CourseSelectionVO> courseSelectionVOList = courseSelectionPage.getRecords().stream().map(courseSelection -> {
            CourseSelectionVO courseSelectionVO = new CourseSelectionVO();
            BeanUtils.copyProperties(courseSelection, courseSelectionVO);

            // 关联学生信息
            User student = userMapper.selectById(courseSelection.getStudentId());
            if (student != null) {
                courseSelectionVO.setStudentName(student.getUserName());
            }

            // 关联课程信息
            Course course = courseMapper.selectById(courseSelection.getCourseId());
            if (course != null) {
                courseSelectionVO.setCourseName(course.getCourseName());
                courseSelectionVO.setCourseCode(course.getCourseCode());
            }

            return courseSelectionVO;
        }).collect(Collectors.toList());

        courseSelectionVOPage.setRecords(courseSelectionVOList);
        return courseSelectionVOPage;
    }

    @Override
    public List<CourseSelectionVO> getStudentCourseSelections(Long studentId) {
        if (studentId == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        QueryWrapper<CourseSelection> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("studentId", studentId)
                .eq("status", "已选");

        return this.list(queryWrapper).stream().map(courseSelection -> {
            CourseSelectionVO courseSelectionVO = new CourseSelectionVO();
            BeanUtils.copyProperties(courseSelection, courseSelectionVO);

            // 关联课程信息
            Course course = courseMapper.selectById(courseSelection.getCourseId());
            if (course != null) {
                courseSelectionVO.setCourseName(course.getCourseName());
                courseSelectionVO.setCourseCode(course.getCourseCode());
            }

            return courseSelectionVO;
        }).collect(Collectors.toList());
    }

    @Override
    public List<CourseSelectionVO> getCourseStudentSelections(Long courseId) {
        if (courseId == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        QueryWrapper<CourseSelection> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("courseId", courseId)
                .eq("status", "已选");

        return this.list(queryWrapper).stream().map(courseSelection -> {
            CourseSelectionVO courseSelectionVO = new CourseSelectionVO();
            BeanUtils.copyProperties(courseSelection, courseSelectionVO);

            // 关联学生信息
            User student = userMapper.selectById(courseSelection.getStudentId());
            if (student != null) {
                courseSelectionVO.setStudentName(student.getUserName());
            }

            return courseSelectionVO;
        }).collect(Collectors.toList());
    }

    @Override
    public boolean checkStudentSelected(Long studentId, Long courseId) {
        if (studentId == null || courseId == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        QueryWrapper<CourseSelection> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("studentId", studentId)
                .eq("courseId", courseId)
                .eq("status", "已选");

        return this.count(queryWrapper) > 0;
    }

    @Override
    public Map<String, Integer> getCourseSelectionStats(Long courseId) {
        if (courseId == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        QueryWrapper<CourseSelection> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("courseId", courseId);

        List<CourseSelection> courseSelectionList = this.list(queryWrapper);

        return courseSelectionList.stream()
                .collect(Collectors.groupingBy(
                        CourseSelection::getStatus,
                        LinkedHashMap::new,
                        Collectors.collectingAndThen(
                                Collectors.counting(),
                                Long::intValue
                        )
                ));
    }
} 