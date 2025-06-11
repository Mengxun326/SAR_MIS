import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, Descriptions, Avatar, Tag, Row, Col, Statistic } from 'antd';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import React from 'react';

const AccountCenter: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const getRoleTag = (role: string) => {
    const roleMap = {
      admin: { color: 'red', text: '管理员' },
      teacher: { color: 'blue', text: '教师' },
      user: { color: 'green', text: '学生' },
    };
    const config = roleMap[role as keyof typeof roleMap] || { color: 'default', text: '未知' };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  return (
    <PageContainer
      header={{
        title: '个人中心',
        subTitle: '查看和管理个人基本信息',
      }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8}>
          <Card
            title="头像信息"
            style={{ textAlign: 'center' }}
          >
            <Avatar 
              size={120} 
              src={currentUser?.userAvatar} 
              icon={<UserOutlined />}
              style={{ marginBottom: 16 }}
            />
            <h3>{currentUser?.userName || '未设置昵称'}</h3>
            {getRoleTag(currentUser?.userRole || 'user')}
          </Card>
        </Col>
        
        <Col xs={24} sm={24} md={16}>
          <Card title="基本信息" extra={<Link to="/account/settings">编辑</Link>}>
            <Descriptions column={1} bordered>
              <Descriptions.Item 
                label={<><UserOutlined /> 用户名</>}
              >
                {currentUser?.userName || '未设置'}
              </Descriptions.Item>
              <Descriptions.Item 
                label={<><TeamOutlined /> 用户ID</>}
              >
                {currentUser?.id || '未设置'}
              </Descriptions.Item>
              <Descriptions.Item 
                label={<><TeamOutlined /> 用户角色</>}
              >
                {getRoleTag(currentUser?.userRole || 'user')}
              </Descriptions.Item>
              <Descriptions.Item 
                label="注册时间"
              >
                {currentUser?.createTime ? new Date(currentUser.createTime).toLocaleString() : '未知'}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} sm={8} md={8}>
          <Card>
            <Statistic
              title="账号状态"
              value="正常"
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8} md={8}>
          <Card>
            <Statistic
              title="权限级别"
              value={currentUser?.userRole === 'admin' ? '管理员' : currentUser?.userRole === 'teacher' ? '教师' : '学生'}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8} md={8}>
          <Card>
            <Statistic
              title="在线状态"
              value="在线"
              prefix={<UserOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default AccountCenter; 