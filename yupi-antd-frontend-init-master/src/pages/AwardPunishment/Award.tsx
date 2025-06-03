import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable, ModalForm, ProFormText, ProFormSelect, ProFormDatePicker, ProFormDigit, ProFormTextArea } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, message, Popconfirm, Space, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import {
  listStudentAwardByPageUsingPOST,
  deleteStudentAwardUsingPOST,
  addStudentAwardUsingPOST,
  updateStudentAwardUsingPOST,
} from '@/services/backend/studentAwardController';

const AwardManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<API.StudentAward>();

  // 删除奖励记录
  const handleDelete = async (id: string) => {
    try {
      await deleteStudentAwardUsingPOST({ id });
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('删除失败');
    }
  };

  // 添加奖励记录
  const handleAdd = async (values: API.StudentAwardAddRequest) => {
    try {
      await addStudentAwardUsingPOST(values);
      message.success('添加成功');
      setCreateModalVisible(false);
      actionRef.current?.reload();
    } catch (error) {
      message.error('添加失败');
    }
  };

  // 编辑奖励记录
  const handleEdit = async (values: API.StudentAwardUpdateRequest) => {
    try {
      await updateStudentAwardUsingPOST({ ...values, id: currentRecord?.id });
      message.success('更新成功');
      setEditModalVisible(false);
      actionRef.current?.reload();
    } catch (error) {
      message.error('更新失败');
    }
  };

  const columns: ProColumns<API.StudentAward>[] = [
    {
      title: '学号',
      dataIndex: 'studentId',
      key: 'studentId',
      width: 120,
    },
    {
      title: '奖励名称',
      dataIndex: 'awardName',
      key: 'awardName',
      width: 200,
    },
    {
      title: '奖励等级',
      dataIndex: 'awardLevel',
      key: 'awardLevel',
      width: 120,
      valueEnum: {
        '国家级': { text: '国家级', status: 'Success' },
        '省级': { text: '省级', status: 'Processing' },
        '市级': { text: '市级', status: 'Warning' },
        '校级': { text: '校级', status: 'Default' },
      },
    },
    {
      title: '奖励日期',
      dataIndex: 'awardDate',
      key: 'awardDate',
      width: 120,
      valueType: 'date',
    },
    {
      title: '奖励金额',
      dataIndex: 'awardAmount',
      key: 'awardAmount',
      width: 120,
      render: (_, record) => {
        const amount = record.awardAmount;
        return amount ? `¥${amount}` : '-';
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      ellipsis: true,
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
            title="确定要删除这条奖励记录吗？"
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
      <ProTable<API.StudentAward, API.StudentAwardQueryRequest>
        headerTitle="奖励管理"
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
          const res = await listStudentAwardByPageUsingPOST({
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

      {/* 添加奖励记录弹窗 */}
      <ModalForm
        title="添加奖励记录"
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
        <ProFormText
          name="awardName"
          label="奖励名称"
          rules={[{ required: true, message: '请输入奖励名称' }]}
          placeholder="请输入奖励名称"
        />
        <ProFormSelect
          name="awardLevel"
          label="奖励等级"
          rules={[{ required: true, message: '请选择奖励等级' }]}
          options={[
            { label: '国家级', value: '国家级' },
            { label: '省级', value: '省级' },
            { label: '市级', value: '市级' },
            { label: '校级', value: '校级' },
          ]}
          placeholder="请选择奖励等级"
        />
        <ProFormDatePicker
          name="awardDate"
          label="奖励日期"
          rules={[{ required: true, message: '请选择奖励日期' }]}
        />
        <ProFormDigit
          name="awardAmount"
          label="奖励金额"
          min={0}
          placeholder="请输入奖励金额"
          fieldProps={{ precision: 2 }}
        />
        <ProFormTextArea
          name="description"
          label="描述"
          placeholder="请输入描述"
        />
      </ModalForm>

      {/* 编辑奖励记录弹窗 */}
      <ModalForm
        title="编辑奖励记录"
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
        <ProFormText
          name="awardName"
          label="奖励名称"
          rules={[{ required: true, message: '请输入奖励名称' }]}
          placeholder="请输入奖励名称"
        />
        <ProFormSelect
          name="awardLevel"
          label="奖励等级"
          rules={[{ required: true, message: '请选择奖励等级' }]}
          options={[
            { label: '国家级', value: '国家级' },
            { label: '省级', value: '省级' },
            { label: '市级', value: '市级' },
            { label: '校级', value: '校级' },
          ]}
          placeholder="请选择奖励等级"
        />
        <ProFormDatePicker
          name="awardDate"
          label="奖励日期"
          rules={[{ required: true, message: '请选择奖励日期' }]}
        />
        <ProFormDigit
          name="awardAmount"
          label="奖励金额"
          min={0}
          placeholder="请输入奖励金额"
          fieldProps={{ precision: 2 }}
        />
        <ProFormTextArea
          name="description"
          label="描述"
          placeholder="请输入描述"
        />
      </ModalForm>
    </PageContainer>
  );
};

export default AwardManagement; 