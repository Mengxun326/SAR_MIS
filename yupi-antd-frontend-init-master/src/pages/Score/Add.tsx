import { addStudentScoreUsingPOST } from '@/services/backend/studentScoreController';
import { PlusOutlined, TrophyOutlined, UserOutlined, BookOutlined, CalendarOutlined } from '@ant-design/icons';
import { PageContainer, ProForm, ProFormText, ProFormSelect, ProFormDigit } from '@ant-design/pro-components';
import { Card, message, Button, Space, Typography, Divider } from 'antd';
import { history } from '@umijs/max';
import React from 'react';

const { Title, Text } = Typography;

const ScoreAdd: React.FC = () => {
  /**
   * 提交表单
   */
  const handleSubmit = async (values: API.StudentScoreAddRequest) => {
    try {
      const res = await addStudentScoreUsingPOST(values);
      if (res.code === 0) {
        message.success('成绩录入成功！');
        history.push('/score/list');
      } else {
        message.error('录入失败：' + res.message);
      }
    } catch (error) {
      message.error('录入失败，请重试');
    }
  };

  return (
    <PageContainer
      header={{
        title: (
          <Space>
            <TrophyOutlined style={{ color: '#1890ff' }} />
            <span>录入成绩</span>
          </Space>
        ),
        subTitle: '录入学生考试成绩和评价信息',
      }}
    >
      <Card
        style={{
          maxWidth: 800,
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
            <span style={{ fontWeight: 'bold', color: 'white', fontSize: '16px' }}>新增成绩记录</span>
          </Space>
        }
      >
        <div style={{ padding: '20px 0' }}>
          <ProForm
            onFinish={handleSubmit}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            submitter={{
              render: (props, doms) => {
                return (
                  <div style={{ textAlign: 'center', paddingTop: '32px' }}>
                    <Space size="large">
                      <Button 
                        size="large"
                        onClick={() => history.push('/score/list')}
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
                        icon={<TrophyOutlined />}
                        style={{
                          background: 'linear-gradient(90deg, #1890ff, #722ed1)',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '8px 32px',
                          height: 'auto',
                          fontWeight: 'bold'
                        }}
                      >
                        录入成绩
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
                学生信息
              </Title>
              <ProFormText
                name="studentId"
                label={
                  <Space>
                    <UserOutlined style={{ color: '#1890ff' }} />
                    <span>学号</span>
                  </Space>
                }
                placeholder="请输入学号"
                rules={[
                  { required: true, message: '请输入学号' },
                  { pattern: /^\d+$/, message: '学号只能包含数字' }
                ]}
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px' }
                }}
              />
            </div>

            <Divider style={{ margin: '32px 0' }} />

            <div style={{ marginBottom: '24px' }}>
              <Title level={4} style={{ color: '#722ed1', marginBottom: '16px' }}>
                <BookOutlined style={{ marginRight: '8px' }} />
                课程信息
              </Title>
              <ProFormText
                name="courseCode"
                label={
                  <Space>
                    <BookOutlined style={{ color: '#722ed1' }} />
                    <span>课程代码</span>
                  </Space>
                }
                placeholder="请输入课程代码"
                rules={[{ required: true, message: '请输入课程代码' }]}
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px' }
                }}
              />
              
              <ProFormText
                name="semester"
                label={
                  <Space>
                    <CalendarOutlined style={{ color: '#722ed1' }} />
                    <span>学期</span>
                  </Space>
                }
                placeholder="例如：2023-2024-1"
                rules={[{ required: true, message: '请输入学期' }]}
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px' }
                }}
              />
            </div>

            <Divider style={{ margin: '32px 0' }} />

            <div style={{ marginBottom: '24px' }}>
              <Title level={4} style={{ color: '#52c41a', marginBottom: '16px' }}>
                <TrophyOutlined style={{ marginRight: '8px' }} />
                成绩信息
              </Title>
              <ProFormDigit
                name="score"
                label={
                  <Space>
                    <TrophyOutlined style={{ color: '#52c41a' }} />
                    <span>成绩</span>
                  </Space>
                }
                placeholder="请输入成绩 (0-100)"
                rules={[
                  { required: true, message: '请输入成绩' },
                  { type: 'number', min: 0, max: 100, message: '成绩必须在0-100之间' }
                ]}
                min={0}
                max={100}
                precision={1}
                fieldProps={{
                  size: 'large',
                  style: { borderRadius: '8px', width: '100%' }
                }}
              />

              <ProFormSelect
                name="examType"
                label={
                  <Space>
                    <CalendarOutlined style={{ color: '#52c41a' }} />
                    <span>考试类型</span>
                  </Space>
                }
                placeholder="请选择考试类型"
                rules={[{ required: true, message: '请选择考试类型' }]}
                options={[
                  { label: '📝 正常考试', value: '正常' },
                  { label: '📋 补考', value: '补考' },
                  { label: '🔄 重修', value: '重修' },
                ]}
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
              <Text type="secondary" style={{ fontSize: '12px' }}>
                💡 提示：成绩录入后系统将自动计算绩点，请确保信息准确无误。
              </Text>
            </div>
          </ProForm>
        </div>
      </Card>
    </PageContainer>
  );
};

export default ScoreAdd; 