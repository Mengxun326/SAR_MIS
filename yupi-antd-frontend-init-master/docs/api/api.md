# SAR_MIS 学生信息管理系统接口文档

## 1. 用户认证接口

### 1.1 用户注册
- 请求路径：`/user/register`
- 请求方法：POST
- 请求参数：
```json
{
    "userAccount": "student001",
    "userPassword": "12345678",
    "checkPassword": "12345678"
}
```
- 响应示例：
```json
{
    "code": 0,
    "data": 1001,
    "message": "ok"
}
```

### 1.2 用户登录
- 请求路径：`/user/login`
- 请求方法：POST
- 请求参数：
```json
{
    "userAccount": "admin",
    "userPassword": "12345678"
}
```
- 响应示例：
```json
{
    "code": 0,
    "data": {
        "id": 1,
        "userAccount": "admin",
        "userName": "管理员",
        "userRole": "admin"
    },
    "message": "ok"
}
```

### 1.3 获取当前登录用户
- 请求路径：`/user/get/login`
- 请求方法：GET
- 请求参数：无
- 响应示例：
```json
{
    "code": 0,
    "data": {
        "id": 1,
        "userAccount": "admin",
        "userName": "管理员",
        "userRole": "admin"
    },
    "message": "ok"
}
```

### 1.4 用户注销
- 请求路径：`/user/logout`
- 请求方法：POST
- 请求参数：无
- 响应示例：
```json
{
    "code": 0,
    "data": true,
    "message": "ok"
}
```

## 2. 学生基本信息管理

### 2.1 添加学生信息
- 请求路径：`/student/add`
- 请求方法：POST
- 权限要求：所有已登录用户
- 请求参数：
```json
{
    "studentId": "2021001",
    "name": "张三",
    "gender": 1,
    "birthDate": "2003-01-01",
    "idCard": "110101200301011234",
    "nationality": "汉族",
    "politicalStatus": "团员",
    "enrollmentDate": "2021-09-01",
    "department": "计算机学院",
    "major": "计算机科学与技术",
    "className": "计科2101",
    "status": "在读",
    "phone": "13800138000",
    "email": "zhangsan@example.com",
    "address": "北京市海淀区"
}
```

### 2.2 更新学生信息
- 请求路径：`/student/update`
- 请求方法：POST
- 权限要求：admin
- 请求参数：
```json
{
    "id": 1,
    "studentId": "2021001",
    "name": "张三",
    "gender": 1,
    "birthDate": "2003-01-01",
    "idCard": "110101200301011234",
    "nationality": "汉族",
    "politicalStatus": "团员",
    "enrollmentDate": "2021-09-01",
    "department": "计算机学院",
    "major": "计算机科学与技术",
    "className": "计科2101",
    "status": "在读",
    "phone": "13800138000",
    "email": "zhangsan@example.com",
    "address": "北京市海淀区"
}
```

### 2.3 删除学生信息
- 请求路径：`/student/delete`
- 请求方法：POST
- 权限要求：admin或本人
- 请求参数：
```json
{
    "id": 1
}
```

### 2.4 根据ID获取学生信息
- 请求路径：`/student/get`
- 请求方法：GET
- 请求参数：`id=1`
- 响应示例：
```json
{
    "code": 0,
    "data": {
        "id": 1,
        "studentId": "2021001",
        "name": "张三",
        "gender": 1,
        "birthDate": "2003-01-01",
        "major": "计算机科学与技术",
        "className": "计科2101",
        "status": "在读"
    },
    "message": "ok"
}
```

### 2.5 分页查询学生列表
- 请求路径：`/student/list/page`
- 请求方法：POST
- 请求参数：
```json
{
    "current": 1,
    "pageSize": 10,
    "studentId": "2021001",
    "name": "张",
    "major": "计算机",
    "className": "计科2101",
    "status": "在读",
    "sortField": "enrollmentDate",
    "sortOrder": "desc"
}
```

## 3. 学生成绩管理

### 3.1 添加成绩
- 请求路径：`/student/score/add`
- 请求方法：POST
- 权限要求：teacher
- 请求参数：
```json
{
    "studentId": "2021001",
    "courseCode": "CS101",
    "semester": "2023-2024-1",
    "score": 85.5,
    "examType": "正常"
}
```

### 3.2 更新成绩
- 请求路径：`/student/score/update`
- 请求方法：POST
- 权限要求：teacher
- 请求参数：
```json
{
    "id": 1,
    "studentId": "2021001",
    "courseCode": "CS101",
    "semester": "2023-2024-1",
    "score": 90.0,
    "examType": "正常"
}
```

### 3.3 删除成绩
- 请求路径：`/student/score/delete`
- 请求方法：POST
- 权限要求：teacher
- 请求参数：
```json
{
    "id": 1
}
```

### 3.4 根据ID获取成绩
- 请求路径：`/student/score/get`
- 请求方法：GET
- 请求参数：`id=1`

### 3.5 分页查询成绩
- 请求路径：`/student/score/list/page`
- 请求方法：POST
- 权限要求：admin
- 请求参数：
```json
{
    "current": 1,
    "pageSize": 10,
    "studentId": "2021001",
    "courseCode": "CS101",
    "semester": "2023-2024-1",
    "examType": "正常",
    "sortField": "score",
    "sortOrder": "desc"
}
```

### 3.6 计算学生GPA
- 请求路径：`/student/score/gpa`
- 请求方法：GET
- 请求参数：`studentId=2021001&semester=2023-2024-1`
- 响应示例：
```json
{
    "code": 0,
    "data": 3.75,
    "message": "ok"
}
```

### 3.7 获取课程成绩分布
- 请求路径：`/student/score/distribution`
- 请求方法：GET
- 请求参数：`courseCode=CS101&semester=2023-2024-1`
- 响应示例：
```json
{
    "code": 0,
    "data": {
        "优秀": 10,
        "良好": 15,
        "中等": 8,
        "及格": 5,
        "不及格": 2
    },
    "message": "ok"
}
```

### 3.8 获取学生成绩趋势
- 请求路径：`/student/score/trend`
- 请求方法：GET
- 请求参数：`studentId=2021001`
- 响应示例：
```json
{
    "code": 0,
    "data": {
        "2023-2024-1": 3.5,
        "2023-2024-2": 3.8,
        "2024-2025-1": 3.9
    },
    "message": "ok"
}
```

### 3.9 获取班级成绩排名
- 请求路径：`/student/score/ranking`
- 请求方法：GET
- 请求参数：`courseCode=CS101&semester=2023-2024-1`
- 响应示例：
```json
{
    "code": 0,
    "data": [
        {
            "studentId": "2021001",
            "name": "张三",
            "score": 95.0,
            "rank": 1
        }
    ],
    "message": "ok"
}
```

## 4. 课程管理

### 4.1 添加课程
- 请求路径：`/course/add`
- 请求方法：POST
- 权限要求：teacher
- 请求参数：
```json
{
    "courseCode": "CS101",
    "courseName": "计算机导论",
    "credit": 3.0,
    "courseHour": 48,
    "courseType": "必修",
    "department": "计算机系",
    "maxStudent": 100,
    "teacherId": 1,
    "semester": "2023-2024-2",
    "courseTime": "周一 1-2节",
    "location": "教学楼A-101"
}
```

### 4.2 更新课程
- 请求路径：`/course/update`
- 请求方法：POST
- 权限要求：teacher（自己的课程）或admin
- 请求参数：
```json
{
    "id": 1,
    "courseCode": "CS101",
    "courseName": "计算机导论",
    "credit": 3.0,
    "courseHour": 48,
    "courseType": "必修",
    "department": "计算机系",
    "maxStudent": 100,
    "teacherId": 1,
    "semester": "2023-2024-2",
    "courseTime": "周一 1-2节",
    "location": "教学楼A-101"
}
```

### 4.3 删除课程
- 请求路径：`/course/delete`
- 请求方法：POST
- 权限要求：teacher（自己的课程）
- 请求参数：
```json
{
    "id": 1
}
```

### 4.4 获取课程详情
- 请求路径：`/course/get`
- 请求方法：GET
- 权限要求：所有已登录用户
- 请求参数：`id=1`

### 4.5 分页查询课程列表
- 请求路径：`/course/list/page`
- 请求方法：POST
- 权限要求：admin
- 请求参数：
```json
{
    "current": 1,
    "pageSize": 10,
    "courseCode": "CS",
    "courseName": "计算机",
    "department": "计算机系",
    "courseType": "必修",
    "teacherId": 1,
    "semester": "2023-2024-2",
    "sortField": "courseCode",
    "sortOrder": "asc"
}
```

### 4.6 查询教师课程列表
- 请求路径：`/course/teacher/list`
- 请求方法：GET
- 权限要求：所有已登录用户
- 请求参数：`teacherId=1&semester=2023-2024-2`

### 4.7 查询院系课程统计
- 请求路径：`/course/stats/department`
- 请求方法：GET
- 权限要求：所有已登录用户
- 请求参数：`semester=2023-2024-2`
- 响应示例：
```json
{
    "code": 0,
    "data": {
        "计算机系": 30,
        "数学系": 25,
        "物理系": 20
    },
    "message": "ok"
}
```

### 4.8 查询课程类型统计
- 请求路径：`/course/stats/type`
- 请求方法：GET
- 权限要求：所有已登录用户
- 请求参数：`semester=2023-2024-2`
- 响应示例：
```json
{
    "code": 0,
    "data": {
        "必修": 60,
        "选修": 40
    },
    "message": "ok"
}
```

### 4.9 检查课程是否可以选课
- 请求路径：`/course/check`
- 请求方法：GET
- 权限要求：所有已登录用户
- 请求参数：`id=1`
- 响应示例：
```json
{
    "code": 0,
    "data": true,
    "message": "ok"
}
```

## 5. 选课管理

### 5.1 学生选课
- 请求路径：`/course-selection/select`
- 请求方法：POST
- 权限要求：所有已登录用户
- 请求参数：
```json
{
    "courseId": 1
}
```

### 5.2 退课
- 请求路径：`/course-selection/drop/{courseId}`
- 请求方法：POST
- 权限要求：所有已登录用户
- 请求参数：路径参数courseId

### 5.3 分页查询选课记录
- 请求路径：`/course-selection/list/page`
- 请求方法：POST
- 权限要求：admin
- 请求参数：
```json
{
    "current": 1,
    "pageSize": 10,
    "studentId": "2021001",
    "courseId": 1,
    "semester": "2023-2024-2",
    "sortField": "selectTime",
    "sortOrder": "desc"
}
```

### 5.4 获取学生选课列表
- 请求路径：`/course-selection/student/list`
- 请求方法：GET
- 权限要求：所有已登录用户
- 响应示例：
```json
{
    "code": 0,
    "data": [
        {
            "id": 1,
            "courseId": 1,
            "courseName": "计算机导论",
            "courseCode": "CS101",
            "credit": 3.0,
            "teacherName": "李老师",
            "selectTime": "2024-02-01 10:00:00"
        }
    ],
    "message": "ok"
}
```

### 5.5 获取课程选课学生列表
- 请求路径：`/course-selection/course/{courseId}/students`
- 请求方法：GET
- 权限要求：teacher
- 请求参数：路径参数courseId

### 5.6 检查学生是否已选某课程
- 请求路径：`/course-selection/check/{courseId}`
- 请求方法：GET
- 权限要求：所有已登录用户
- 请求参数：路径参数courseId

### 5.7 获取选课统计信息
- 请求路径：`/course-selection/stats/{courseId}`
- 请求方法：GET
- 权限要求：teacher
- 请求参数：路径参数courseId

## 6. 学籍异动管理

### 6.1 添加学籍异动申请
- 请求路径：`/student-status-change/add`
- 请求方法：POST
- 权限要求：所有已登录用户
- 请求参数：
```json
{
    "studentId": "2021001",
    "changeType": "休学",
    "reason": "因病需要休养",
    "applyDate": "2024-03-20",
    "effectiveDate": "2024-04-01",
    "endDate": "2024-09-01",
    "originalMajor": "电子工程",
    "newMajor": "计算机科学",
    "originalSchool": "北京大学",
    "newSchool": "清华大学"
}
```

### 6.2 更新学籍异动申请
- 请求路径：`/student-status-change/update`
- 请求方法：POST
- 权限要求：所有已登录用户
- 请求参数：
```json
{
    "id": 1,
    "studentId": "2021001",
    "changeType": "休学",
    "reason": "因病需要休养",
    "applyDate": "2024-03-20",
    "effectiveDate": "2024-04-01",
    "endDate": "2024-09-01"
}
```

### 6.3 删除学籍异动申请
- 请求路径：`/student-status-change/delete`
- 请求方法：POST
- 权限要求：admin
- 请求参数：
```json
{
    "id": 1
}
```

### 6.4 根据ID获取学籍异动记录
- 请求路径：`/student-status-change/get`
- 请求方法：GET
- 权限要求：所有已登录用户
- 请求参数：`id=1`

### 6.5 审批学籍异动申请
- 请求路径：`/student-status-change/approve/{id}`
- 请求方法：POST
- 权限要求：admin
- 请求参数：`approvalStatus=1&approvalComment=同意申请`

### 6.6 查询学籍异动记录
- 请求路径：`/student-status-change/list/page`
- 请求方法：POST
- 权限要求：admin
- 请求参数：
```json
{
    "current": 1,
    "pageSize": 10,
    "studentId": "2021001",
    "changeType": "休学",
    "approvalStatus": 0,
    "startDate": "2024-01-01",
    "endDate": "2024-12-31",
    "sortField": "applyDate",
    "sortOrder": "desc"
}
```

## 7. 奖励管理

### 7.1 添加奖励记录
- 请求路径：`/student/award/add`
- 请求方法：POST
- 权限要求：所有已登录用户
- 请求参数：
```json
{
    "studentId": "2021001",
    "awardName": "一等奖学金",
    "awardLevel": "校级",
    "awardDate": "2024-03-20",
    "awardAmount": 5000,
    "description": "学年综合成绩第一"
}
```

### 7.2 更新奖励记录
- 请求路径：`/student/award/update`
- 请求方法：POST
- 权限要求：所有已登录用户
- 请求参数：
```json
{
    "id": 1,
    "studentId": "2021001",
    "awardName": "一等奖学金",
    "awardLevel": "校级",
    "awardDate": "2024-03-20",
    "awardAmount": 5000,
    "description": "学年综合成绩第一"
}
```

### 7.3 删除奖励记录
- 请求路径：`/student/award/delete`
- 请求方法：POST
- 权限要求：所有已登录用户
- 请求参数：
```json
{
    "id": 1
}
```

### 7.4 根据ID获取奖励记录
- 请求路径：`/student/award/get`
- 请求方法：GET
- 权限要求：所有已登录用户
- 请求参数：`id=1`

### 7.5 查询奖励记录
- 请求路径：`/student/award/list/page`
- 请求方法：POST
- 权限要求：所有已登录用户
- 请求参数：
```json
{
    "current": 1,
    "pageSize": 10,
    "studentId": "2021001",
    "awardLevel": "校级",
    "startDate": "2024-01-01",
    "endDate": "2024-12-31",
    "sortField": "awardDate",
    "sortOrder": "desc"
}
```

## 8. 处分管理

### 8.1 添加处分记录
- 请求路径：`/student-punishment/add`
- 请求方法：POST
- 权限要求：admin
- 请求参数：
```json
{
    "studentId": "2021001",
    "punishmentType": "警告",
    "reason": "考试作弊",
    "punishmentDate": "2024-03-20",
    "duration": 6,
    "description": "期末考试作弊"
}
```

### 8.2 更新处分记录
- 请求路径：`/student-punishment/update`
- 请求方法：POST
- 权限要求：admin
- 请求参数：
```json
{
    "id": 1,
    "studentId": "2021001",
    "punishmentType": "警告",
    "reason": "考试作弊",
    "punishmentDate": "2024-03-20",
    "duration": 6,
    "description": "期末考试作弊"
}
```

### 8.3 删除处分记录
- 请求路径：`/student-punishment/delete`
- 请求方法：POST
- 权限要求：admin
- 请求参数：
```json
{
    "id": 1
}
```

### 8.4 根据ID获取处分记录
- 请求路径：`/student-punishment/get`
- 请求方法：GET
- 权限要求：所有已登录用户
- 请求参数：`id=1`

### 8.5 处分解除
- 请求路径：`/student-punishment/revoke/{id}`
- 请求方法：POST
- 权限要求：admin
- 请求参数：路径参数id

### 8.6 查询处分记录
- 请求路径：`/student-punishment/list/page`
- 请求方法：POST
- 权限要求：admin
- 请求参数：
```json
{
    "current": 1,
    "pageSize": 10,
    "studentId": "2021001",
    "punishmentType": "警告",
    "isRevoked": 0,
    "startDate": "2024-01-01",
    "endDate": "2024-12-31",
    "sortField": "punishmentDate",
    "sortOrder": "desc"
}
```

## 9. 学生家庭信息管理

### 9.1 添加家庭信息
- 请求路径：`/student/family/add`
- 请求方法：POST
- 权限要求：所有已登录用户
- 请求参数：
```json
{
    "studentId": "2021001",
    "parentName": "张父",
    "relationship": "父亲",
    "phone": "13800138001",
    "occupation": "工程师",
    "workUnit": "北京科技公司",
    "address": "北京市朝阳区"
}
```

### 9.2 更新家庭信息
- 请求路径：`/student/family/update`
- 请求方法：POST
- 权限要求：所有已登录用户
- 请求参数：
```json
{
    "id": 1,
    "studentId": "2021001",
    "parentName": "张父",
    "relationship": "父亲",
    "phone": "13800138001",
    "occupation": "工程师",
    "workUnit": "北京科技公司",
    "address": "北京市朝阳区"
}
```

### 9.3 删除家庭信息
- 请求路径：`/student/family/delete`
- 请求方法：POST
- 权限要求：所有已登录用户
- 请求参数：
```json
{
    "id": 1
}
```

### 9.4 根据ID获取家庭信息
- 请求路径：`/student/family/get`
- 请求方法：GET
- 权限要求：所有已登录用户
- 请求参数：`id=1`

### 9.5 分页查询家庭信息
- 请求路径：`/student/family/list/page`
- 请求方法：POST
- 权限要求：所有已登录用户
- 请求参数：
```json
{
    "current": 1,
    "pageSize": 10,
    "studentId": "2021001",
    "parentName": "张",
    "relationship": "父亲",
    "sortField": "createTime",
    "sortOrder": "desc"
}
```

## 10. 学生健康信息管理

### 10.1 添加健康信息
- 请求路径：`/student/health/add`
- 请求方法：POST
- 权限要求：所有已登录用户
- 请求参数：
```json
{
    "studentId": "2021001",
    "height": 175.5,
    "weight": 65.0,
    "vision": "5.0",
    "bloodType": "A",
    "checkDate": "2024-09-01",
    "healthStatus": "健康"
}
```

### 10.2 更新健康信息
- 请求路径：`/student/health/update`
- 请求方法：POST
- 权限要求：所有已登录用户
- 请求参数：
```json
{
    "id": 1,
    "studentId": "2021001",
    "height": 175.5,
    "weight": 65.0,
    "vision": "5.0",
    "bloodType": "A",
    "checkDate": "2024-09-01",
    "healthStatus": "健康"
}
```

### 10.3 删除健康信息
- 请求路径：`/student/health/delete`
- 请求方法：POST
- 权限要求：所有已登录用户
- 请求参数：
```json
{
    "id": 1
}
```

### 10.4 根据ID获取健康信息
- 请求路径：`/student/health/get`
- 请求方法：GET
- 权限要求：所有已登录用户
- 请求参数：`id=1`

### 10.5 分页查询健康信息
- 请求路径：`/student/health/list/page`
- 请求方法：POST
- 权限要求：所有已登录用户
- 请求参数：
```json
{
    "current": 1,
    "pageSize": 10,
    "studentId": "2021001",
    "bloodType": "A",
    "startDate": "2024-01-01",
    "endDate": "2024-12-31",
    "sortField": "checkDate",
    "sortOrder": "desc"
}
```

## 通用说明

1. 响应格式：
```json
{
    "code": 0,
    "data": {},
    "message": "ok"
}
```

2. 分页参数说明：
- current：当前页码，从1开始
- pageSize：每页记录数，最大50
- sortField：排序字段
- sortOrder：排序方式，"asc"或"desc"

3. 权限说明：
- admin：管理员权限
- teacher：教师权限
- student：学生权限（默认角色）
- 未标注权限要求的接口表示所有已登录用户都可访问

4. 日期格式：
- 日期：yyyy-MM-dd
- 时间：yyyy-MM-dd HH:mm:ss

5. 性别字段说明：
- 0：女
- 1：男

6. 学籍状态说明：
- 在读：正常在校学习
- 休学：暂时离校
- 退学：退出学校
- 毕业：完成学业

7. 考试类型说明：
- 正常：正常考试
- 补考：补考
- 重修：重修考试

8. 课程类型说明：
- 必修：必修课程
- 选修：选修课程

9. 错误码说明：
- 0：成功
- 40000：请求参数错误
- 40100：未登录
- 40101：无权限
- 40400：请求数据不存在
- 50000：系统内部异常

10. 处分类型说明：
- 警告
- 严重警告
- 记过
- 记大过
- 开除

11. 学籍异动类型说明：
- 休学
- 复学
- 退学
- 转专业
- 转学

12. 审批状态说明：
- 0：待审批
- 1：已通过
- 2：已驳回 