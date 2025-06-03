import { PageContainer, ProForm, ProFormText, ProFormSelect, ProFormDatePicker } from '@ant-design/pro-components';
import { Card, message, Button, Space, Typography, Divider } from 'antd';
import { PlusOutlined, UserOutlined, IdcardOutlined, HomeOutlined, PhoneOutlined } from '@ant-design/icons';
import React from 'react';
import { history } from '@umijs/max';
import { addStudentUsingPost } from '@/services/backend/studentController';

const { Title, Text } = Typography;

/**
 * 添加学生页面
 */
const StudentAdd: React.FC = () => {
  /**
   * 提交表单
   */
  const handleSubmit = async (values: API.StudentAddRequest) => {
    try {
      const res = await addStudentUsingPost(values);
      if (res.code === 0) {
        message.success('学生信息添加成功！');
        history.push('/student/list');
      } else {
        message.error('添加失败：' + res.message);
      }
    } catch (error) {
      message.error('添加失败，请重试');
    }
  };

  return (
    <PageContainer
      header={{
        title: (
          <Space>
            <UserOutlined style={{ color: '#1890ff' }} />
            <span>新增学生</span>
          </Space>
        ),
        subTitle: '录入学生基本信息和学籍资料',
      }}
    >
      <Card
        style={{
          maxWidth: 900,
          margin: '0 auto',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: 'none'
        }}
        headStyle={{
          background: 'linear-gradient(90deg, #1890ff 0%, #722ed1 100%)',
          color: 'white',
          borderRadius: '16px 16px 0 0',
        }}
        title={
          <Space>
            <PlusOutlined style={{ color: 'white', fontSize: '16px' }} />
            <span style={{ fontWeight: 'bold', color: 'white', fontSize: '16px' }}>新增学生信息</span>
          </Space>
        }
      >
        <div style={{ padding: '20px 0' }}>
          <ProForm
            onFinish={handleSubmit}
            layout="horizontal"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            submitter={{
              render: (props, doms) => {
                return (
                  <div style={{ textAlign: 'center', paddingTop: '32px' }}>
                    <Space size="large">
                      <Button 
                        size="large"
                        onClick={() => history.push('/student/list')}
                        style={{
                          borderRadius: '8px',
                          padding: '8px 32px',
                          height: 'auto'
                        }}
                      >
                        取消
                      </Button>
                      <Button
                        type="primary"
                        size="large"
                        onClick={() => props.form?.submit?.()}
                        icon={<UserOutlined />}
                        style={{
                          background: 'linear-gradient(90deg, #1890ff, #722ed1)',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '8px 32px',
                          height: 'auto',
                          fontWeight: 'bold'
                        }}
                      >
                        添加学生
                      </Button>
                    </Space>
                  </div>
                );
              },
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <Title level={4} style={{ color: '#1890ff', marginBottom: '16px' }}>
                <UserOutlined style={{ marginRight: '8px' }} />
                基本信息
              </Title>
              <ProFormText
                name="studentId"
                label={
                  <Space>
                    <IdcardOutlined style={{ color: '#1890ff' }} />
                    <span>学号</span>
                  </Space>
                }
                placeholder="请输入学号"
                rules={[
                  { required: true, message: '请输入学号' },
                  { pattern: /^\d{7,10}$/, message: '学号格式不正确' },
                ]}
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px' }
                }}
              />
              
              <ProFormText
                name="name"
                label={
                  <Space>
                    <UserOutlined style={{ color: '#1890ff' }} />
                    <span>姓名</span>
                  </Space>
                }
                placeholder="请输入姓名"
                rules={[
                  { required: true, message: '请输入姓名' },
                  { max: 50, message: '姓名长度不能超过50个字符' },
                ]}
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px' }
                }}
              />

              <ProFormSelect
                name="gender"
                label={
                  <Space>
                    <UserOutlined style={{ color: '#1890ff' }} />
                    <span>性别</span>
                  </Space>
                }
                placeholder="请选择性别"
                options={[
                  { label: '👩 女', value: 0 },
                  { label: '👨 男', value: 1 },
                ]}
                rules={[{ required: true, message: '请选择性别' }]}
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px' }
                }}
              />

              <ProFormDatePicker
                name="birthDate"
                label={
                  <Space>
                    <IdcardOutlined style={{ color: '#1890ff' }} />
                    <span>出生日期</span>
                  </Space>
                }
                placeholder="请选择出生日期"
                rules={[{ required: true, message: '请选择出生日期' }]}
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px', width: '100%' }
                }}
              />
            </div>

            <Divider style={{ margin: '32px 0' }} />

            <div style={{ marginBottom: '24px' }}>
              <Title level={4} style={{ color: '#722ed1', marginBottom: '16px' }}>
                <IdcardOutlined style={{ marginRight: '8px' }} />
                身份信息
              </Title>
              <ProFormText
                name="idCard"
                label={
                  <Space>
                    <IdcardOutlined style={{ color: '#722ed1' }} />
                    <span>身份证号</span>
                  </Space>
                }
                placeholder="请输入身份证号"
                rules={[
                  { required: true, message: '请输入身份证号' },
                  { pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '身份证号格式不正确' },
                ]}
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px' }
                }}
              />

              <ProFormText
                name="nationality"
                label={
                  <Space>
                    <IdcardOutlined style={{ color: '#722ed1' }} />
                    <span>民族</span>
                  </Space>
                }
                placeholder="请输入民族"
                rules={[{ required: true, message: '请输入民族' }]}
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px' }
                }}
              />

              <ProFormSelect
                name="politicalStatus"
                label={
                  <Space>
                    <IdcardOutlined style={{ color: '#722ed1' }} />
                    <span>政治面貌</span>
                  </Space>
                }
                placeholder="请选择政治面貌"
                options={[
                  { label: '👥 群众', value: '群众' },
                  { label: '🎯 团员', value: '团员' },
                  { label: '🚩 党员', value: '党员' },
                  { label: '🏛️ 民主党派', value: '民主党派' },
                ]}
                rules={[{ required: true, message: '请选择政治面貌' }]}
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px' }
                }}
              />
            </div>

            <Divider style={{ margin: '32px 0' }} />

            <div style={{ marginBottom: '24px' }}>
              <Title level={4} style={{ color: '#52c41a', marginBottom: '16px' }}>
                <UserOutlined style={{ marginRight: '8px' }} />
                学籍信息
              </Title>
              <ProFormDatePicker
                name="enrollmentDate"
                label={
                  <Space>
                    <UserOutlined style={{ color: '#52c41a' }} />
                    <span>入学日期</span>
                  </Space>
                }
                placeholder="请选择入学日期"
                rules={[{ required: true, message: '请选择入学日期' }]}
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px', width: '100%' }
                }}
              />

              <ProFormText
                name="major"
                label={
                  <Space>
                    <UserOutlined style={{ color: '#52c41a' }} />
                    <span>专业</span>
                  </Space>
                }
                placeholder="请输入专业"
                rules={[{ required: true, message: '请输入专业' }]}
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px' }
                }}
              />

              <ProFormText
                name="className"
                label={
                  <Space>
                    <UserOutlined style={{ color: '#52c41a' }} />
                    <span>班级</span>
                  </Space>
                }
                placeholder="请输入班级"
                rules={[{ required: true, message: '请输入班级' }]}
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px' }
                }}
              />

              <ProFormSelect
                name="status"
                label={
                  <Space>
                    <UserOutlined style={{ color: '#52c41a' }} />
                    <span>学籍状态</span>
                  </Space>
                }
                placeholder="请选择学籍状态"
                options={[
                  { label: '📚 在读', value: '在读' },
                  { label: '⏸️ 休学', value: '休学' },
                  { label: '🚪 退学', value: '退学' },
                  { label: '🎓 毕业', value: '毕业' },
                ]}
                rules={[{ required: true, message: '请选择学籍状态' }]}
                initialValue="在读"
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px' }
                }}
              />
            </div>

            <Divider style={{ margin: '32px 0' }} />

            <div style={{ marginBottom: '24px' }}>
              <Title level={4} style={{ color: '#fa8c16', marginBottom: '16px' }}>
                <PhoneOutlined style={{ marginRight: '8px' }} />
                联系信息
              </Title>
              <ProFormText
                name="phone"
                label={
                  <Space>
                    <PhoneOutlined style={{ color: '#fa8c16' }} />
                    <span>手机号</span>
                  </Space>
                }
                placeholder="请输入手机号"
                rules={[
                  { required: true, message: '请输入手机号' },
                  { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' },
                ]}
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px' }
                }}
              />

              <ProFormText
                name="email"
                label={
                  <Space>
                    <PhoneOutlined style={{ color: '#fa8c16' }} />
                    <span>邮箱</span>
                  </Space>
                }
                placeholder="请输入邮箱"
                rules={[
                  { type: 'email', message: '邮箱格式不正确' },
                ]}
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px' }
                }}
              />

              <ProFormText
                name="address"
                label={
                  <Space>
                    <HomeOutlined style={{ color: '#fa8c16' }} />
                    <span>家庭住址</span>
                  </Space>
                }
                placeholder="请输入家庭住址"
                rules={[{ max: 200, message: '地址长度不能超过200个字符' }]}
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px' }
                }}
              />
            </div>

            <div style={{ 
              background: '#f0f5ff', 
              padding: '16px', 
              borderRadius: '8px',
              marginTop: '24px'
            }}>
              <Text type="secondary" style={{ fontSize: '12px', color: '#666' }}>
                💡 提示：学号是学生的唯一标识，请确保准确无误。标有 * 的字段为必填项。
              </Text>
            </div>
          </ProForm>
        </div>
      </Card>
    </PageContainer>
  );
};

export default StudentAdd; 