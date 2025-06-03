import Footer from '@/components/Footer';
import { userRegisterUsingPost } from '@/services/backend/userController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText, ProFormSelect } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history } from '@umijs/max';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import { Link } from 'umi';
import Settings from '../../../../config/defaultSettings';

/**
 * 用户注册页面
 * @constructor
 */
const UserRegisterPage: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  /**
   * 提交注册
   * @param values
   */
  const handleSubmit = async (values: API.UserRegisterRequest) => {
    // 前端校验
    // 1. 判断密码是否一致
    const { userPassword, checkPassword } = values;
    if (userPassword !== checkPassword) {
      message.error('两次输入的密码不一致');
      return;
    }

    try {
      // 注册
      const res = await userRegisterUsingPost({
        ...values,
      });

      if (res.code === 0) {
        const defaultRegisterSuccessMessage = '注册成功！请登录';
        message.success(defaultRegisterSuccessMessage);
        history.push('/user/login');
      } else {
        message.error('注册失败：' + res.message);
      }
      return;
    } catch (error: any) {
      const defaultRegisterFailureMessage = `注册失败，请检查输入信息`;
      message.error(defaultRegisterFailureMessage);
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'注册'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" style={{ height: '44px' }} src="/logo.svg" />}
          title="学生学籍管理信息系统"
          subTitle={'新用户注册'}
          initialValues={{
            autoLogin: true,
          }}
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户注册',
              },
            ]}
          />
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入用户账号'}
                rules={[
                  {
                    required: true,
                    message: '用户账号是必填项！',
                  },
                  {
                    min: 4,
                    max: 16,
                    message: '账号长度在4-16位之间！',
                  },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: '账号只能包含字母、数字、下划线！',
                  },
                ]}
              />
              <ProFormText
                name="userName"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入用户名'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                  {
                    min: 2,
                    max: 20,
                    message: '用户名长度在2-20位之间！',
                  },
                ]}
              />
              <ProFormSelect
                name="userRole"
                fieldProps={{
                  size: 'large',
                }}
                placeholder={'请选择用户角色'}
                options={[
                  { label: '学生', value: 'user' },
                  { label: '教师', value: 'teacher' },
                  { label: '管理员', value: 'admin' },
                ]}
                rules={[
                  {
                    required: true,
                    message: '用户角色是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入登录密码'}
                rules={[
                  {
                    required: true,
                    message: '登录密码是必填项！',
                  },
                  {
                    min: 8,
                    max: 32,
                    message: '密码长度在8-32位之间！',
                  },
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]+$/,
                    message: '密码必须包含大小写字母和数字！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请再次确认密码'}
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
              textAlign: 'right',
            }}
          >
            <Link to="/user/login">已有账号？立即登录</Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default UserRegisterPage;
