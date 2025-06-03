import { PlusOutlined, DeleteOutlined, EditOutlined, EyeOutlined, BookOutlined, ClockCircleOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Tag, Typography, Badge } from 'antd';
import React, { useRef, useState } from 'react';
import { history } from '@umijs/max';
import {
  listCourseByPageUsingPOST,
  deleteCourseUsingPOST,
} from '@/services/backend/courseController';

const { Text } = Typography;

/**
 * 课程列表页面
 */
const CourseList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const actionRef = useRef<ActionType>();

  /**
   * 删除课程
   */
  const handleDelete = async (record: API.Course) => {
    if (!record.id) return;
    
    setLoading(true);
    try {
      const res = await deleteCourseUsingPOST({
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
   * 课程类型格式化
   */
  const formatCourseType = (type: string) => {
    const typeConfig = {
      '必修': { color: '#f50', icon: '⭐', bgColor: '#fff2e8', textColor: '#d4380d' },
      '选修': { color: '#2db7f5', icon: '📖', bgColor: '#e6f7ff', textColor: '#1677ff' },
      '实践': { color: '#87d068', icon: '🔬', bgColor: '#f6ffed', textColor: '#389e0d' },
      '通识': { color: '#722ed1', icon: '💡', bgColor: '#f9f0ff', textColor: '#531dab' },
    };
    
    const config = typeConfig[type as keyof typeof typeConfig] || {
      color: '#d9d9d9',
      icon: '📚',
      bgColor: '#fafafa',
      textColor: '#666'
    };
    
    return (
      <Tag 
        style={{
          borderRadius: '16px',
          padding: '2px 12px',
          background: config.bgColor,
          border: `1px solid ${config.color}`,
          fontWeight: 'bold',
          color: config.textColor
        }}
      >
        {config.icon} {type}
      </Tag>
    );
  };

  /**
   * 学分显示
   */
  const formatCredit = (credit: number) => {
    return (
      <Badge 
        count={`${credit}学分`} 
        style={{ 
          backgroundColor: '#52c41a',
          fontWeight: 'bold',
          borderRadius: '12px'
        }} 
      />
    );
  };

  const columns: ProColumns<API.Course>[] = [
    {
      title: '课程信息',
      dataIndex: 'courseName',
      width: 250,
      search: true,
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>
            <BookOutlined style={{ color: '#1890ff', marginRight: '6px' }} />
            {record.courseName}
          </div>
          <Text type="secondary" style={{ fontSize: '12px', fontFamily: 'monospace' }}>
            {record.courseCode}
          </Text>
        </div>
      ),
    },
    {
      title: '课程类型',
      dataIndex: 'courseType',
      width: 120,
      render: (_, record) => formatCourseType(record.courseType || ''),
      valueEnum: {
        '必修': { text: '必修' },
        '选修': { text: '选修' },
        '实践': { text: '实践' },
        '通识': { text: '通识' },
      },
    },
    {
      title: '学分课时',
      dataIndex: 'credit',
      width: 120,
      search: false,
      render: (_, record) => (
        <div style={{ textAlign: 'center' }}>
          {formatCredit(record.credit || 0)}
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            <ClockCircleOutlined style={{ marginRight: '4px' }} />
            {record.courseHour}课时
          </div>
        </div>
      ),
    },
    {
      title: '开课信息',
      dataIndex: 'department',
      width: 180,
      search: true,
      render: (_, record) => (
        <div>
          <div style={{ marginBottom: '4px' }}>
            <HomeOutlined style={{ color: '#722ed1', marginRight: '4px' }} />
            <Text strong>{record.department}</Text>
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            📅 {record.semester}
          </div>
        </div>
      ),
    },
    {
      title: '授课安排',
      dataIndex: 'courseTime',
      width: 200,
      search: false,
      render: (_, record) => (
        <div>
          <div style={{ marginBottom: '4px' }}>
            <ClockCircleOutlined style={{ color: '#fa8c16', marginRight: '4px' }} />
            <Text>{record.courseTime}</Text>
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            📍 {record.location}
          </div>
        </div>
      ),
    },
    {
      title: '容量',
      dataIndex: 'maxStudent',
      width: 100,
      search: false,
      render: (maxStudent) => (
        <div style={{ textAlign: 'center' }}>
          <Badge 
            count={maxStudent} 
            style={{ 
              backgroundColor: '#1890ff',
              fontWeight: 'bold'
            }}
            overflowCount={999}
          />
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            <UserOutlined /> 人
          </div>
        </div>
      ),
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
                history.push(`/course/detail/${record.id}`);
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
                history.push(`/course/edit/${record.id}`);
              }
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除该课程吗？"
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
            <BookOutlined style={{ color: '#1890ff' }} />
            <span>课程信息管理</span>
          </Space>
        ),
        subTitle: '管理课程基本信息、开课安排和容量限制',
      }}
    >
      <ProTable<API.Course>
        headerTitle={
          <Space>
            <BookOutlined style={{ color: '#52c41a' }} />
            <span style={{ fontWeight: 'bold' }}>课程信息列表</span>
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
              history.push('/course/add');
            }}
          >
            新增课程
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          try {
            const sortField = Object.keys(sort)?.[0];
            const sortOrder = sort?.[sortField] ?? undefined;

            const { data, code } = await listCourseByPageUsingPOST({
              ...params,
              sortField,
              sortOrder,
              ...filter,
            } as API.CourseQueryRequest);

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

export default CourseList; 