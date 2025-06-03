import { PlusOutlined, DeleteOutlined, EditOutlined, EyeOutlined, TrophyOutlined, UserOutlined, BookOutlined, CalendarOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Tag, Typography, Progress, Badge } from 'antd';
import React, { useRef, useState } from 'react';
import { history } from '@umijs/max';
import {
  listStudentScoreByPageUsingPOST,
  deleteStudentScoreUsingPOST,
} from '@/services/backend/studentScoreController';

const { Text } = Typography;

/**
 * 成绩列表页面
 */
const ScoreList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const actionRef = useRef<ActionType>();

  /**
   * 删除成绩
   */
  const handleDelete = async (record: API.StudentScore) => {
    if (!record.id) return;
    
    setLoading(true);
    try {
      const res = await deleteStudentScoreUsingPOST({
        id: record.id,
      });
      if (res.code === 0) {
        message.success('删除成功');
        actionRef.current?.reload();
      } else {
        message.error('删除失败：' + res.message);
      }
    } catch (error) {
      message.error('删除失败');
    }
    setLoading(false);
  };

  /**
   * 成绩等级格式化
   */
  const formatScoreLevel = (score: number) => {
    if (score >= 90) {
      return {
        level: '优秀',
        color: '#52c41a',
        icon: '🏆',
        bgColor: '#f6ffed',
        textColor: '#389e0d'
      };
    } else if (score >= 80) {
      return {
        level: '良好',
        color: '#1890ff',
        icon: '👍',
        bgColor: '#f0f5ff',
        textColor: '#1677ff'
      };
    } else if (score >= 70) {
      return {
        level: '中等',
        color: '#faad14',
        icon: '📚',
        bgColor: '#fffbe6',
        textColor: '#d48806'
      };
    } else if (score >= 60) {
      return {
        level: '及格',
        color: '#fa8c16',
        icon: '✅',
        bgColor: '#fff7e6',
        textColor: '#d46b08'
      };
    } else {
      return {
        level: '不及格',
        color: '#ff4d4f',
        icon: '❌',
        bgColor: '#fff2f0',
        textColor: '#cf1322'
      };
    }
  };

  /**
   * 考试类型格式化
   */
  const formatExamType = (type: string) => {
    const typeConfig = {
      '正常': { color: '#52c41a', icon: '📝', bgColor: '#f6ffed', textColor: '#389e0d' },
      '补考': { color: '#faad14', icon: '📋', bgColor: '#fffbe6', textColor: '#d48806' },
      '重修': { color: '#ff4d4f', icon: '🔄', bgColor: '#fff2f0', textColor: '#cf1322' },
    };
    
    const config = typeConfig[type as keyof typeof typeConfig] || {
      color: '#d9d9d9',
      icon: '📄',
      bgColor: '#fafafa',
      textColor: '#666'
    };
    
    return (
      <Tag 
        style={{ 
          borderRadius: '12px',
          background: config.bgColor,
          border: `1px solid ${config.color}`,
          color: config.textColor,
          fontWeight: 'bold'
        }}
      >
        {config.icon} {type}
      </Tag>
    );
  };

  const columns: ProColumns<API.StudentScore>[] = [
    {
      title: '学生信息',
      dataIndex: 'studentId',
      width: 180,
      search: true,
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>
            <UserOutlined style={{ color: '#1890ff', marginRight: '6px' }} />
            {record.studentId}
          </div>
        </div>
      ),
    },
    {
      title: '课程信息',
      dataIndex: 'courseCode',
      width: 180,
      search: true,
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>
            <BookOutlined style={{ color: '#722ed1', marginRight: '6px' }} />
            {record.courseCode}
          </div>
        </div>
      ),
    },
    {
      title: '成绩详情',
      dataIndex: 'score',
      width: 200,
      search: false,
      render: (_, record) => {
        const scoreValue = record.score || 0;
        const levelInfo = formatScoreLevel(scoreValue);
        
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: levelInfo.color,
              marginBottom: '8px'
            }}>
              {scoreValue}
            </div>
            <Tag 
              style={{
                borderRadius: '16px',
                padding: '2px 12px',
                background: levelInfo.bgColor,
                border: `1px solid ${levelInfo.color}`,
                fontWeight: 'bold',
                color: levelInfo.textColor
              }}
            >
              {levelInfo.icon} {levelInfo.level}
            </Tag>
            <Progress
              percent={scoreValue}
              strokeColor={levelInfo.color}
              size="small"
              style={{ marginTop: '8px' }}
              showInfo={false}
            />
          </div>
        );
      },
    },
    {
      title: '绩点',
      dataIndex: 'gradePoint',
      width: 100,
      search: false,
      render: (_, record) => {
        const gradePoint = record.gradePoint;
        return (
          <div style={{ textAlign: 'center' }}>
            <Badge 
              count={typeof gradePoint === 'number' ? gradePoint.toFixed(1) : '0.0'} 
              style={{ 
                backgroundColor: (typeof gradePoint === 'number' ? gradePoint : 0) >= 3.0 ? '#52c41a' : '#fa8c16',
                fontWeight: 'bold',
                borderRadius: '12px'
              }} 
            />
          </div>
        );
      },
    },
    {
      title: '学期',
      dataIndex: 'semester',
      width: 140,
      search: true,
      render: (semester) => (
        <div style={{ textAlign: 'center' }}>
          <CalendarOutlined style={{ color: '#1890ff', marginRight: '6px' }} />
          <Text strong>{semester}</Text>
        </div>
      ),
    },
    {
      title: '考试类型',
      dataIndex: 'examType',
      width: 120,
      render: (_, record) => formatExamType(record.examType || ''),
      valueEnum: {
        '正常': { text: '正常' },
        '补考': { text: '补考' },
        '重修': { text: '重修' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 220,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            style={{
              background: 'linear-gradient(90deg, #1890ff, #36cfc9)',
              border: 'none',
              borderRadius: '6px'
            }}
            onClick={() => {
              if (record.id) {
                history.push(`/score/detail/${record.id}`);
              }
            }}
          >
            查看
          </Button>
          <Button
            type="default"
            size="small"
            icon={<EditOutlined />}
            style={{
              background: 'linear-gradient(90deg, #52c41a, #73d13d)',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              fontWeight: 'bold'
            }}
            onClick={() => {
              if (record.id) {
                history.push(`/score/edit/${record.id}`);
              }
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除该成绩记录吗？"
            description="删除后将无法恢复，请谨慎操作。"
            onConfirm={() => handleDelete(record)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="primary"
              size="small"
              icon={<DeleteOutlined />}
              danger
              loading={loading}
              style={{ borderRadius: '6px' }}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: (
          <Space>
            <TrophyOutlined style={{ color: '#1890ff' }} />
            <span>成绩信息管理</span>
          </Space>
        ),
        subTitle: '管理学生成绩记录、绩点计算和等级评定',
      }}
    >
      <ProTable<API.StudentScore>
        headerTitle={
          <Space>
            <TrophyOutlined style={{ color: '#52c41a' }} />
            <span style={{ fontWeight: 'bold' }}>成绩信息列表</span>
          </Space>
        }
        actionRef={actionRef}
        rowKey={(record) => String(record.id)}
        search={{
          labelWidth: 120,
          defaultCollapsed: false,
          style: {
            background: '#fafafa',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px'
          }
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            icon={<PlusOutlined />}
            style={{
              background: 'linear-gradient(90deg, #1890ff, #722ed1)',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}
            onClick={() => {
              history.push('/score/add');
            }}
          >
            录入成绩
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          try {
            const sortField = Object.keys(sort)?.[0];
            const sortOrder = sort?.[sortField] ?? undefined;

            const { data, code } = await listStudentScoreByPageUsingPOST({
              ...params,
              sortField,
              sortOrder,
              ...filter,
            } as API.StudentScoreQueryRequest);

            if (code === 0) {
              return {
                success: true,
                data: data?.records || [],
                total: Number(data?.total) || 0,
              };
            } else {
              message.error('获取数据失败');
              return {
                success: false,
                data: [],
                total: 0,
              };
            }
          } catch (error) {
            console.error('请求失败:', error);
            message.error('请求失败');
            return {
              success: false,
              data: [],
              total: 0,
            };
          }
        }}
        columns={columns}
        rowSelection={false}
        style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
        scroll={{ x: 1200 }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => 
            `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`,
        }}
      />
    </PageContainer>
  );
};

export default ScoreList; 