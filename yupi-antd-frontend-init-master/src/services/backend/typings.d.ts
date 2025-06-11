declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponsePagePost_ = {
    code?: number;
    data?: PagePost_;
    message?: string;
  };

  type BaseResponsePagePostVO_ = {
    code?: number;
    data?: PagePostVO_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponsePostVO_ = {
    code?: number;
    data?: PostVO;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  // 学生相关类型定义
  type BaseResponseStudent_ = {
    code?: number;
    data?: Student;
    message?: string;
  };

  type BaseResponsePageStudent_ = {
    code?: number;
    data?: PageStudent_;
    message?: string;
  };

  type Student = {
    id?: string;
    studentId?: string;
    name?: string;
    gender?: number;
    birthDate?: string;
    idCard?: string;
    nationality?: string;
    politicalStatus?: string;
    enrollmentDate?: string;
    department?: string;
    major?: string;
    className?: string;
    status?: string;
    phone?: string;
    email?: string;
    address?: string;
    createTime?: string;
    updateTime?: string;
  };

  type PageStudent_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: Student[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type StudentAddRequest = {
    studentId?: string;
    name?: string;
    gender?: number;
    birthDate?: string;
    idCard?: string;
    nationality?: string;
    politicalStatus?: string;
    enrollmentDate?: string;
    department?: string;
    major?: string;
    className?: string;
    status?: string;
    phone?: string;
    email?: string;
    address?: string;
  };

  type StudentUpdateRequest = {
    id?: string;
    studentId?: string;
    name?: string;
    gender?: number;
    birthDate?: string;
    idCard?: string;
    nationality?: string;
    politicalStatus?: string;
    enrollmentDate?: string;
    department?: string;
    major?: string;
    className?: string;
    status?: string;
    phone?: string;
    email?: string;
    address?: string;
  };

  type StudentQueryRequest = {
    current?: number;
    pageSize?: number;
    studentId?: string;
    name?: string;
    major?: string;
    className?: string;
    status?: string;
    sortField?: string;
    sortOrder?: string;
  };

  type getStudentByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type checkUsingGETParams = {
    /** echostr */
    echostr?: string;
    /** nonce */
    nonce?: string;
    /** signature */
    signature?: string;
    /** timestamp */
    timestamp?: string;
  };

  type DeleteRequest = {
    id?: string;
  };

  type getPostVOByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type LoginUserVO = {
    createTime?: string;
    id?: string;
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PagePost_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: Post[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PagePostVO_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: PostVO[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageUser_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: User[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: UserVO[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type Post = {
    content?: string;
    createTime?: string;
    favourNum?: number;
    id?: string;
    isDelete?: number;
    tags?: string;
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    userId?: string;
  };

  type PostAddRequest = {
    content?: string;
    tags?: string[];
    title?: string;
  };

  type PostEditRequest = {
    content?: string;
    id?: string;
    tags?: string[];
    title?: string;
  };

  type PostFavourAddRequest = {
    postId?: string;
  };

  type PostFavourQueryRequest = {
    current?: number;
    pageSize?: number;
    postQueryRequest?: PostQueryRequest;
    sortField?: string;
    sortOrder?: string;
    userId?: string;
  };

  type PostQueryRequest = {
    content?: string;
    current?: number;
    favourUserId?: string;
    id?: string;
    notId?: string;
    orTags?: string[];
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    title?: string;
    userId?: string;
  };

  type PostThumbAddRequest = {
    postId?: string;
  };

  type PostUpdateRequest = {
    content?: string;
    id?: string;
    tags?: string[];
    title?: string;
  };

  type PostVO = {
    content?: string;
    createTime?: string;
    favourNum?: number;
    hasFavour?: boolean;
    hasThumb?: boolean;
    id?: string;
    tagList?: string[];
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: string;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type User = {
    createTime?: string;
    id?: string;
    isDelete?: number;
    mpOpenId?: string;
    unionId?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type userLoginByWxOpenUsingGETParams = {
    /** code */
    code: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: string;
    mpOpenId?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    unionId?: string;
    userName?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
    userName?: string;
    userRole?: string;
  };

  type UserUpdateMyRequest = {
    userAvatar?: string;
    userName?: string;
  };

  type UserUpdateRequest = {
    id?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  // 成绩相关类型定义
  type BaseResponseStudentScore_ = {
    code?: number;
    data?: StudentScore;
    message?: string;
  };

  type BaseResponsePageStudentScore_ = {
    code?: number;
    data?: PageStudentScore_;
    message?: string;
  };

  type BaseResponseNumber_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseObject_ = {
    code?: number;
    data?: any;
    message?: string;
  };

  type StudentScore = {
    id?: string;
    studentId?: string;
    courseCode?: string;
    score?: number;
    gradePoint?: number;
    semester?: string;
    examType?: string;
    status?: string;
    createTime?: string;
    updateTime?: string;
  };

  type PageStudentScore_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: StudentScore[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type StudentScoreAddRequest = {
    studentId?: string;
    courseCode?: string;
    semester?: string;
    score?: number;
    examType?: string;
  };

  type StudentScoreUpdateRequest = {
    id?: string;
    studentId?: string;
    courseCode?: string;
    semester?: string;
    score?: number;
    examType?: string;
  };

  type StudentScoreQueryRequest = {
    current?: number;
    pageSize?: number;
    studentId?: string;
    courseCode?: string;
    semester?: string;
    examType?: string;
    sortField?: string;
    sortOrder?: string;
  };

  // 课程相关类型定义
  type BaseResponseCourse_ = {
    code?: number;
    data?: Course;
    message?: string;
  };

  type BaseResponsePageCourse_ = {
    code?: number;
    data?: PageCourse_;
    message?: string;
  };

  type Course = {
    id?: string;
    courseCode?: string;
    courseName?: string;
    credit?: number;
    courseHour?: number;
    courseType?: string;
    department?: string;
    maxStudent?: number;
    teacherId?: string;
    semester?: string;
    courseTime?: string;
    location?: string;
    createTime?: string;
    updateTime?: string;
  };

  type PageCourse_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: Course[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type CourseAddRequest = {
    courseCode?: string;
    courseName?: string;
    credit?: number;
    courseHour?: number;
    courseType?: string;
    department?: string;
    maxStudent?: number;
    teacherId?: string;
    semester?: string;
    courseTime?: string;
    location?: string;
  };

  type CourseUpdateRequest = {
    id?: string;
    courseCode?: string;
    courseName?: string;
    credit?: number;
    courseHour?: number;
    courseType?: string;
    department?: string;
    maxStudent?: number;
    teacherId?: string;
    semester?: string;
    courseTime?: string;
    location?: string;
  };

  type CourseQueryRequest = {
    current?: number;
    pageSize?: number;
    courseCode?: string;
    courseName?: string;
    department?: string;
    courseType?: string;
    teacherId?: string;
    semester?: string;
    sortField?: string;
    sortOrder?: string;
  };

  // 选课相关类型定义
  type BaseResponseCourseSelection_ = {
    code?: number;
    data?: CourseSelection;
    message?: string;
  };

  type BaseResponsePageCourseSelection_ = {
    code?: number;
    data?: PageCourseSelection_;
    message?: string;
  };

  type CourseSelection = {
    id?: string;
    studentId?: string;
    courseId?: string;
    courseName?: string;
    courseCode?: string;
    credit?: number;
    teacherName?: string;
    selectTime?: string;
    status?: string;
    createTime?: string;
    updateTime?: string;
  };

  type PageCourseSelection_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: CourseSelection[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type CourseSelectionRequest = {
    courseId?: string;
  };

  type CourseSelectionQueryRequest = {
    current?: number;
    pageSize?: number;
    studentId?: string;
    courseId?: string;
    semester?: string;
    sortField?: string;
    sortOrder?: string;
  };

  // 奖励相关类型定义
  type BaseResponseStudentAward_ = {
    code?: number;
    data?: StudentAward;
    message?: string;
  };

  type BaseResponsePageStudentAward_ = {
    code?: number;
    data?: PageStudentAward_;
    message?: string;
  };

  type StudentAward = {
    id?: string;
    studentId?: string;
    awardName?: string;
    awardLevel?: string;
    awardDate?: string;
    awardAmount?: number;
    description?: string;
    createTime?: string;
    updateTime?: string;
  };

  type PageStudentAward_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: StudentAward[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type StudentAwardAddRequest = {
    studentId?: string;
    awardName?: string;
    awardLevel?: string;
    awardDate?: string;
    awardAmount?: number;
    description?: string;
  };

  type StudentAwardUpdateRequest = {
    id?: string;
    studentId?: string;
    awardName?: string;
    awardLevel?: string;
    awardDate?: string;
    awardAmount?: number;
    description?: string;
  };

  type StudentAwardQueryRequest = {
    current?: number;
    pageSize?: number;
    studentId?: string;
    awardLevel?: string;
    startDate?: string;
    endDate?: string;
    sortField?: string;
    sortOrder?: string;
  };

  // 处分相关类型定义
  type BaseResponseStudentPunishment_ = {
    code?: number;
    data?: StudentPunishment;
    message?: string;
  };

  type BaseResponsePageStudentPunishment_ = {
    code?: number;
    data?: PageStudentPunishment_;
    message?: string;
  };

  type StudentPunishment = {
    id?: string;
    studentId?: string;
    punishmentType?: string;
    reason?: string;
    punishmentDate?: string;
    cancelDate?: string;
    description?: string;
    createTime?: string;
    updateTime?: string;
  };

  type PageStudentPunishment_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: StudentPunishment[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type StudentPunishmentAddRequest = {
    studentId?: string;
    punishmentType?: string;
    reason?: string;
    punishmentDate?: string;
    description?: string;
  };

  type StudentPunishmentUpdateRequest = {
    id?: string;
    studentId?: string;
    punishmentType?: string;
    reason?: string;
    punishmentDate?: string;
    cancelDate?: string;
    description?: string;
  };

  type StudentPunishmentQueryRequest = {
    current?: number;
    pageSize?: number;
    studentId?: string;
    punishmentType?: string;
    isRevoked?: boolean;
    startDate?: string;
    endDate?: string;
    sortField?: string;
    sortOrder?: string;
  };

  // 学籍异动相关类型定义
  type BaseResponseStudentStatusChange_ = {
    code?: number;
    data?: StudentStatusChange;
    message?: string;
  };

  type BaseResponsePageStudentStatusChange_ = {
    code?: number;
    data?: PageStudentStatusChange_;
    message?: string;
  };

  type StudentStatusChange = {
    id?: string;
    studentId?: string;
    changeType?: string;
    changeDate?: string;
    reason?: string;
    approver?: string;
    status?: string;
    createTime?: string;
    updateTime?: string;
  };

  type PageStudentStatusChange_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: StudentStatusChange[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type StudentStatusChangeAddRequest = {
    studentId?: string;
    changeType?: string;
    changeDate?: string;
    reason?: string;
    approver?: string;
    status?: string;
  };

  type StudentStatusChangeUpdateRequest = {
    id?: string;
    studentId?: string;
    changeType?: string;
    changeDate?: string;
    reason?: string;
    approver?: string;
    status?: string;
  };

  type StudentStatusChangeQueryRequest = {
    current?: number;
    pageSize?: number;
    studentId?: string;
    changeType?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    sortField?: string;
    sortOrder?: string;
  };

  // 家庭信息相关类型定义
  type BaseResponseStudentFamily_ = {
    code?: number;
    data?: StudentFamily;
    message?: string;
  };

  type BaseResponsePageStudentFamily_ = {
    code?: number;
    data?: PageStudentFamily_;
    message?: string;
  };

  type StudentFamily = {
    id?: string;
    studentId?: string;
    parentName?: string;
    relationship?: string;
    phone?: string;
    occupation?: string;
    workUnit?: string;
    address?: string;
    createTime?: string;
    updateTime?: string;
  };

  type PageStudentFamily_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: StudentFamily[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type StudentFamilyAddRequest = {
    studentId?: string;
    parentName?: string;
    relationship?: string;
    phone?: string;
    occupation?: string;
    workUnit?: string;
    address?: string;
  };

  type StudentFamilyUpdateRequest = {
    id?: string;
    studentId?: string;
    parentName?: string;
    relationship?: string;
    phone?: string;
    occupation?: string;
    workUnit?: string;
    address?: string;
  };

  type StudentFamilyQueryRequest = {
    current?: number;
    pageSize?: number;
    studentId?: string;
    parentName?: string;
    relationship?: string;
    sortField?: string;
    sortOrder?: string;
  };

  // 健康信息相关类型定义
  type BaseResponseStudentHealth_ = {
    code?: number;
    data?: StudentHealth;
    message?: string;
  };

  type BaseResponsePageStudentHealth_ = {
    code?: number;
    data?: PageStudentHealth_;
    message?: string;
  };

  type StudentHealth = {
    id?: string;
    studentId?: string;
    height?: number;
    weight?: number;
    vision?: string;
    bloodType?: string;
    checkDate?: string;
    healthStatus?: string;
    createTime?: string;
    updateTime?: string;
  };

  type PageStudentHealth_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: StudentHealth[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type StudentHealthAddRequest = {
    studentId?: string;
    height?: number;
    weight?: number;
    vision?: string;
    bloodType?: string;
    checkDate?: string;
    healthStatus?: string;
  };

  type StudentHealthUpdateRequest = {
    id?: string;
    studentId?: string;
    height?: number;
    weight?: number;
    vision?: string;
    bloodType?: string;
    checkDate?: string;
    healthStatus?: string;
  };

  type StudentHealthQueryRequest = {
    current?: number;
    pageSize?: number;
    studentId?: string;
    bloodType?: string;
    startDate?: string;
    endDate?: string;
    sortField?: string;
    sortOrder?: string;
  };

  // 通用类型定义
  type getStudentScoreByIdUsingGETParams = {
    id?: string;
  };

  type getCourseByIdUsingGETParams = {
    id?: string;
  };

  type getStudentAwardByIdUsingGETParams = {
    id?: string;
  };

  type getStudentPunishmentByIdUsingGETParams = {
    id?: string;
  };

  type getStudentStatusChangeByIdUsingGETParams = {
    id?: string;
  };

  type getStudentFamilyByIdUsingGETParams = {
    id?: string;
  };

  type getStudentHealthByIdUsingGETParams = {
    id?: string;
  };

  type getGpaUsingGETParams = {
    studentId?: string;
    semester?: string;
  };

  type getScoreDistributionUsingGETParams = {
    courseCode?: string;
    semester?: string;
  };

  type getScoreTrendUsingGETParams = {
    studentId?: string;
  };

  type getScoreRankingUsingGETParams = {
    courseCode?: string;
    semester?: string;
  };

  type getTeacherCoursesUsingGETParams = {
    teacherId?: string;
    semester?: string;
  };

  type getCourseStatsUsingGETParams = {
    semester?: string;
  };

  type checkCourseUsingGETParams = {
    id?: string;
  };

  type checkCourseSelectionUsingGETParams = {
    courseId?: string;
  };

  type getCourseSelectionStatsUsingGETParams = {
    courseId?: string;
  };

  type approveStatusChangeUsingPOSTParams = {
    id?: string;
    approvalStatus?: string;
    approvalComment?: string;
  };

  type revokePunishmentUsingPOSTParams = {
    id?: string;
  };

  type dropCourseUsingPOSTParams = {
    courseId?: string;
  };

  type getCourseStudentsUsingGETParams = {
    courseId?: string;
  };
}
