/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.UserVO } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canUser: currentUser,
    canAdmin: currentUser && currentUser.userRole === 'admin',
    canTeacher: currentUser && (currentUser.userRole === 'teacher' || currentUser.userRole === 'admin'),
    // canStudent 权限已移除，因为路由中未使用，用 canUser 替代
  };
}
