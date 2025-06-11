import { PageContainer, ProForm, ProFormText } from '@ant-design/pro-components';
import { useModel, history } from '@umijs/max';
import { Card, message, Button, Space, Avatar, Form } from 'antd';
import { UserOutlined, SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { updateMyUserUsingPost } from '@/services/backend/userController';
import React, { useState } from 'react';

const AccountSettings: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [loading, setLoading] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(currentUser?.userAvatar || '');

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // 调用真实的API
      const res = await updateMyUserUsingPost({
        userName: values.userName,
        userAvatar: values.userAvatar,
      });

      if (res.code === 0) {
        message.success('个人信息更新成功');
        
        // 更新本地状态
        await setInitialState({
          ...initialState,
          currentUser: {
            ...currentUser,
            userName: values.userName,
            userAvatar: values.userAvatar,
          },
        });
      } else {
        message.error(res.message || '更新用户信息失败');
      }
      
    } catch (error) {
      console.error('更新用户信息失败:', error);
      message.error('更新用户信息失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 验证URL是否为有效的图片链接
  const isValidImageUrl = (url: string) => {
    return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(url);
  };

  // 处理头像URL变化
  const handleAvatarChange = (value: string) => {
    setPreviewAvatar(value);
  };

  return (
    <PageContainer
      header={{
        title: '个人设置',
        subTitle: '修改个人基本信息',
        onBack: () => history.push('/account/center'),
      }}
    >
      <Card>
        <ProForm
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            userName: currentUser?.userName,
            userAvatar: currentUser?.userAvatar,
          }}
          onFinish={handleSubmit}
          onValuesChange={(changedValues) => {
            if (changedValues.userAvatar !== undefined) {
              handleAvatarChange(changedValues.userAvatar);
            }
          }}
          submitter={{
            searchConfig: {
              submitText: '保存设置',
              resetText: '重置',
            },
            submitButtonProps: {
              icon: <SaveOutlined />,
              loading,
            },
            render: (props, dom) => (
              <Space>
                <Button 
                  icon={<ArrowLeftOutlined />} 
                  onClick={() => history.push('/account/center')}
                >
                  返回
                </Button>
                {dom}
              </Space>
            ),
          }}
        >
          <ProFormText
            name="userName"
            label="用户昵称"
            placeholder="请输入用户昵称"
            rules={[
              { required: true, message: '请输入用户昵称' },
              { max: 50, message: '昵称长度不能超过50个字符' },
              { min: 2, message: '昵称长度不能少于2个字符' },
            ]}
          />

          <ProFormText
            name="userAvatar"
            label="头像URL"
            placeholder="请输入头像图片链接地址，如：https://example.com/avatar.jpg"
            rules={[
              { 
                pattern: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i,
                message: '请输入有效的图片URL地址（支持jpg、jpeg、png、gif、webp格式）'
              },
            ]}
            extra="请输入有效的图片URL地址，支持jpg、jpeg、png、gif、webp格式"
          />

          <Form.Item label="头像预览">
            <Space>
              <Avatar 
                size={64} 
                src={previewAvatar && isValidImageUrl(previewAvatar) ? previewAvatar : currentUser?.userAvatar} 
                icon={<UserOutlined />}
              />
              {previewAvatar && !isValidImageUrl(previewAvatar) && previewAvatar !== currentUser?.userAvatar && (
                <span style={{ color: '#ff4d4f', fontSize: '12px' }}>
                  URL格式不正确，请检查
                </span>
              )}
              {previewAvatar && isValidImageUrl(previewAvatar) && previewAvatar !== currentUser?.userAvatar && (
                <span style={{ color: '#52c41a', fontSize: '12px' }}>
                  预览新头像
                </span>
              )}
            </Space>
          </Form.Item>

          <Form.Item label="用户ID">
            <span style={{ color: '#666' }}>
              {currentUser?.id || '未设置'} (ID不可修改)
            </span>
          </Form.Item>

          <Form.Item label="用户角色">
            <span style={{ color: '#666' }}>
              {currentUser?.userRole === 'admin' ? '管理员' : 
               currentUser?.userRole === 'teacher' ? '教师' : '学生'} (角色不可修改)
            </span>
          </Form.Item>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default AccountSettings; 