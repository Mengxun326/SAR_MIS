import { PageContainer, ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { Card, Col, Row, Statistic, message, Spin, Table, Progress, Typography, Space, Divider } from 'antd';
import { 
  TrophyOutlined, 
  BarChartOutlined, 
  LineChartOutlined, 
  OrderedListOutlined,
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
  NumberOutlined 
} from '@ant-design/icons';
import React, { useState } from 'react';
import {
  getStudentGpaUsingGET,
  getScoreDistributionUsingGET,
  getScoreTrendUsingGET,
  getScoreRankingUsingGET,
} from '@/services/backend/studentScoreController';

const { Title, Text } = Typography;

const ScoreStatistics: React.FC = () => {
  const [gpaData, setGpaData] = useState<number>();
  const [distributionData, setDistributionData] = useState<any>();
  const [trendData, setTrendData] = useState<any>();
  const [rankingData, setRankingData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 查询学生GPA
  const handleGpaQuery = async (values: { studentId: string; semester?: string }) => {
    if (!values.semester) {
      message.error('学期为必填项');
      return;
    }
    setLoading(true);
    try {
      const res = await getStudentGpaUsingGET(values);
      if (res.code === 0) {
        setGpaData(res.data);
      } else {
        message.error('查询GPA失败：' + res.message);
      }
    } catch (error) {
      message.error('查询GPA失败');
    } finally {
      setLoading(false);
    }
  };

  // 查询成绩分布
  const handleDistributionQuery = async (values: { courseCode: string; semester?: string }) => {
    if (!values.semester) {
      message.error('学期为必填项');
      return;
    }
    setLoading(true);
    try {
      const res = await getScoreDistributionUsingGET(values);
      if (res.code === 0) {
        setDistributionData(res.data);
      } else {
        message.error('查询成绩分布失败：' + res.message);
      }
    } catch (error) {
      message.error('查询成绩分布失败');
    } finally {
      setLoading(false);
    }
  };

  // 查询成绩趋势
  const handleTrendQuery = async (values: { studentId: string }) => {
    setLoading(true);
    try {
      const res = await getScoreTrendUsingGET(values);
      if (res.code === 0) {
        setTrendData(res.data);
      } else {
        message.error('查询成绩趋势失败：' + res.message);
      }
    } catch (error) {
      message.error('查询成绩趋势失败');
    } finally {
      setLoading(false);
    }
  };

  // 查询成绩排名
  const handleRankingQuery = async (values: { courseCode: string; semester?: string }) => {
    if (!values.semester) {
      message.error('学期为必填项');
      return;
    }
    setLoading(true);
    try {
      const res = await getScoreRankingUsingGET(values);
      if (res.code === 0) {
        setRankingData(res.data || []);
      } else {
        message.error('查询成绩排名失败：' + res.message);
      }
    } catch (error) {
      message.error('查询成绩排名失败');
    } finally {
      setLoading(false);
    }
  };

  // 获取GPA等级颜色
  const getGpaColor = (gpa: number) => {
    if (gpa >= 3.5) return '#52c41a';
    if (gpa >= 3.0) return '#1890ff';
    if (gpa >= 2.5) return '#faad14';
    return '#f5222d';
  };

  // 获取GPA等级描述
  const getGpaLevel = (gpa: number) => {
    if (gpa >= 3.5) return '优秀';
    if (gpa >= 3.0) return '良好';
    if (gpa >= 2.5) return '中等';
    return '需要努力';
  };

  // 成绩分布配置
  const distributionConfig = [
    { key: '90-100', label: '优秀', color: '#52c41a', icon: '🏆' },
    { key: '80-89', label: '良好', color: '#1890ff', icon: '👍' },
    { key: '70-79', label: '中等', color: '#faad14', icon: '📚' },
    { key: '60-69', label: '及格', color: '#fa8c16', icon: '✅' },
    { key: '0-59', label: '不及格', color: '#f5222d', icon: '⚠️' },
  ];

  // 排名表格列定义
  const rankingColumns = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 80,
      render: (rank: number) => (
        <div style={{ textAlign: 'center' }}>
          {rank <= 3 ? (
            <span style={{ fontSize: '16px' }}>
              {rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'}
            </span>
          ) : (
            <span style={{ fontWeight: 'bold', color: '#1890ff' }}>{rank}</span>
          )}
        </div>
      ),
    },
    {
      title: '学号',
      dataIndex: 'studentId',
      key: 'studentId',
      render: (studentId: string) => (
        <span style={{ fontFamily: 'monospace' }}>{studentId}</span>
      ),
    },
    {
      title: '成绩',
      dataIndex: 'score',
      key: 'score',
      render: (score: number) => (
        <span style={{ 
          fontWeight: 'bold', 
          color: score >= 90 ? '#52c41a' : score >= 80 ? '#1890ff' : score >= 60 ? '#faad14' : '#f5222d' 
        }}>
          {score?.toFixed(1)}
        </span>
      ),
    },
  ];

  const cardStyle = {
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #f0f0f0',
  };

  const headerStyle = {
    background: 'linear-gradient(90deg, #1890ff 0%, #722ed1 100%)',
    borderRadius: '8px 8px 0 0',
    color: 'white',
    padding: '12px 20px',
    marginBottom: '20px',
  };

  return (
    <PageContainer
      header={{
        title: (
          <Space>
            <BarChartOutlined style={{ color: '#1890ff' }} />
            <span>成绩统计分析</span>
          </Space>
        ),
        subTitle: '全方位的学业成绩数据分析平台',
      }}
    >
      <Row gutter={[24, 24]}>
        {/* GPA查询 */}
        <Col xs={24} lg={12}>
          <ProCard 
            title={
              <Space>
                <TrophyOutlined style={{ color: '#faad14' }} />
                <span>学生GPA查询</span>
              </Space>
            }
            bordered
            style={cardStyle}
            headStyle={headerStyle}
          >
            <ProForm
              layout="horizontal"
              onFinish={handleGpaQuery}
              submitter={{
                searchConfig: {
                  submitText: '查询GPA',
                },
                resetButtonProps: false,
                submitButtonProps: {
                  style: {
                    background: 'linear-gradient(90deg, #1890ff, #722ed1)',
                    border: 'none',
                    borderRadius: '6px',
                  }
                }
              }}
            >
              <ProFormText
                name="studentId"
                label={<Space><UserOutlined />学号</Space>}
                rules={[{ required: true, message: '请输入学号' }]}
                placeholder="请输入学号"
                fieldProps={{
                  prefix: <NumberOutlined style={{ color: '#1890ff' }} />,
                }}
              />
              <ProFormText
                name="semester"
                label={<Space><CalendarOutlined />学期</Space>}
                rules={[{ required: true, message: '请输入学期' }]}
                placeholder="例如：2023-2024-1"
                fieldProps={{
                  prefix: <CalendarOutlined style={{ color: '#1890ff' }} />,
                }}
              />
            </ProForm>
            
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Spin size="large" />
              </div>
            ) : (
              gpaData !== undefined && (
                <Card style={{ marginTop: '16px', background: '#fafafa' }}>
                  <div style={{ textAlign: 'center' }}>
                    <Statistic
                      title="当前GPA"
                      value={gpaData}
                      precision={2}
                      valueStyle={{ 
                        color: getGpaColor(gpaData), 
                        fontSize: '32px',
                        fontWeight: 'bold' 
                      }}
                    />
                    <div style={{ 
                      marginTop: '12px', 
                      padding: '8px 16px', 
                      background: getGpaColor(gpaData),
                      color: 'white',
                      borderRadius: '20px',
                      display: 'inline-block'
                    }}>
                      {getGpaLevel(gpaData)}
                    </div>
                    <Progress
                      percent={(gpaData / 4.0) * 100}
                      strokeColor={getGpaColor(gpaData)}
                      style={{ marginTop: '16px' }}
                      showInfo={false}
                    />
                  </div>
                </Card>
              )
            )}
          </ProCard>
        </Col>

        {/* 成绩分布查询 */}
        <Col xs={24} lg={12}>
          <ProCard 
            title={
              <Space>
                <BarChartOutlined style={{ color: '#52c41a' }} />
                <span>课程成绩分布</span>
              </Space>
            }
            bordered
            style={cardStyle}
            headStyle={headerStyle}
          >
            <ProForm
              layout="horizontal"
              onFinish={handleDistributionQuery}
              submitter={{
                searchConfig: {
                  submitText: '查询分布',
                },
                resetButtonProps: false,
                submitButtonProps: {
                  style: {
                    background: 'linear-gradient(90deg, #52c41a, #1890ff)',
                    border: 'none',
                    borderRadius: '6px',
                  }
                }
              }}
            >
              <ProFormText
                name="courseCode"
                label={<Space><BookOutlined />课程代码</Space>}
                rules={[{ required: true, message: '请输入课程代码' }]}
                placeholder="请输入课程代码"
                fieldProps={{
                  prefix: <BookOutlined style={{ color: '#52c41a' }} />,
                }}
              />
              <ProFormText
                name="semester"
                label={<Space><CalendarOutlined />学期</Space>}
                rules={[{ required: true, message: '请输入学期' }]}
                placeholder="例如：2023-2024-1"
                fieldProps={{
                  prefix: <CalendarOutlined style={{ color: '#52c41a' }} />,
                }}
              />
            </ProForm>
            
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Spin size="large" />
              </div>
            ) : (
              distributionData && (
                <div style={{ marginTop: '16px' }}>
                  {distributionConfig.map(config => {
                    const count = distributionData[config.key] || 0;
                    const total = Object.values(distributionData).reduce((a: any, b: any) => a + b, 0) as number;
                    const percentage = total > 0 ? (count / total * 100).toFixed(1) : '0';
                    
                    return (
                      <Card key={config.key} style={{ marginBottom: '12px', border: `2px solid ${config.color}` }}>
                        <Row align="middle">
                          <Col span={4}>
                            <div style={{ fontSize: '24px', textAlign: 'center' }}>
                              {config.icon}
                            </div>
                          </Col>
                          <Col span={8}>
                            <div>
                              <Text strong style={{ color: config.color }}>{config.label}</Text>
                              <br />
                              <Text type="secondary">{config.key}分</Text>
                            </div>
                          </Col>
                          <Col span={6}>
                            <Statistic 
                              value={count} 
                              suffix="人"
                              valueStyle={{ color: config.color }}
                            />
                          </Col>
                          <Col span={6}>
                            <Progress 
                              percent={parseFloat(percentage)}
                              strokeColor={config.color}
                              size="small"
                              format={() => `${percentage}%`}
                            />
                          </Col>
                        </Row>
                      </Card>
                    );
                  })}
                </div>
              )
            )}
          </ProCard>
        </Col>

        {/* 成绩趋势查询 */}
        <Col xs={24} lg={12}>
          <ProCard 
            title={
              <Space>
                <LineChartOutlined style={{ color: '#722ed1' }} />
                <span>学生成绩趋势</span>
              </Space>
            }
            bordered
            style={cardStyle}
            headStyle={headerStyle}
          >
            <ProForm
              layout="horizontal"
              onFinish={handleTrendQuery}
              submitter={{
                searchConfig: {
                  submitText: '查询趋势',
                },
                resetButtonProps: false,
                submitButtonProps: {
                  style: {
                    background: 'linear-gradient(90deg, #722ed1, #eb2f96)',
                    border: 'none',
                    borderRadius: '6px',
                  }
                }
              }}
            >
              <ProFormText
                name="studentId"
                label={<Space><UserOutlined />学号</Space>}
                rules={[{ required: true, message: '请输入学号' }]}
                placeholder="请输入学号"
                fieldProps={{
                  prefix: <UserOutlined style={{ color: '#722ed1' }} />,
                }}
              />
            </ProForm>
            
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Spin size="large" />
              </div>
            ) : (
              trendData && Object.keys(trendData).length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <Title level={5} style={{ textAlign: 'center', marginBottom: '20px' }}>
                    📈 各学期成绩趋势
                  </Title>
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {Object.entries(trendData).map(([semester, score], index) => (
                      <Card key={semester} style={{ marginBottom: '12px', background: '#f9f9f9' }}>
                        <Row align="middle">
                          <Col span={8}>
                            <Space>
                              <div style={{ 
                                width: '32px', 
                                height: '32px', 
                                borderRadius: '50%', 
                                background: '#722ed1',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold'
                              }}>
                                {index + 1}
                              </div>
                              <Text strong>{semester}</Text>
                            </Space>
                          </Col>
                          <Col span={8}>
                            <Statistic
                              value={(score as number)?.toFixed(2)}
                              suffix="分"
                              valueStyle={{ 
                                color: (score as number) >= 85 ? '#52c41a' : 
                                       (score as number) >= 75 ? '#1890ff' : 
                                       (score as number) >= 60 ? '#faad14' : '#f5222d' 
                              }}
                            />
                          </Col>
                          <Col span={8}>
                            <Progress 
                              percent={(score as number)}
                              strokeColor={{
                                '0%': '#722ed1',
                                '100%': '#eb2f96',
                              }}
                              size="small"
                            />
                          </Col>
                        </Row>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            )}
          </ProCard>
        </Col>

        {/* 成绩排名查询 */}
        <Col xs={24} lg={12}>
          <ProCard 
            title={
              <Space>
                <OrderedListOutlined style={{ color: '#fa8c16' }} />
                <span>课程成绩排名</span>
              </Space>
            }
            bordered
            style={cardStyle}
            headStyle={headerStyle}
          >
            <ProForm
              layout="horizontal"
              onFinish={handleRankingQuery}
              submitter={{
                searchConfig: {
                  submitText: '查询排名',
                },
                resetButtonProps: false,
                submitButtonProps: {
                  style: {
                    background: 'linear-gradient(90deg, #fa8c16, #faad14)',
                    border: 'none',
                    borderRadius: '6px',
                  }
                }
              }}
            >
              <ProFormText
                name="courseCode"
                label={<Space><BookOutlined />课程代码</Space>}
                rules={[{ required: true, message: '请输入课程代码' }]}
                placeholder="请输入课程代码"
                fieldProps={{
                  prefix: <BookOutlined style={{ color: '#fa8c16' }} />,
                }}
              />
              <ProFormText
                name="semester"
                label={<Space><CalendarOutlined />学期</Space>}
                rules={[{ required: true, message: '请输入学期' }]}
                placeholder="例如：2023-2024-1"
                fieldProps={{
                  prefix: <CalendarOutlined style={{ color: '#fa8c16' }} />,
                }}
              />
            </ProForm>
            
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Spin size="large" />
              </div>
            ) : (
              rankingData.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <Card style={{ marginBottom: '16px', background: '#fff7e6', border: '1px solid #ffd591' }}>
                    <div style={{ textAlign: 'center' }}>
                      <Statistic 
                        title="参与统计人数" 
                        value={rankingData.length} 
                        suffix="人"
                        valueStyle={{ color: '#fa8c16' }}
                        prefix={<UserOutlined />}
                      />
                    </div>
                  </Card>
                  <Table
                    columns={rankingColumns}
                    dataSource={rankingData}
                    pagination={{ 
                      pageSize: 8,
                      showSizeChanger: false,
                      showQuickJumper: true,
                      showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条记录`
                    }}
                    size="middle"
                    rowKey={(record) => `${record.studentId}-${record.rank}`}
                    style={{ 
                      background: 'white',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}
                  />
                </div>
              )
            )}
          </ProCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default ScoreStatistics; 