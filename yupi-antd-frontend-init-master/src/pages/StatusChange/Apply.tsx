import { PageContainer, ProForm, ProFormText, ProFormSelect, ProFormDatePicker, ProFormTextArea, ProCard } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Card, message, Steps, Row, Col, Typography, Space, Alert } from 'antd';
import React, { useState } from 'react';
import { BookOutlined, FormOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { addStudentStatusChangeUsingPOST } from '@/services/backend/studentStatusChangeController';

const { Title, Paragraph } = Typography;

const StatusChangeApply: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: API.StudentStatusChangeAddRequest) => {
    setLoading(true);
    try {
      await addStudentStatusChangeUsingPOST(values);
      message.success('异动申请提交成功！请等待管理员审批');
      history.push('/status-change/list');
    } catch (error) {
      message.error('异动申请提交失败，请检查填写信息');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer
      header={{
        title: '学籍异动申请',
        subTitle: '请填写真实有效的异动信息',
        breadcrumb: {
          items: [
            { title: '首页', path: '/' },
            { title: '学籍异动', path: '/status-change' },
            { title: '申请异动' },
          ],
        },
      }}
    >
      <Row gutter={24}>
        <Col span={16}>
          <ProCard
            title={
              <Space>
                <FormOutlined style={{ color: '#1890ff' }} />
                申请表单
              </Space>
            }
            bordered
            headerBordered
          >
            <ProForm<API.StudentStatusChangeAddRequest>
              onFinish={handleSubmit}
              submitter={{
                searchConfig: {
                  resetText: '重置',
                  submitText: '提交申请',
                },
                submitButtonProps: {
                  loading,
                  size: 'large',
                  type: 'primary',
                },
                resetButtonProps: {
                  size: 'large',
                },
                render: (props, doms) => {
                  return (
                    <Row justify="center" style={{ marginTop: 32 }}>
                      <Space size="large">
                        {doms}
                      </Space>
                    </Row>
                  );
                },
              }}
              layout="vertical"
            >
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormText
                    name="studentId"
                    label="学号"
                    rules={[
                      { required: true, message: '请输入学号' },
                      { pattern: /^\d{10,20}$/, message: '学号格式不正确' },
                    ]}
                    placeholder="请输入学号"
                    fieldProps={{
                      size: 'large',
                    }}
                  />
                </Col>
                <Col span={12}>
                  <ProFormSelect
                    name="changeType"
                    label="异动类型"
                    rules={[{ required: true, message: '请选择异动类型' }]}
                    options={[
                      { 
                        label: '转专业', 
                        value: '转专业',
                        emoji: '📚'
                      },
                      { 
                        label: '转学', 
                        value: '转学',
                        emoji: '🎒'
                      },
                      { 
                        label: '休学', 
                        value: '休学',
                        emoji: '⏸️'
                      },
                      { 
                        label: '复学', 
                        value: '复学',
                        emoji: '▶️'
                      },
                      { 
                        label: '退学', 
                        value: '退学',
                        emoji: '❌'
                      },
                    ]}
                    placeholder="请选择异动类型"
                    fieldProps={{
                      size: 'large',
                      optionLabelProp: 'label',
                    }}
                  />
                </Col>
              </Row>
              
              <ProFormDatePicker
                name="changeDate"
                label="异动日期"
                rules={[{ required: true, message: '请选择异动日期' }]}
                placeholder="请选择异动日期"
                fieldProps={{
                  size: 'large',
                  style: { width: '100%' },
                }}
              />
              
              <ProFormTextArea
                name="reason"
                label="异动原因"
                rules={[
                  { required: true, message: '请输入异动原因' },
                  { min: 10, message: '异动原因至少10个字符' },
                  { max: 500, message: '异动原因不能超过500个字符' },
                ]}
                placeholder="请详细说明异动原因，包括具体情况、申请目的等"
                fieldProps={{
                  rows: 4,
                  maxLength: 500,
                  showCount: true,
                }}
              />
            </ProForm>
          </ProCard>
        </Col>
        
        <Col span={8}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <ProCard
              title={
                <Space>
                  <CheckCircleOutlined style={{ color: '#52c41a' }} />
                  申请流程
                </Space>
              }
              bordered
              headerBordered
            >
              <Steps
                direction="vertical"
                size="small"
                current={0}
                items={[
                  {
                    title: '提交申请',
                    description: '填写并提交异动申请表',
                  },
                  {
                    title: '管理员审核',
                    description: '等待管理员审核申请',
                  },
                  {
                    title: '审核结果',
                    description: '查看审核结果和意见',
                  },
                ]}
              />
            </ProCard>
            
            <ProCard
              title={
                <Space>
                  <BookOutlined style={{ color: '#faad14' }} />
                  注意事项
                </Space>
              }
              bordered
              headerBordered
            >
              <Alert
                message="重要提醒"
                description={
                  <div>
                    <Paragraph style={{ margin: 0 }}>
                      1. 请确保填写信息真实有效
                    </Paragraph>
                    <Paragraph style={{ margin: 0 }}>
                      2. 异动申请提交后无法修改
                    </Paragraph>
                    <Paragraph style={{ margin: 0 }}>
                      3. 审批结果将通过系统通知
                    </Paragraph>
                    <Paragraph style={{ margin: 0 }}>
                      4. 如有疑问请联系教务处
                    </Paragraph>
                  </div>
                }
                type="warning"
                showIcon
              />
            </ProCard>

            <ProCard
              title="异动类型说明"
              bordered
              headerBordered
            >
              <div style={{ fontSize: '12px', color: '#666' }}>
                <p><strong>转专业：</strong>更改学习专业</p>
                <p><strong>转学：</strong>转到其他学校</p>
                <p><strong>休学：</strong>暂停学业</p>
                <p><strong>复学：</strong>恢复学业</p>
                <p><strong>退学：</strong>终止学业</p>
              </div>
            </ProCard>
          </Space>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default StatusChangeApply; 