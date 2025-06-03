# 教师数据初始化
# 插入10条教师样例数据

-- 切换到数据库
use student_management;

-- 插入教师用户数据
INSERT INTO user (id, userAccount, userPassword, userName, userAvatar, userRole) VALUES 
-- 计算机学院教师
(2001, 'T001', '$2a$10$6t8Vc4DqK8yY1q2z3D4e5u6w7r8t9y0a1s2d3f4g5h6j7k8l9m0n', '张伟明', 'https://avatars.dicebear.com/api/avataaars/teacher001.svg', 'teacher'),
(2002, 'T002', '$2a$10$6t8Vc4DqK8yY1q2z3D4e5u6w7r8t9y0a1s2d3f4g5h6j7k8l9m0n', '李晓华', 'https://avatars.dicebear.com/api/avataaars/teacher002.svg', 'teacher'),
(2003, 'T003', '$2a$10$6t8Vc4DqK8yY1q2z3D4e5u6w7r8t9y0a1s2d3f4g5h6j7k8l9m0n', '王建国', 'https://avatars.dicebear.com/api/avataaars/teacher003.svg', 'teacher'),
(2004, 'T004', '$2a$10$6t8Vc4DqK8yY1q2z3D4e5u6w7r8t9y0a1s2d3f4g5h6j7k8l9m0n', '陈美玲', 'https://avatars.dicebear.com/api/avataaars/teacher004.svg', 'teacher'),
(2005, 'T005', '$2a$10$6t8Vc4DqK8yY1q2z3D4e5u6w7r8t9y0a1s2d3f4g5h6j7k8l9m0n', '刘志强', 'https://avatars.dicebear.com/api/avataaars/teacher005.svg', 'teacher'),
(2006, 'T006', '$2a$10$6t8Vc4DqK8yY1q2z3D4e5u6w7r8t9y0a1s2d3f4g5h6j7k8l9m0n', '杨文静', 'https://avatars.dicebear.com/api/avataaars/teacher006.svg', 'teacher'),
(2007, 'T007', '$2a$10$6t8Vc4DqK8yY1q2z3D4e5u6w7r8t9y0a1s2d3f4g5h6j7k8l9m0n', '赵明辉', 'https://avatars.dicebear.com/api/avataaars/teacher007.svg', 'teacher'),
(2008, 'T008', '$2a$10$6t8Vc4DqK8yY1q2z3D4e5u6w7r8t9y0a1s2d3f4g5h6j7k8l9m0n', '孙丽娟', 'https://avatars.dicebear.com/api/avataaars/teacher008.svg', 'teacher'),
(2009, 'T009', '$2a$10$6t8Vc4DqK8yY1q2z3D4e5u6w7r8t9y0a1s2d3f4g5h6j7k8l9m0n', '周天翔', 'https://avatars.dicebear.com/api/avataaars/teacher009.svg', 'teacher'),
(2010, 'T010', '$2a$10$6t8Vc4DqK8yY1q2z3D4e5u6w7r8t9y0a1s2d3f4g5h6j7k8l9m0n', '吴雅婷', 'https://avatars.dicebear.com/api/avataaars/teacher010.svg', 'teacher');

-- 插入教师信息数据
INSERT INTO teacher (userId, teacherId, name, gender, birthDate, department, title, phone, email) VALUES 
-- 计算机学院教师
(2001, 'T001', '张伟明', 1, '1975-03-15', '计算机学院', '教授', '13800001001', 'zhangweiming@university.edu.cn'),
(2002, 'T002', '李晓华', 0, '1980-07-22', '计算机学院', '副教授', '13800001002', 'lixiaohua@university.edu.cn'),
(2003, 'T003', '王建国', 1, '1978-11-08', '计算机学院', '副教授', '13800001003', 'wangjianguo@university.edu.cn'),
(2004, 'T004', '陈美玲', 0, '1983-05-12', '计算机学院', '讲师', '13800001004', 'chenmeiling@university.edu.cn'),
(2005, 'T005', '刘志强', 1, '1985-09-30', '计算机学院', '讲师', '13800001005', 'liuzhiqiang@university.edu.cn'),
(2006, 'T006', '杨文静', 0, '1987-02-18', '计算机学院', '讲师', '13800001006', 'yangwenjing@university.edu.cn'),
(2007, 'T007', '赵明辉', 1, '1982-12-05', '计算机学院', '副教授', '13800001007', 'zhaominghui@university.edu.cn'),
(2008, 'T008', '孙丽娟', 0, '1979-06-25', '计算机学院', '教授', '13800001008', 'sunlijuan@university.edu.cn'),
(2009, 'T009', '周天翔', 1, '1986-10-14', '计算机学院', '讲师', '13800001009', 'zhoutianxiang@university.edu.cn'),
(2010, 'T010', '吴雅婷', 0, '1984-04-03', '计算机学院', '副教授', '13800001010', 'wuyating@university.edu.cn');

-- 验证数据插入
SELECT 
    t.teacherId, 
    t.name, 
    t.department, 
    t.title, 
    u.userAccount
FROM teacher t 
INNER JOIN user u ON t.userId = u.id 
ORDER BY t.department, t.teacherId;

-- 统计各院系教师数量
SELECT 
    department, 
    COUNT(*) as teacher_count,
    SUM(CASE WHEN title = '教授' THEN 1 ELSE 0 END) as professor_count,
    SUM(CASE WHEN title = '副教授' THEN 1 ELSE 0 END) as associate_professor_count,
    SUM(CASE WHEN title = '讲师' THEN 1 ELSE 0 END) as lecturer_count
FROM teacher 
GROUP BY department 
ORDER BY department; 