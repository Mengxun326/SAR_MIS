package com.yupi.project.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yupi.project.common.ErrorCode;
import com.yupi.project.constant.CommonConstant;
import com.yupi.project.exception.BusinessException;
import com.yupi.project.mapper.StudentScoreMapper;
import com.yupi.project.model.dto.studentscore.StudentScoreQueryRequest;
import com.yupi.project.model.entity.StudentScore;
import com.yupi.project.service.StudentScoreService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 学生成绩信息服务实现
 */
@Service
public class StudentScoreServiceImpl extends ServiceImpl<StudentScoreMapper, StudentScore>
        implements StudentScoreService {

    @Override
    public boolean addStudentScore(StudentScore studentScore) {
        if (studentScore == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        // 计算绩点
        if (studentScore.getScore() != null) {
            studentScore.setGradePoint(calculateGradePoint(studentScore.getScore()));
        }
        
        return this.save(studentScore);
    }

    @Override
    public boolean updateStudentScore(StudentScore studentScore) {
        if (studentScore == null || studentScore.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        // 判断是否存在
        StudentScore oldStudentScore = this.getById(studentScore.getId());
        if (oldStudentScore == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        
        // 计算绩点
        if (studentScore.getScore() != null) {
            studentScore.setGradePoint(calculateGradePoint(studentScore.getScore()));
        }
        
        return this.updateById(studentScore);
    }

    @Override
    public Page<StudentScore> listStudentScoreByPage(StudentScoreQueryRequest studentScoreQueryRequest) {
        if (studentScoreQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        StudentScore studentScoreQuery = new StudentScore();
        BeanUtils.copyProperties(studentScoreQueryRequest, studentScoreQuery);
        
        long current = studentScoreQueryRequest.getCurrent();
        long size = studentScoreQueryRequest.getPageSize();
        String sortField = studentScoreQueryRequest.getSortField();
        String sortOrder = studentScoreQueryRequest.getSortOrder();
        
        // 限制爬虫
        if (size > 50) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        QueryWrapper<StudentScore> queryWrapper = new QueryWrapper<>(studentScoreQuery);
        
        // 增加分数范围查询条件
        BigDecimal minScore = studentScoreQueryRequest.getMinScore();
        BigDecimal maxScore = studentScoreQueryRequest.getMaxScore();
        if (minScore != null) {
            queryWrapper.ge("score", minScore);
        }
        if (maxScore != null) {
            queryWrapper.le("score", maxScore);
        }
        
        queryWrapper.orderBy(StringUtils.isNotBlank(sortField),
                sortOrder.equals(CommonConstant.SORT_ORDER_ASC), sortField);
        
        return this.page(new Page<>(current, size), queryWrapper);
    }

    @Override
    public BigDecimal calculateGradePoint(BigDecimal score) {
        if (score == null) {
            return BigDecimal.ZERO;
        }
        
        // 绩点计算规则：
        // 90-100分：4.0
        // 85-89分：3.7
        // 82-84分：3.3
        // 78-81分：3.0
        // 75-77分：2.7
        // 72-74分：2.3
        // 68-71分：2.0
        // 64-67分：1.5
        // 60-63分：1.0
        // 60分以下：0
        if (score.compareTo(new BigDecimal("90")) >= 0) return new BigDecimal("4.0");
        if (score.compareTo(new BigDecimal("85")) >= 0) return new BigDecimal("3.7");
        if (score.compareTo(new BigDecimal("82")) >= 0) return new BigDecimal("3.3");
        if (score.compareTo(new BigDecimal("78")) >= 0) return new BigDecimal("3.0");
        if (score.compareTo(new BigDecimal("75")) >= 0) return new BigDecimal("2.7");
        if (score.compareTo(new BigDecimal("72")) >= 0) return new BigDecimal("2.3");
        if (score.compareTo(new BigDecimal("68")) >= 0) return new BigDecimal("2.0");
        if (score.compareTo(new BigDecimal("64")) >= 0) return new BigDecimal("1.5");
        if (score.compareTo(new BigDecimal("60")) >= 0) return new BigDecimal("1.0");
        return BigDecimal.ZERO;
    }

    @Override
    public BigDecimal getStudentGPA(String studentId, String semester) {
        if (StringUtils.isAnyBlank(studentId, semester)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        QueryWrapper<StudentScore> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("studentId", studentId)
                .eq("semester", semester)
                .isNotNull("gradePoint");
        
        List<StudentScore> scoreList = this.list(queryWrapper);
        if (scoreList.isEmpty()) {
            return BigDecimal.ZERO;
        }
        
        // 计算平均绩点
        BigDecimal totalPoint = scoreList.stream()
                .map(StudentScore::getGradePoint)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        return totalPoint.divide(new BigDecimal(scoreList.size()), 2, RoundingMode.HALF_UP);
    }

    @Override
    public Map<String, Integer> getCourseScoreDistribution(String courseCode, String semester) {
        if (StringUtils.isAnyBlank(courseCode, semester)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        QueryWrapper<StudentScore> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("courseCode", courseCode)
                .eq("semester", semester)
                .isNotNull("score");
        
        List<StudentScore> scoreList = this.list(queryWrapper);
        
        // 初始化分数段
        Map<String, Integer> distribution = new LinkedHashMap<>();
        distribution.put("90-100", 0);
        distribution.put("80-89", 0);
        distribution.put("70-79", 0);
        distribution.put("60-69", 0);
        distribution.put("0-59", 0);
        
        // 统计分布
        for (StudentScore score : scoreList) {
            BigDecimal scoreValue = score.getScore();
            if (scoreValue.compareTo(new BigDecimal("90")) >= 0) {
                distribution.put("90-100", distribution.get("90-100") + 1);
            } else if (scoreValue.compareTo(new BigDecimal("80")) >= 0) {
                distribution.put("80-89", distribution.get("80-89") + 1);
            } else if (scoreValue.compareTo(new BigDecimal("70")) >= 0) {
                distribution.put("70-79", distribution.get("70-79") + 1);
            } else if (scoreValue.compareTo(new BigDecimal("60")) >= 0) {
                distribution.put("60-69", distribution.get("60-69") + 1);
            } else {
                distribution.put("0-59", distribution.get("0-59") + 1);
            }
        }
        
        return distribution;
    }

    @Override
    public Map<String, BigDecimal> getStudentScoreTrend(String studentId) {
        if (StringUtils.isBlank(studentId)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        QueryWrapper<StudentScore> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("studentId", studentId)
                .isNotNull("score")
                .orderBy(true, true, "semester");
        
        List<StudentScore> scoreList = this.list(queryWrapper);
        
        // 按学期分组计算平均分
        return scoreList.stream()
                .collect(Collectors.groupingBy(
                        StudentScore::getSemester,
                        Collectors.mapping(
                                StudentScore::getScore,
                                Collectors.reducing(
                                        BigDecimal.ZERO,
                                        BigDecimal::add
                                )
                        )
                ))
                .entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        e -> e.getValue().divide(new BigDecimal(
                                scoreList.stream()
                                        .filter(s -> s.getSemester().equals(e.getKey()))
                                        .count()
                        ), 2, RoundingMode.HALF_UP),
                        (e1, e2) -> e1,
                        LinkedHashMap::new
                ));
    }

    @Override
    public List<Map<String, Object>> getClassRanking(String courseCode, String semester) {
        if (StringUtils.isAnyBlank(courseCode, semester)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        QueryWrapper<StudentScore> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("courseCode", courseCode)
                .eq("semester", semester)
                .isNotNull("score")
                .orderByDesc("score");
        
        List<StudentScore> scoreList = this.list(queryWrapper);
        
        List<Map<String, Object>> rankingList = new ArrayList<>();
        int rank = 1;
        BigDecimal lastScore = null;
        int sameRankCount = 0;
        
        for (StudentScore score : scoreList) {
            Map<String, Object> rankInfo = new HashMap<>();
            rankInfo.put("studentId", score.getStudentId());
            rankInfo.put("score", score.getScore());
            
            // 处理同分情况
            if (lastScore != null && lastScore.equals(score.getScore())) {
                rankInfo.put("rank", rank - sameRankCount);
                sameRankCount++;
            } else {
                rankInfo.put("rank", rank);
                lastScore = score.getScore();
                sameRankCount = 1;
            }
            
            rankingList.add(rankInfo);
            rank++;
        }
        
        return rankingList;
    }
} 