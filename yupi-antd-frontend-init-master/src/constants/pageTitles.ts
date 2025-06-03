/**
 * 页面标题配置
 */
export const PAGE_TITLES = {
  // 系统基础
  SYSTEM_NAME: '学生学籍管理信息系统',
  WELCOME: '欢迎页',
  
  // 用户相关
  LOGIN: '用户登录',
  REGISTER: '用户注册',
  
  // 学生管理
  STUDENT_LIST: '学生列表',
  STUDENT_ADD: '添加学生',
  STUDENT_EDIT: '编辑学生信息',
  STUDENT_DETAIL: '学生详情',
  
  // 成绩管理
  SCORE_LIST: '成绩列表',
  SCORE_ADD: '录入成绩',
  SCORE_EDIT: '编辑成绩',
  SCORE_STATISTICS: '成绩统计',
  
  // 课程管理
  COURSE_LIST: '课程列表',
  COURSE_ADD: '添加课程',
  COURSE_EDIT: '编辑课程',
  COURSE_DETAIL: '课程详情',
  
  // 选课管理
  COURSE_SELECTION_MY: '我的选课',
  COURSE_SELECTION_SELECT: '课程选择',
  COURSE_SELECTION_MANAGE: '选课管理',
  
  // 奖惩管理
  AWARD_MANAGE: '奖励管理',
  PUNISHMENT_MANAGE: '处分管理',
  
  // 学籍异动
  STATUS_CHANGE_LIST: '学籍异动记录',
  STATUS_CHANGE_APPLY: '申请学籍异动',
  STATUS_CHANGE_APPROVE: '审批学籍异动',
  
  // 扩展信息
  FAMILY_INFO: '家庭信息管理',
  HEALTH_INFO: '健康信息管理',
  
  // 系统管理
  USER_MANAGE: '用户管理',
  
  // 错误页面
  NOT_FOUND: '页面未找到',
};

/**
 * 生成完整的页面标题
 * @param pageTitle 页面标题
 * @param systemName 系统名称
 */
export const generatePageTitle = (pageTitle: string, systemName: string = PAGE_TITLES.SYSTEM_NAME): string => {
  return `${pageTitle} - ${systemName}`;
};

export default PAGE_TITLES; 