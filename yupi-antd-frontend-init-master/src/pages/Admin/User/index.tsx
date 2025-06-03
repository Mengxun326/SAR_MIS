import CreateModal from '@/pages/Admin/User/components/CreateModal';
import UpdateModal from '@/pages/Admin/User/components/UpdateModal';
import { deleteUserUsingPost, listUserByPageUsingPost } from '@/services/backend/userController';
import { PlusOutlined, DeleteOutlined, EditOutlined, UserOutlined, CrownOutlined, TeamOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Space, Typography, Popconfirm, Tag, Avatar, Badge } from 'antd';
import React, { useRef, useState } from 'react';

const { Text } = Typography;

/**
 * 用户管理页面
 *
 * @constructor
 */
const UserAdminPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.User>();

  /**
   * 删除用户
   *
   * @param row
   */
  const handleDelete = async (row: API.User) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      const res = await deleteUserUsingPost({
        id: row.id as any,
      });
      hide();
      if (res.code === 0) {
        message.success('删除成功');
        actionRef?.current?.reload();
      } else {
        message.error('删除失败：' + res.message);
      }
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败，请稍后重试');
      return false;
    }
  };

  /**
   * 角色标签渲染
   */
  const renderUserRole = (userRole: string) => {
    const roleConfig = {
      admin: { color: '#f50', text: '管理员', icon: '👑', bgColor: '#fff2e8', textColor: '#d4380d' },
      teacher: { color: '#1890ff', text: '教师', icon: '👩‍🏫', bgColor: '#e6f7ff', textColor: '#1677ff' },
      student: { color: '#52c41a', text: '学生', icon: '🎓', bgColor: '#f6ffed', textColor: '#389e0d' },
      user: { color: '#d9d9d9', text: '普通用户', icon: '👤', bgColor: '#fafafa', textColor: '#666' },
    };
    const config = roleConfig[userRole as keyof typeof roleConfig] || { 
      color: '#d9d9d9', 
      text: userRole, 
      icon: '👤',
      bgColor: '#fafafa',
      textColor: '#666'
    };
    
    return (
      <Tag 
        style={{
          borderRadius: '16px',
          padding: '4px 12px',
          background: config.bgColor,
          border: `1px solid ${config.color}`,
          fontWeight: 'bold',
          color: config.textColor
        }}
      >
        {config.icon} {config.text}
      </Tag>
    );
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.User>[] = [
    {
      title: '用户信息',
      dataIndex: 'userAccount',
      width: 280,
      search: true,
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar 
            size={48}
            src={record.userAvatar}
            style={{ 
              backgroundColor: '#1890ff',
              fontWeight: 'bold',
              border: '2px solid #e6f7ff'
            }}
            icon={<UserOutlined />}
          >
            {record.userName?.charAt(0) || record.userAccount?.charAt(0)}
          </Avatar>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>
              {record.userName || '未设置昵称'}
            </div>
            <Text type="secondary" style={{ fontSize: '12px', fontFamily: 'monospace' }}>
              @{record.userAccount}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
      hideInForm: true,
      hideInSearch: true,
      render: (id) => (
        <Badge 
          count={id} 
          style={{ 
            backgroundColor: '#722ed1',
            fontWeight: 'bold',
            borderRadius: '12px'
          }}
          overflowCount={99999}
        />
      ),
    },
    {
      title: '用户角色',
      dataIndex: 'userRole',
      width: 140,
      render: (_, record) => renderUserRole(record.userRole || 'user'),
      valueEnum: {
        admin: {
          text: '管理员',
          status: 'Error',
        },
        teacher: {
          text: '教师',
          status: 'Processing',
        },
        student: {
          text: '学生',
          status: 'Success',
        },
        user: {
          text: '普通用户',
          status: 'Default',
        },
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '用户角色为必填项',
          },
        ],
      },
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      width: 160,
      render: (createTime) => (
        <Text style={{ color: '#666', fontSize: '12px' }}>
          {createTime}
        </Text>
      ),
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      width: 160,
      render: (updateTime) => (
        <Text style={{ color: '#666', fontSize: '12px' }}>
          {updateTime}
        </Text>
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <Space size="small">
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
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除此用户吗？"
            description="删除后将无法恢复，请谨慎操作。"
            onConfirm={() => handleDelete(record)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="primary"
              size="small"
              danger
              icon={<DeleteOutlined />}
              style={{ borderRadius: '6px' }}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
    // 隐藏的表单字段
    {
      title: '用户账号',
      dataIndex: 'userAccount',
      valueType: 'text',
      hideInTable: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '用户账号为必填项',
          },
          {
            min: 4,
            max: 16,
            message: '账号长度在4-16位之间',
          },
        ],
      },
    },
    {
      title: '用户昵称',
      dataIndex: 'userName',
      valueType: 'text',
      hideInTable: true,
      formItemProps: {
        rules: [
          {
            max: 50,
            message: '用户昵称不能超过50个字符',
          },
        ],
      },
    },
    {
      title: '头像',
      dataIndex: 'userAvatar',
      valueType: 'avatar',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '用户密码',
      dataIndex: 'userPassword',
      valueType: 'password',
      hideInTable: true,
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '用户密码为必填项',
          },
          {
            min: 6,
            max: 20,
            message: '密码长度在6-20位之间',
          },
        ],
      },
    },
    {
      title: '确认密码',
      dataIndex: 'checkPassword',
      valueType: 'password',
      hideInTable: true,
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '确认密码为必填项',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('userPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次输入的密码不一致'));
            },
          }),
        ],
      },
    },
  ];

  return (
    <PageContainer
      header={{
        title: (
          <Space>
            <CrownOutlined style={{ color: '#1890ff' }} />
            <span>用户管理</span>
          </Space>
        ),
        subTitle: '管理系统用户账号、权限和基本信息',
      }}
    >
      <ProTable<API.User>
        headerTitle={
          <Space>
            <TeamOutlined style={{ color: '#52c41a' }} />
            <span style={{ fontWeight: 'bold' }}>系统用户列表</span>
          </Space>
        }
        actionRef={actionRef}
        rowKey="id"
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
              setCreateModalVisible(true);
            }}
          >
            新增用户
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          try {
            const sortField = Object.keys(sort)?.[0];
            const sortOrder = sort?.[sortField] ?? undefined;

            const { data, code } = await listUserByPageUsingPost({
              ...params,
              sortField,
              sortOrder,
              ...filter,
            } as API.UserQueryRequest);

            if (code === 0) {
              return {
                success: true,
                data: data?.records || [],
                total: Number(data?.total) || 0,
              };
            } else {
              message.error('获取用户列表失败');
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
        scroll={{ x: 1000 }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => 
            `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`,
        }}
      />
      <CreateModal
        visible={createModalVisible}
        columns={columns}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
      />
      <UpdateModal
        visible={updateModalVisible}
        columns={columns}
        oldData={currentRow}
        onSubmit={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
      />
    </PageContainer>
  );
};

export default UserAdminPage;
