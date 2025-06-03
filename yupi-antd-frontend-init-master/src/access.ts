/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.UserVO } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canUser: currentUser,
    canAdmin: currentUser && currentUser.userRole === 'admin',
    canTeacher: currentUser && (currentUser.userRole === 'teacher' || currentUser.userRole === 'admin'),
    canStudent: currentUser && (currentUser.userRole === 'user' || currentUser.userRole === 'admin'),
  };
}
