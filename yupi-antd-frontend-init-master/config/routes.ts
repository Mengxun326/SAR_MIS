export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login', title: '用户登录 - 学生学籍管理系统' },
      { path: '/user/register', component: './User/Register', title: '用户注册 - 学生学籍管理系统' },
    ],
  },
  { path: '/welcome', icon: 'HomeOutlined', component: './Welcome', name: '首页', title: '欢迎页 - 学生学籍管理系统' },
  
  // 个人中心路由
  {
    path: '/account',
    icon: 'ContactsOutlined',
    name: '个人中心',
    access: 'canUser',
    routes: [
      { path: '/account', redirect: '/account/center' },
      { path: '/account/center', component: './Account/Center', name: '个人信息', title: '个人信息 - 学生学籍管理系统' },
      { path: '/account/settings', component: './Account/Settings', name: '个人设置', title: '个人设置 - 学生学籍管理系统' },
    ],
  },

  // 学生信息管理 - 教师和管理员可访问
  {
    path: '/student',
    icon: 'UserOutlined',
    name: '学生管理',
    access: 'canTeacher',
    routes: [
      { path: '/student', redirect: '/student/list' },
      { path: '/student/list', component: './Student/List', name: '学生列表', title: '学生列表 - 学生学籍管理系统' },
      { path: '/student/add', component: './Student/Add', name: '添加学生', title: '添加学生 - 学生学籍管理系统', access: 'canTeacher' },
      { path: '/student/edit/:id', component: './Student/Edit', title: '编辑学生信息 - 学生学籍管理系统', access: 'canTeacher' },
      { path: '/student/detail/:id', component: './Student/Detail', title: '学生详情 - 学生学籍管理系统' },
    ],
  },

  // 成绩管理 - 教师和管理员可访问
  {
    path: '/score',
    icon: 'TrophyOutlined',
    name: '成绩管理',
    access: 'canTeacher',
    routes: [
      { path: '/score', redirect: '/score/list' },
      { path: '/score/list', component: './Score/List', name: '成绩列表', title: '成绩列表 - 学生学籍管理系统' },
      { path: '/score/add', component: './Score/Add', name: '录入成绩', title: '录入成绩 - 学生学籍管理系统', access: 'canTeacher' },
      { path: '/score/edit/:id', component: './Score/Edit', title: '编辑成绩 - 学生学籍管理系统', access: 'canTeacher' },
      { path: '/score/statistics', component: './Score/Statistics', name: '成绩统计', title: '成绩统计 - 学生学籍管理系统' },
    ],
  },

  // 课程管理 - 教师和管理员可访问
  {
    path: '/course',
    icon: 'BookOutlined',
    name: '课程管理',
    access: 'canTeacher',
    routes: [
      { path: '/course', redirect: '/course/list' },
      { path: '/course/list', component: './Course/List', name: '课程列表', title: '课程列表 - 学生学籍管理系统' },
      { path: '/course/add', component: './Course/Add', name: '添加课程', title: '添加课程 - 学生学籍管理系统', access: 'canTeacher' },
      { path: '/course/edit/:id', component: './Course/Edit', title: '编辑课程 - 学生学籍管理系统', access: 'canTeacher' },
      { path: '/course/detail/:id', component: './Course/Detail', title: '课程详情 - 学生学籍管理系统' },
    ],
  },

  // 选课管理 - 所有已登录用户可访问
  {
    path: '/course-selection',
    icon: 'SelectOutlined',
    name: '选课管理',
    access: 'canUser',
    routes: [
      { path: '/course-selection', redirect: '/course-selection/my' },
      { path: '/course-selection/my', component: './CourseSelection/My', name: '我的选课', title: '我的选课 - 学生学籍管理系统' },
      { path: '/course-selection/select', component: './CourseSelection/Select', name: '课程选择', title: '课程选择 - 学生学籍管理系统' },
      { path: '/course-selection/manage', component: './CourseSelection/Manage', name: '选课管理', title: '选课管理 - 学生学籍管理系统', access: 'canTeacher' },
    ],
  },

  // 奖惩管理 - 教师和管理员可访问
  {
    path: '/award-punishment',
    icon: 'StarOutlined',
    name: '奖惩管理',
    access: 'canTeacher',
    routes: [
      { path: '/award-punishment', redirect: '/award-punishment/award' },
      { path: '/award-punishment/award', component: './AwardPunishment/Award', name: '奖励管理', title: '奖励管理 - 学生学籍管理系统' },
      { path: '/award-punishment/punishment', component: './AwardPunishment/Punishment', name: '处分管理', title: '处分管理 - 学生学籍管理系统' },
    ],
  },

  // 学籍异动 - 所有用户可访问（但功能按权限区分）
  {
    path: '/status-change',
    icon: 'SwapOutlined',
    name: '学籍异动',
    access: 'canUser',
    routes: [
      { path: '/status-change', redirect: '/status-change/list' },
      { path: '/status-change/list', component: './StatusChange/List', name: '异动记录', title: '学籍异动记录 - 学生学籍管理系统' },
      { path: '/status-change/apply', component: './StatusChange/Apply', name: '申请异动', title: '申请学籍异动 - 学生学籍管理系统' },
      { path: '/status-change/approve', component: './StatusChange/Approve', name: '审批异动', title: '审批学籍异动 - 学生学籍管理系统', access: 'canTeacher' },
      { path: '/status-change/detail/:id', component: './StatusChange/Detail', title: '异动详情 - 学生学籍管理系统' },
    ],
  },

  // 扩展信息管理 - 所有已登录用户可访问
  {
    path: '/extended-info',
    icon: 'ProfileOutlined',
    name: '扩展信息',
    access: 'canUser',
    routes: [
      { path: '/extended-info', redirect: '/extended-info/family' },
      { path: '/extended-info/family', component: './ExtendedInfo/Family', name: '家庭信息', title: '家庭信息管理 - 学生学籍管理系统' },
      { path: '/extended-info/health', component: './ExtendedInfo/Health', name: '健康信息', title: '健康信息管理 - 学生学籍管理系统' },
    ],
  },

  // 系统管理 - 仅管理员可访问
  {
    path: '/admin',
    icon: 'SettingOutlined',
    name: '系统管理',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/user' },
      { path: '/admin/user', component: './Admin/User', name: '用户管理', title: '用户管理 - 学生学籍管理系统' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404', title: '页面未找到 - 学生学籍管理系统' },
];
