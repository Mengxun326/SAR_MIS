import { PlusOutlined, DeleteOutlined, EditOutlined, EyeOutlined, UserOutlined, TeamOutlined, BookOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Tag, Avatar, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { history } from '@umijs/max';
import {
  listStudentByPageUsingPost,
  deleteStudentUsingPost,
} from '@/services/backend/studentController';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import { PAGE_TITLES } from '@/constants/pageTitles';

const { Text } = Typography;

/**
 * 学生列表页面
 */
const StudentList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const actionRef = useRef<ActionType>();

  // 设置页面标题
  useDocumentTitle(PAGE_TITLES.STUDENT_LIST);

  /**
   * 删除学生
   */
  const handleDelete = async (record: API.Student) => {
    if (!record.id) return;
    
    setLoading(true);
    try {
      const res = await deleteStudentUsingPost({
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
   * 性别格式化
   */
  const formatGender = (gender: number) => {
    return gender === 1 ? (
      <Tag 
        style={{ 
          borderRadius: '12px',
          background: '#e6f7ff',
          border: '1px solid #1890ff',
          color: '#1677ff',
          fontWeight: 'bold'
        }}
      >
        👨 男
      </Tag>
    ) : (
      <Tag 
        style={{ 
          borderRadius: '12px',
          background: '#fff0f6',
          border: '1px solid #eb2f96',
          color: '#c41d7f',
          fontWeight: 'bold'
        }}
      >
        👩 女
      </Tag>
    );
  };

  /**
   * 学籍状态格式化
   */
  const formatStatus = (status: string) => {
    const statusConfig = {
      '在读': { color: '#52c41a', icon: '📚', bgColor: '#f6ffed', textColor: '#389e0d' },
      '休学': { color: '#faad14', icon: '⏸️', bgColor: '#fffbe6', textColor: '#d48806' },
      '退学': { color: '#ff4d4f', icon: '🚪', bgColor: '#fff2f0', textColor: '#cf1322' },
      '毕业': { color: '#1890ff', icon: '🎓', bgColor: '#f0f5ff', textColor: '#1677ff' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || {
      color: '#d9d9d9',
      icon: '❓',
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
        {config.icon} {status}
      </Tag>
    );
  };

  const columns: ProColumns<API.Student>[] = [
    {
      title: '基本信息',
      dataIndex: 'name',
      width: 200,
      search: true,
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar 
            size={40}
            style={{ 
              backgroundColor: record.gender === 1 ? '#1890ff' : '#eb2f96',
              fontWeight: 'bold'
            }}
            icon={<UserOutlined />}
          >
            {record.name?.charAt(0)}
          </Avatar>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
              {record.name}
            </div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {record.studentId}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: '性别',
      dataIndex: 'gender',
      width: 80,
      render: (_, record) => formatGender(record.gender || 0),
      valueEnum: {
        0: { text: '女' },
        1: { text: '男' },
      },
    },
    {
      title: '专业班级',
      dataIndex: 'major',
      width: 200,
      search: true,
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: '500', marginBottom: '4px' }}>
            <BookOutlined style={{ color: '#1890ff', marginRight: '4px' }} />
            {record.major}
          </div>
          <div style={{ color: '#666', fontSize: '12px' }}>
            <TeamOutlined style={{ marginRight: '4px' }} />
            {record.className}
          </div>
        </div>
      ),
    },
    {
      title: '学籍状态',
      dataIndex: 'status',
      width: 120,
      render: (_, record) => formatStatus(record.status || ''),
      valueEnum: {
        '在读': { text: '在读', status: 'Success' },
        '休学': { text: '休学', status: 'Warning' },
        '退学': { text: '退学', status: 'Error' },
        '毕业': { text: '毕业', status: 'Processing' },
      },
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
      width: 140,
      search: false,
      render: (phone) => (
        <Text copyable style={{ fontFamily: 'monospace' }}>
          {phone}
        </Text>
      ),
    },
    {
      title: '入学日期',
      dataIndex: 'enrollmentDate',
      width: 120,
      valueType: 'date',
      search: false,
      render: (date) => (
        <Text style={{ color: '#666' }}>
          {date}
        </Text>
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (record.studentId) {
                history.push(`/student/detail/${record.studentId}`);
              } else {
                message.error('学生学号不存在，无法查看详情');
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (record.studentId) {
                history.push(`/student/edit/${record.studentId}`);
              } else {
                message.error('学生学号不存在，无法编辑');
              }
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除该学生信息吗？"
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
            <UserOutlined style={{ color: '#1890ff' }} />
            <span>学生信息管理</span>
          </Space>
        ),
        subTitle: '管理学生基本信息、学籍状态和联系方式',
      }}
    >
      <ProTable<API.Student>
        headerTitle={
          <Space>
            <TeamOutlined style={{ color: '#52c41a' }} />
            <span style={{ fontWeight: 'bold' }}>学生信息列表</span>
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
              history.push('/student/add');
            }}
          >
            新增学生
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          console.log('Table request params:', params, sort, filter);
          try {
            const sortField = Object.keys(sort)?.[0];
            const sortOrder = sort?.[sortField] ?? undefined;

            const { data, code } = await listStudentByPageUsingPost({
              ...params,
              sortField,
              sortOrder,
              ...filter,
            } as API.StudentQueryRequest);

            if (code === 0) {
              console.log('API返回数据:', data);
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

export default StudentList; 