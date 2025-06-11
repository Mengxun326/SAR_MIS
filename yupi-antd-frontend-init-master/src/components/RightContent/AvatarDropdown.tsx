import { userLogoutUsingPost } from '@/services/backend/userController';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Avatar, Button, Space, message } from 'antd';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import { Link } from 'umi';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    try {
      await userLogoutUsingPost();
      message.success('退出登录成功');
    } catch (error) {
      console.error('退出登录失败:', error);
      message.error('退出登录失败');
    }
    
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };

  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s) => ({ ...s, currentUser: undefined }));
        });
        loginOut();
        return;
      }
      
      // 修复个人中心路由跳转
      if (key === 'center' || key === 'settings') {
        history.push(`/account/${key}`);
        return;
      }
      
      // 其他路由跳转
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const { currentUser } = initialState || {};

  if (!currentUser) {
    return (
      <Link to="/user/login">
        <Button type="primary" shape="round">
          登录
        </Button>
      </Link>
    );
  }

  const menuItems = [
    ...(menu
      ? [
          {
            key: 'center',
            icon: <UserOutlined />,
            label: '个人中心',
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '个人设置',
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      <Space>
        {currentUser?.userAvatar ? (
          <Avatar size="small" src={currentUser?.userAvatar} />
        ) : (
          <Avatar size="small" icon={<UserOutlined />} />
        )}
        <span className="anticon">{currentUser?.userName ?? '无名'}</span>
      </Space>
    </HeaderDropdown>
  );
};

export const AvatarName = () => {};
