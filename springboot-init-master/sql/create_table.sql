# 数据库初始化
# @author <a href="https://github.com/liyupi">程序员鱼皮</a>
# @from <a href="https://yupi.icu">编程导航知识星球</a>

-- 创建库
create database if not exists student_management;

-- 切换库
use student_management;

-- 用户表（统一用户认证）
create table if not exists user
(
    id           bigint auto_increment comment 'id' primary key,
    userAccount  varchar(256)                           not null comment '账号',
    userPassword varchar(512)                           not null comment '密码',
    userName     varchar(256)                           not null comment '用户姓名',
    userAvatar   varchar(1024)                          null comment '用户头像',
    userRole     varchar(256) default 'student'         not null comment '用户角色：student/teacher/admin',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除'
) comment '用户' collate = utf8mb4_unicode_ci;

-- 学生基本信息表
create table if not exists student
(
    id              bigint auto_increment comment 'id' primary key,
    userId          bigint                                not null comment '关联用户id',
    studentId       varchar(20)                           not null comment '学号',
    name            varchar(50)                           not null comment '姓名',
    gender          tinyint                               not null comment '性别（0-女，1-男）',
    birthDate       date                                  not null comment '出生日期',
    idCard         varchar(18)                           not null comment '身份证号',
    nationality     varchar(50)                           not null comment '民族',
    politicalStatus varchar(50)                           null comment '政治面貌',
    enrollmentDate  date                                  not null comment '入学日期',
    major          varchar(100)                          not null comment '专业',
    class          varchar(50)                           not null comment '班级',
    status         varchar(20)  default '在读'            not null comment '学籍状态（在读/休学/退学/毕业）',
    phone          varchar(20)                           null comment '联系电话',
    email          varchar(100)                          null comment '邮箱',
    address        varchar(255)                          null comment '当前住址',
    createTime     datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime     datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete       tinyint      default 0                 not null comment '是否删除',
    unique index uniq_studentId (studentId),
    index idx_userId (userId),
    index idx_name (name)
) comment '学生基本信息' collate = utf8mb4_unicode_ci;

-- 教师信息表
create table if not exists teacher
(
    id              bigint auto_increment comment 'id' primary key,
    userId          bigint                                not null comment '关联用户id',
    teacherId       varchar(20)                           not null comment '教师工号',
    name            varchar(50)                           not null comment '姓名',
    gender          tinyint                               not null comment '性别（0-女，1-男）',
    birthDate       date                                  not null comment '出生日期',
    department      varchar(100)                          not null comment '所属院系',
    title           varchar(50)                           null comment '职称',
    phone          varchar(20)                           null comment '联系电话',
    email          varchar(100)                          null comment '邮箱',
    createTime     datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime     datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete       tinyint      default 0                 not null comment '是否删除',
    unique index uniq_teacherId (teacherId),
    index idx_userId (userId),
    index idx_name (name)
) comment '教师信息' collate = utf8mb4_unicode_ci;

-- 学生家庭信息表
create table if not exists student_family
(
    id          bigint auto_increment comment 'id' primary key,
    studentId   varchar(20)                            not null comment '学号',
    parentName  varchar(50)                            not null comment '家长姓名',
    relationship varchar(20)                           not null comment '与学生关系',
    phone       varchar(20)                            not null comment '联系电话',
    occupation  varchar(100)                           null comment '职业',
    workUnit    varchar(200)                           null comment '工作单位',
    address     varchar(255)                           null comment '家庭住址',
    createTime  datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime  datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete    tinyint      default 0                 not null comment '是否删除',
    index idx_studentId (studentId)
) comment '学生家庭信息' collate = utf8mb4_unicode_ci;

-- 学生体检信息表
create table if not exists student_health
(
    id          bigint auto_increment comment 'id' primary key,
    studentId   varchar(20)                            not null comment '学号',
    checkDate   date                                   not null comment '体检日期',
    height      decimal(5,2)                           null comment '身高(cm)',
    weight      decimal(5,2)                           null comment '体重(kg)',
    vision      varchar(50)                            null comment '视力',
    bloodType   varchar(10)                            null comment '血型',
    healthStatus varchar(500)                          null comment '健康状况描述',
    createTime  datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime  datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete    tinyint      default 0                 not null comment '是否删除',
    index idx_studentId (studentId)
) comment '学生体检信息' collate = utf8mb4_unicode_ci;

-- 课程表
create table if not exists course
(
    id          bigint auto_increment comment 'id' primary key,
    courseCode  varchar(20)                            not null comment '课程代码',
    courseName  varchar(100)                           not null comment '课程名称',
    credit      decimal(3,1)                           not null comment '学分',
    courseHour  int                                    not null comment '课时',
    courseType  varchar(50)                            not null comment '课程类型（必修/选修）',
    department  varchar(100)                           not null comment '开课院系',
    maxStudent  int                                    not null comment '最大选课人数',
    currentStudent int          default 0              not null comment '当前选课人数',
    teacherId   bigint                                not null comment '任课教师id',
    semester    varchar(20)                            not null comment '开课学期',
    courseTime  varchar(100)                           not null comment '上课时间',
    location    varchar(100)                           not null comment '上课地点',
    createTime  datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime  datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete    tinyint      default 0                 not null comment '是否删除',
    unique index uniq_courseCode (courseCode),
    index idx_teacherId (teacherId)
) comment '课程信息' collate = utf8mb4_unicode_ci;

-- 选课表
create table if not exists course_selection
(
    id          bigint auto_increment comment 'id' primary key,
    studentId   bigint                                not null comment '学生id',
    courseId    bigint                                not null comment '课程id',
    selectTime  datetime     default CURRENT_TIMESTAMP not null comment '选课时间',
    status      varchar(20)  default '已选'            not null comment '选课状态（已选/退选）',
    createTime  datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime  datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete    tinyint      default 0                 not null comment '是否删除',
    unique index uniq_student_course (studentId, courseId),
    index idx_studentId (studentId),
    index idx_courseId (courseId)
) comment '选课信息' collate = utf8mb4_unicode_ci;

-- 学生成绩表
create table if not exists student_score
(
    id          bigint auto_increment comment 'id' primary key,
    studentId   varchar(20)                            not null comment '学号',
    courseCode  varchar(20)                            not null comment '课程代码',
    semester    varchar(20)                            not null comment '学期',
    score       decimal(5,2)                           null comment '成绩',
    gradePoint  decimal(3,2)                           null comment '绩点',
    examType    varchar(20)                            not null comment '考试类型（正常/补考/重修）',
    createTime  datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime  datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete    tinyint      default 0                 not null comment '是否删除',
    index idx_studentId (studentId),
    index idx_courseCode (courseCode)
) comment '学生成绩' collate = utf8mb4_unicode_ci;

-- 奖励信息表
create table if not exists student_award
(
    id          bigint auto_increment comment 'id' primary key,
    studentId   varchar(20)                            not null comment '学号',
    awardName   varchar(100)                           not null comment '奖项名称',
    awardLevel  varchar(50)                            not null comment '奖项级别',
    awardDate   date                                   not null comment '获奖日期',
    awardAmount decimal(10,2)                          null comment '奖金金额',
    description varchar(500)                           null comment '奖项描述',
    createTime  datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime  datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete    tinyint      default 0                 not null comment '是否删除',
    index idx_studentId (studentId)
) comment '奖励信息' collate = utf8mb4_unicode_ci;

-- 处分信息表
create table if not exists student_punishment
(
    id          bigint auto_increment comment 'id' primary key,
    studentId   varchar(20)                            not null comment '学号',
    punishmentType varchar(50)                         not null comment '处分类型',
    reason      varchar(500)                           not null comment '处分原因',
    punishDate  date                                   not null comment '处分日期',
    cancelDate  date                                   null comment '解除处分日期',
    description varchar(500)                           null comment '备注',
    createTime  datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime  datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete    tinyint      default 0                 not null comment '是否删除',
    index idx_studentId (studentId)
) comment '处分信息' collate = utf8mb4_unicode_ci;

-- 贷款信息表
create table if not exists student_loan
(
    id          bigint auto_increment comment 'id' primary key,
    studentId   varchar(20)                            not null comment '学号',
    loanType    varchar(50)                            not null comment '贷款类型',
    loanAmount  decimal(10,2)                          not null comment '贷款金额',
    loanDate    date                                   not null comment '贷款日期',
    loanTerm    int                                    not null comment '贷款期限(月)',
    status      varchar(20)                            not null comment '贷款状态',
    createTime  datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime  datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete    tinyint      default 0                 not null comment '是否删除',
    index idx_studentId (studentId)
) comment '贷款信息' collate = utf8mb4_unicode_ci;

-- 学籍异动表
create table if not exists student_status_change
(
    id          bigint auto_increment comment 'id' primary key,
    studentId   varchar(20)                            not null comment '学号',
    changeType  varchar(50)                            not null comment '异动类型（休学/复学/退学等）',
    changeDate  date                                   not null comment '异动日期',
    reason      varchar(500)                           not null comment '异动原因',
    approver    varchar(50)                            not null comment '审批人',
    status      varchar(20)                            not null comment '审批状态',
    createTime  datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime  datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete    tinyint      default 0                 not null comment '是否删除',
    index idx_studentId (studentId)
) comment '学籍异动' collate = utf8mb4_unicode_ci;

-- 毕业信息表
create table if not exists student_graduation
(
    id          bigint auto_increment comment 'id' primary key,
    studentId   varchar(20)                            not null comment '学号',
    graduationDate date                                not null comment '毕业日期',
    diplomaNo   varchar(50)                            null comment '毕业证书编号',
    degreeName  varchar(50)                            null comment '学位名称',
    degreeNo    varchar(50)                            null comment '学位证书编号',
    status      varchar(20)                            not null comment '毕业状态',
    createTime  datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime  datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete    tinyint      default 0                 not null comment '是否删除',
    unique index uniq_studentId (studentId)
) comment '毕业信息' collate = utf8mb4_unicode_ci;
