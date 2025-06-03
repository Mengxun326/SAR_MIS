import { useEffect } from 'react';

/**
 * 自定义Hook：管理页面标题
 * @param title 页面标题
 * @param suffix 标题后缀，默认为系统名称
 */
export const useDocumentTitle = (title: string, suffix: string = '学生学籍管理信息系统') => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `${title} - ${suffix}` : suffix;
    
    // 组件卸载时恢复之前的标题
    return () => {
      document.title = prevTitle;
    };
  }, [title, suffix]);
};

export default useDocumentTitle; 