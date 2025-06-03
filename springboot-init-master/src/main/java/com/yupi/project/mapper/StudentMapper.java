package com.yupi.project.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yupi.project.model.entity.Student;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

/**
 * 学生数据库操作
 */
public interface StudentMapper extends BaseMapper<Student> {

    /**
     * 根据学号查询学生信息（包括已删除记录）
     * @param studentId 学号
     * @return 学生信息
     */
    @Select("SELECT * FROM student WHERE studentId = #{studentId}")
    Student getByStudentIdWithLogicDelete(String studentId);

    /**
     * 根据ID更新学生信息（忽略逻辑删除字段）
     * @param student 学生信息
     * @return 更新的行数
     */
    @Update("UPDATE student SET userId=#{userId}, studentId=#{studentId}, name=#{name}, " +
            "gender=#{gender}, birthDate=#{birthDate}, idCard=#{idCard}, " +
            "nationality=#{nationality}, politicalStatus=#{politicalStatus}, " +
            "enrollmentDate=#{enrollmentDate}, major=#{major}, `class`=#{className}, " +
            "status=#{status}, phone=#{phone}, email=#{email}, address=#{address}, " +
            "isDelete=#{isDelete} WHERE id=#{id}")
    int updateByIdWithoutLogicDelete(Student student);
} 