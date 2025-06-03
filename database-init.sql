-- 学生学籍管理系统数据库初始化脚本

-- 创建数据库
CREATE DATABASE IF NOT EXISTS student_management DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE student_management;

-- 用户表
CREATE TABLE IF NOT EXISTS `user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'id',
    `userAccount` VARCHAR(256) NOT NULL COMMENT '用户账号',
    `userPassword` VARCHAR(512) NOT NULL COMMENT '用户密码',
    `userName` VARCHAR(256) NULL COMMENT '用户昵称',
    `userAvatar` VARCHAR(1024) NULL COMMENT '用户头像',
    `userRole` VARCHAR(256) NOT NULL DEFAULT 'user' COMMENT '用户角色：user/teacher/admin',
    `createTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updateTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `isDelete` TINYINT NOT NULL DEFAULT 0 COMMENT '是否删除',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_userAccount` (`userAccount`),
    INDEX `idx_userRole` (`userRole`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- 插入默认管理员用户
-- 密码为: 12345678 (使用盐值yupi加密后的MD5值: yupi12345678)
INSERT INTO `user` (`userAccount`, `userPassword`, `userName`, `userRole`) 
VALUES ('admin', 'f48fb301958d25c4710376c5d4b26508', '系统管理员', 'admin')
ON DUPLICATE KEY UPDATE `userName` = '系统管理员';

-- 学生表
CREATE TABLE IF NOT EXISTS `student` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'id',
    `studentId` VARCHAR(50) NOT NULL COMMENT '学号',
    `name` VARCHAR(100) NOT NULL COMMENT '姓名',
    `gender` TINYINT NOT NULL COMMENT '性别：0-女，1-男',
    `birthDate` DATE NULL COMMENT '出生日期',
    `idCard` VARCHAR(18) NULL COMMENT '身份证号',
    `nationality` VARCHAR(50) NULL COMMENT '民族',
    `politicalStatus` VARCHAR(50) NULL COMMENT '政治面貌',
    `enrollmentDate` DATE NULL COMMENT '入学日期',
    `department` VARCHAR(100) NULL COMMENT '院系',
    `major` VARCHAR(100) NULL COMMENT '专业',
    `className` VARCHAR(100) NULL COMMENT '班级',
    `status` VARCHAR(20) NOT NULL DEFAULT '在校' COMMENT '学籍状态',
    `phone` VARCHAR(20) NULL COMMENT '联系电话',
    `email` VARCHAR(100) NULL COMMENT '邮箱',
    `address` TEXT NULL COMMENT '家庭住址',
    `createTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updateTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `isDelete` TINYINT NOT NULL DEFAULT 0 COMMENT '是否删除',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_studentId` (`studentId`),
    INDEX `idx_name` (`name`),
    INDEX `idx_major` (`major`),
    INDEX `idx_className` (`className`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='学生表';

-- 课程表
CREATE TABLE IF NOT EXISTS `course` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'id',
    `courseCode` VARCHAR(50) NOT NULL COMMENT '课程代码',
    `courseName` VARCHAR(200) NOT NULL COMMENT '课程名称',
    `credits` DECIMAL(3,1) NOT NULL COMMENT '学分',
    `hours` INT NOT NULL COMMENT '学时',
    `courseType` VARCHAR(50) NOT NULL COMMENT '课程类型',
    `department` VARCHAR(100) NULL COMMENT '开课院系',
    `teacher` VARCHAR(100) NULL COMMENT '授课教师',
    `semester` VARCHAR(20) NULL COMMENT '开课学期',
    `description` TEXT NULL COMMENT '课程描述',
    `createTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updateTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `isDelete` TINYINT NOT NULL DEFAULT 0 COMMENT '是否删除',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_courseCode` (`courseCode`),
    INDEX `idx_courseName` (`courseName`),
    INDEX `idx_department` (`department`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='课程表';

-- 学生成绩表
CREATE TABLE IF NOT EXISTS `student_score` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'id',
    `studentId` VARCHAR(50) NOT NULL COMMENT '学号',
    `courseCode` VARCHAR(50) NOT NULL COMMENT '课程代码',
    `score` DECIMAL(5,2) NULL COMMENT '成绩',
    `gradePoint` DECIMAL(3,2) NULL COMMENT '绩点',
    `semester` VARCHAR(20) NOT NULL COMMENT '学期',
    `examType` VARCHAR(20) NOT NULL DEFAULT '期末考试' COMMENT '考试类型',
    `status` VARCHAR(20) NOT NULL DEFAULT '正常' COMMENT '成绩状态',
    `createTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updateTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `isDelete` TINYINT NOT NULL DEFAULT 0 COMMENT '是否删除',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_student_course_semester` (`studentId`, `courseCode`, `semester`, `examType`),
    INDEX `idx_studentId` (`studentId`),
    INDEX `idx_courseCode` (`courseCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='学生成绩表';

-- 选课表
CREATE TABLE IF NOT EXISTS `course_selection` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'id',
    `studentId` VARCHAR(50) NOT NULL COMMENT '学号',
    `courseCode` VARCHAR(50) NOT NULL COMMENT '课程代码',
    `semester` VARCHAR(20) NOT NULL COMMENT '学期',
    `status` VARCHAR(20) NOT NULL DEFAULT '已选' COMMENT '选课状态',
    `createTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updateTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `isDelete` TINYINT NOT NULL DEFAULT 0 COMMENT '是否删除',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_student_course_semester` (`studentId`, `courseCode`, `semester`),
    INDEX `idx_studentId` (`studentId`),
    INDEX `idx_courseCode` (`courseCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='选课表';

-- 学生奖励表
CREATE TABLE IF NOT EXISTS `student_award` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'id',
    `studentId` VARCHAR(50) NOT NULL COMMENT '学号',
    `awardName` VARCHAR(200) NOT NULL COMMENT '奖励名称',
    `awardLevel` VARCHAR(50) NOT NULL COMMENT '奖励级别',
    `awardDate` DATE NOT NULL COMMENT '获奖日期',
    `awardReason` TEXT NULL COMMENT '获奖原因',
    `awardAmount` DECIMAL(10,2) NULL COMMENT '奖励金额',
    `createTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updateTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `isDelete` TINYINT NOT NULL DEFAULT 0 COMMENT '是否删除',
    PRIMARY KEY (`id`),
    INDEX `idx_studentId` (`studentId`),
    INDEX `idx_awardDate` (`awardDate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='学生奖励表';

-- 学生处分表
CREATE TABLE IF NOT EXISTS `student_punishment` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'id',
    `studentId` VARCHAR(50) NOT NULL COMMENT '学号',
    `punishmentType` VARCHAR(50) NOT NULL COMMENT '处分类型',
    `punishmentReason` TEXT NOT NULL COMMENT '处分原因',
    `punishmentDate` DATE NOT NULL COMMENT '处分日期',
    `status` VARCHAR(20) NOT NULL DEFAULT '有效' COMMENT '处分状态',
    `createTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updateTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `isDelete` TINYINT NOT NULL DEFAULT 0 COMMENT '是否删除',
    PRIMARY KEY (`id`),
    INDEX `idx_studentId` (`studentId`),
    INDEX `idx_punishmentDate` (`punishmentDate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='学生处分表';

-- 学籍异动表
CREATE TABLE IF NOT EXISTS `student_status_change` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'id',
    `studentId` VARCHAR(50) NOT NULL COMMENT '学号',
    `changeType` VARCHAR(50) NOT NULL COMMENT '异动类型',
    `changeReason` TEXT NOT NULL COMMENT '异动原因',
    `changeDate` DATE NOT NULL COMMENT '异动日期',
    `originalStatus` VARCHAR(50) NOT NULL COMMENT '原状态',
    `newStatus` VARCHAR(50) NOT NULL COMMENT '新状态',
    `approver` VARCHAR(100) NULL COMMENT '审批人',
    `createTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updateTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `isDelete` TINYINT NOT NULL DEFAULT 0 COMMENT '是否删除',
    PRIMARY KEY (`id`),
    INDEX `idx_studentId` (`studentId`),
    INDEX `idx_changeDate` (`changeDate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='学籍异动表';

-- 学生健康信息表
CREATE TABLE IF NOT EXISTS `student_health` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'id',
    `studentId` VARCHAR(50) NOT NULL COMMENT '学号',
    `height` DECIMAL(5,2) NULL COMMENT '身高(cm)',
    `weight` DECIMAL(5,2) NULL COMMENT '体重(kg)',
    `bloodType` VARCHAR(10) NULL COMMENT '血型',
    `allergies` TEXT NULL COMMENT '过敏史',
    `medicalHistory` TEXT NULL COMMENT '病史',
    `emergencyContact` VARCHAR(100) NULL COMMENT '紧急联系人',
    `emergencyPhone` VARCHAR(20) NULL COMMENT '紧急联系电话',
    `createTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updateTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `isDelete` TINYINT NOT NULL DEFAULT 0 COMMENT '是否删除',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_studentId` (`studentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='学生健康信息表';

-- 学生家庭信息表
CREATE TABLE IF NOT EXISTS `student_family` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'id',
    `studentId` VARCHAR(50) NOT NULL COMMENT '学号',
    `fatherName` VARCHAR(100) NULL COMMENT '父亲姓名',
    `fatherPhone` VARCHAR(20) NULL COMMENT '父亲电话',
    `fatherJob` VARCHAR(100) NULL COMMENT '父亲职业',
    `motherName` VARCHAR(100) NULL COMMENT '母亲姓名',
    `motherPhone` VARCHAR(20) NULL COMMENT '母亲电话',
    `motherJob` VARCHAR(100) NULL COMMENT '母亲职业',
    `familyAddress` TEXT NULL COMMENT '家庭地址',
    `familyIncome` VARCHAR(50) NULL COMMENT '家庭收入',
    `createTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updateTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `isDelete` TINYINT NOT NULL DEFAULT 0 COMMENT '是否删除',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_studentId` (`studentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='学生家庭信息表'; 