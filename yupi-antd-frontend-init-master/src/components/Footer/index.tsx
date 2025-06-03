import { GithubOutlined, BookOutlined, UserOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = '学生学籍管理信息系统';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'system',
          title: (
            <>
              <BookOutlined /> 学籍管理
            </>
          ),
          href: '/welcome',
          blankTarget: false,
        },
        {
          key: 'student',
          title: (
            <>
              <UserOutlined /> 学生管理
            </>
          ),
          href: '/student/list',
          blankTarget: false,
        },
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> 系统源码
            </>
          ),
          href: 'https://github.com',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
