import { PageContainer, ProForm, ProFormDigit, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Card, message, Button, Space, Typography, Divider } from 'antd';
import { PlusOutlined, BookOutlined, ClockCircleOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { addCourseUsingPOST } from '@/services/backend/courseController';

const { Title, Text } = Typography;

const CourseAdd: React.FC = () => {
  const handleSubmit = async (values: API.CourseAddRequest) => {
    try {
      await addCourseUsingPOST(values);
      message.success('课程信息添加成功！');
      history.push('/course/list');
    } catch (error) {
      message.error('添加失败，请重试');
    }
  };

  return (
    <PageContainer
      header={{
        title: (
          <Space>
            <BookOutlined style={{ color: '#1890ff' }} />
            <span>新增课程</span>
          </Space>
        ),
        subTitle: '录入课程基本信息和教学安排',
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
            <span style={{ fontWeight: 'bold', color: 'white', fontSize: '16px' }}>新增课程信息</span>
          </Space>
        }
      >
        <div style={{ padding: '20px 0' }}>
          <ProForm<API.CourseAddRequest>
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
                        onClick={() => history.push('/course/list')}
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
                        icon={<BookOutlined />}
                        style={{
                          background: 'linear-gradient(90deg, #1890ff, #722ed1)',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '8px 32px',
                          height: 'auto',
                          fontWeight: 'bold'
                        }}
                      >
                        添加课程
                      </Button>
                    </Space>
                  </div>
                );
              },
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <Title level={4} style={{ color: '#1890ff', marginBottom: '16px' }}>
                <BookOutlined style={{ marginRight: '8px' }} />
                基本信息
              </Title>
              <ProFormText
                name="courseCode"
                label={
                  <Space>
                    <BookOutlined style={{ color: '#1890ff' }} />
                    <span>课程代码</span>
                  </Space>
                }
                rules={[
                  {
                    required: true,
                    message: '请输入课程代码',
                  },
                ]}
                placeholder="请输入课程代码"
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px' }
                }}
              />
              <ProFormText
                name="courseName"
                label={
                  <Space>
                    <BookOutlined style={{ color: '#1890ff' }} />
                    <span>课程名称</span>
                  </Space>
                }
                rules={[
                  {
                    required: true,
                    message: '请输入课程名称',
                  },
                ]}
                placeholder="请输入课程名称"
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px' }
                }}
              />
              
              <ProFormSelect
                name="courseType"
                label={
                  <Space>
                    <BookOutlined style={{ color: '#1890ff' }} />
                    <span>课程类型</span>
                  </Space>
                }
                rules={[
                  {
                    required: true,
                    message: '请选择课程类型',
                  },
                ]}
                options={[
                  { label: '⭐ 必修', value: '必修' },
                  { label: '📖 选修', value: '选修' },
                  { label: '🔬 实践', value: '实践' },
                  { label: '💡 通识', value: '通识' },
                ]}
                placeholder="请选择课程类型"
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px' }
                }}
              />
            </div>

            <Divider style={{ margin: '32px 0' }} />

            <div style={{ marginBottom: '24px' }}>
              <Title level={4} style={{ color: '#52c41a', marginBottom: '16px' }}>
                <ClockCircleOutlined style={{ marginRight: '8px' }} />
                学分学时
              </Title>
              <ProFormDigit
                name="credit"
                label={
                  <Space>
                    <ClockCircleOutlined style={{ color: '#52c41a' }} />
                    <span>学分</span>
                  </Space>
                }
                rules={[
                  {
                    required: true,
                    message: '请输入学分',
                  },
                ]}
                min={0}
                max={10}
                placeholder="请输入学分"
                fieldProps={{
                  precision: 1,
                  size: 'large',
                  style: { borderRadius: '8px', width: '100%' }
                }}
              />
              <ProFormDigit
                name="courseHour"
                label={
                  <Space>
                    <ClockCircleOutlined style={{ color: '#52c41a' }} />
                    <span>学时</span>
                  </Space>
                }
                rules={[
                  {
                    required: true,
                    message: '请输入学时',
                  },
                ]}
                min={0}
                placeholder="请输入学时"
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px', width: '100%' }
                }}
              />
            </div>

            <Divider style={{ margin: '32px 0' }} />

            <div style={{ marginBottom: '24px' }}>
              <Title level={4} style={{ color: '#722ed1', marginBottom: '16px' }}>
                <HomeOutlined style={{ marginRight: '8px' }} />
                开课信息
              </Title>
              <ProFormText
                name="department"
                label={
                  <Space>
                    <HomeOutlined style={{ color: '#722ed1' }} />
                    <span>开课院系</span>
                  </Space>
                }
                rules={[
                  {
                    required: true,
                    message: '请输入开课院系',
                  },
                ]}
                placeholder="请输入开课院系"
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px' }
                }}
              />
              
              <ProFormText
                name="semester"
                label={
                  <Space>
                    <HomeOutlined style={{ color: '#722ed1' }} />
                    <span>学期</span>
                  </Space>
                }
                rules={[
                  {
                    required: true,
                    message: '请输入学期',
                  },
                ]}
                placeholder="例如：2023-2024-1"
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px' }
                }}
              />
              
              <ProFormDigit
                name="maxStudent"
                label={
                  <Space>
                    <UserOutlined style={{ color: '#722ed1' }} />
                    <span>最大人数</span>
                  </Space>
                }
                rules={[
                  {
                    required: true,
                    message: '请输入最大人数',
                  },
                ]}
                min={1}
                placeholder="请输入最大人数"
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px', width: '100%' }
                }}
              />
            </div>

            <Divider style={{ margin: '32px 0' }} />

            <div style={{ marginBottom: '24px' }}>
              <Title level={4} style={{ color: '#fa8c16', marginBottom: '16px' }}>
                <ClockCircleOutlined style={{ marginRight: '8px' }} />
                教学安排
              </Title>
              <ProFormText
                name="teacherId"
                label={
                  <Space>
                    <UserOutlined style={{ color: '#fa8c16' }} />
                    <span>教师ID</span>
                  </Space>
                }
                rules={[
                  {
                    required: true,
                    message: '请输入教师ID',
                  },
                ]}
                placeholder="请输入教师ID"
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px' }
                }}
              />
              
              <ProFormText
                name="courseTime"
                label={
                  <Space>
                    <ClockCircleOutlined style={{ color: '#fa8c16' }} />
                    <span>上课时间</span>
                  </Space>
                }
                placeholder="例如：周一1-2节"
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px' }
                }}
              />
              
              <ProFormText
                name="location"
                label={
                  <Space>
                    <HomeOutlined style={{ color: '#fa8c16' }} />
                    <span>上课地点</span>
                  </Space>
                }
                placeholder="例如：教学楼A101"
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
                💡 提示：课程代码是课程的唯一标识，请确保准确无误。标有 * 的字段为必填项。
              </Text>
            </div>
          </ProForm>
        </div>
      </Card>
    </PageContainer>
  );
};

export default CourseAdd; 