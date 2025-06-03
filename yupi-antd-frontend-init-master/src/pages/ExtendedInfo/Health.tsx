import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable, ModalForm, ProFormText, ProFormSelect, ProFormDigit, ProFormDatePicker } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, message, Popconfirm, Space, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import {
  listStudentHealthByPageUsingPOST,
  deleteStudentHealthUsingPOST,
  addStudentHealthUsingPOST,
  updateStudentHealthUsingPOST,
} from '@/services/backend/studentHealthController';

const HealthManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<API.StudentHealth>();

  // 删除健康信息
  const handleDelete = async (id: string) => {
    try {
      await deleteStudentHealthUsingPOST({ id });
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('删除失败');
    }
  };

  // 添加健康信息
  const handleAdd = async (values: API.StudentHealthAddRequest) => {
    try {
      await addStudentHealthUsingPOST(values);
      message.success('添加成功');
      setCreateModalVisible(false);
      actionRef.current?.reload();
    } catch (error) {
      message.error('添加失败');
    }
  };

  // 编辑健康信息
  const handleEdit = async (values: API.StudentHealthUpdateRequest) => {
    try {
      await updateStudentHealthUsingPOST({ ...values, id: currentRecord?.id });
      message.success('更新成功');
      setEditModalVisible(false);
      actionRef.current?.reload();
    } catch (error) {
      message.error('更新失败');
    }
  };

  const columns: ProColumns<API.StudentHealth>[] = [
    {
      title: '学号',
      dataIndex: 'studentId',
      key: 'studentId',
      width: 120,
    },
    {
      title: '身高(cm)',
      dataIndex: 'height',
      key: 'height',
      width: 100,
    },
    {
      title: '体重(kg)',
      dataIndex: 'weight',
      key: 'weight',
      width: 100,
    },
    {
      title: '视力',
      dataIndex: 'vision',
      key: 'vision',
      width: 120,
    },
    {
      title: '血型',
      dataIndex: 'bloodType',
      key: 'bloodType',
      width: 100,
      valueEnum: {
        'A': { text: 'A型', status: 'Default' },
        'B': { text: 'B型', status: 'Default' },
        'AB': { text: 'AB型', status: 'Default' },
        'O': { text: 'O型', status: 'Default' },
        '未知': { text: '未知', status: 'Warning' },
      },
    },
    {
      title: '体检日期',
      dataIndex: 'checkDate',
      key: 'checkDate',
      width: 120,
      valueType: 'date',
    },
    {
      title: '健康状况',
      dataIndex: 'healthStatus',
      key: 'healthStatus',
      width: 120,
      render: (_, record) => {
        const status = record.healthStatus;
        if (status === '健康') return <Tag color="green">健康</Tag>;
        if (status === '良好') return <Tag color="blue">良好</Tag>;
        if (status === '一般') return <Tag color="orange">一般</Tag>;
        if (status === '较差') return <Tag color="red">较差</Tag>;
        return <Tag>{status}</Tag>;
      },
      valueEnum: {
        '健康': { text: '健康', status: 'Success' },
        '良好': { text: '良好', status: 'Processing' },
        '一般': { text: '一般', status: 'Warning' },
        '较差': { text: '较差', status: 'Error' },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 150,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 150,
      render: (text, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            onClick={() => {
              setCurrentRecord(record);
              setEditModalVisible(true);
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这条健康信息吗？"
            onConfirm={() => handleDelete(record.id!)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" size="small" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.StudentHealth, API.StudentHealthQueryRequest>
        headerTitle="健康信息管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => setCreateModalVisible(true)}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params) => {
          const res = await listStudentHealthByPageUsingPOST({
            ...params,
            current: params.current,
            pageSize: params.pageSize,
          });
          return {
            data: res?.data?.records || [],
            success: res?.code === 0,
            total: Number(res?.data?.total) || 0,
          };
        }}
        columns={columns}
        pagination={{
          defaultPageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
        }}
      />

      {/* 添加健康信息弹窗 */}
      <ModalForm
        title="添加健康信息"
        visible={createModalVisible}
        onVisibleChange={setCreateModalVisible}
        onFinish={handleAdd}
      >
        <ProFormText
          name="studentId"
          label="学号"
          rules={[{ required: true, message: '请输入学号' }]}
          placeholder="请输入学号"
        />
        <ProFormDigit
          name="height"
          label="身高(cm)"
          min={0}
          max={300}
          placeholder="请输入身高"
          fieldProps={{ precision: 1 }}
        />
        <ProFormDigit
          name="weight"
          label="体重(kg)"
          min={0}
          max={300}
          placeholder="请输入体重"
          fieldProps={{ precision: 1 }}
        />
        <ProFormText
          name="vision"
          label="视力"
          placeholder="例如：左眼5.0 右眼4.8"
        />
        <ProFormSelect
          name="bloodType"
          label="血型"
          options={[
            { label: 'A型', value: 'A' },
            { label: 'B型', value: 'B' },
            { label: 'AB型', value: 'AB' },
            { label: 'O型', value: 'O' },
            { label: '未知', value: '未知' },
          ]}
          placeholder="请选择血型"
        />
        <ProFormDatePicker
          name="checkDate"
          label="体检日期"
          rules={[{ required: true, message: '请选择体检日期' }]}
        />
        <ProFormSelect
          name="healthStatus"
          label="健康状况"
          rules={[{ required: true, message: '请选择健康状况' }]}
          options={[
            { label: '健康', value: '健康' },
            { label: '良好', value: '良好' },
            { label: '一般', value: '一般' },
            { label: '较差', value: '较差' },
          ]}
          placeholder="请选择健康状况"
        />
      </ModalForm>

      {/* 编辑健康信息弹窗 */}
      <ModalForm
        title="编辑健康信息"
        visible={editModalVisible}
        onVisibleChange={setEditModalVisible}
        onFinish={handleEdit}
        initialValues={currentRecord}
      >
        <ProFormText
          name="studentId"
          label="学号"
          rules={[{ required: true, message: '请输入学号' }]}
          placeholder="请输入学号"
        />
        <ProFormDigit
          name="height"
          label="身高(cm)"
          min={0}
          max={300}
          placeholder="请输入身高"
          fieldProps={{ precision: 1 }}
        />
        <ProFormDigit
          name="weight"
          label="体重(kg)"
          min={0}
          max={300}
          placeholder="请输入体重"
          fieldProps={{ precision: 1 }}
        />
        <ProFormText
          name="vision"
          label="视力"
          placeholder="例如：左眼5.0 右眼4.8"
        />
        <ProFormSelect
          name="bloodType"
          label="血型"
          options={[
            { label: 'A型', value: 'A' },
            { label: 'B型', value: 'B' },
            { label: 'AB型', value: 'AB' },
            { label: 'O型', value: 'O' },
            { label: '未知', value: '未知' },
          ]}
          placeholder="请选择血型"
        />
        <ProFormDatePicker
          name="checkDate"
          label="体检日期"
          rules={[{ required: true, message: '请选择体检日期' }]}
        />
        <ProFormSelect
          name="healthStatus"
          label="健康状况"
          rules={[{ required: true, message: '请选择健康状况' }]}
          options={[
            { label: '健康', value: '健康' },
            { label: '良好', value: '良好' },
            { label: '一般', value: '一般' },
            { label: '较差', value: '较差' },
          ]}
          placeholder="请选择健康状况"
        />
      </ModalForm>
    </PageContainer>
  );
};

export default HealthManagement; 