import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable, ModalForm, ProFormText, ProFormSelect, ProFormDatePicker, ProFormDigit, ProFormTextArea } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, message, Popconfirm, Space, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import {
  listStudentPunishmentByPageUsingPOST,
  deleteStudentPunishmentUsingPOST,
  addStudentPunishmentUsingPOST,
  updateStudentPunishmentUsingPOST,
  revokeStudentPunishmentUsingPOST,
} from '@/services/backend/studentPunishmentController';

const PunishmentManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<API.StudentPunishment>();

  // 删除处分记录
  const handleDelete = async (id: string) => {
    try {
      await deleteStudentPunishmentUsingPOST({ id });
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('删除失败');
    }
  };

  // 撤销处分
  const handleRevoke = async (id: string) => {
    try {
      await revokeStudentPunishmentUsingPOST({ id });
      message.success('撤销处分成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('撤销处分失败');
    }
  };

  // 添加处分记录
  const handleAdd = async (values: API.StudentPunishmentAddRequest) => {
    try {
      await addStudentPunishmentUsingPOST(values);
      message.success('添加成功');
      setCreateModalVisible(false);
      actionRef.current?.reload();
    } catch (error) {
      message.error('添加失败');
    }
  };

  // 编辑处分记录
  const handleEdit = async (values: API.StudentPunishmentUpdateRequest) => {
    try {
      await updateStudentPunishmentUsingPOST({ ...values, id: currentRecord?.id });
      message.success('更新成功');
      setEditModalVisible(false);
      actionRef.current?.reload();
    } catch (error) {
      message.error('更新失败');
    }
  };

  const columns: ProColumns<API.StudentPunishment>[] = [
    {
      title: '学号',
      dataIndex: 'studentId',
      key: 'studentId',
      width: 120,
    },
    {
      title: '处分类型',
      dataIndex: 'punishmentType',
      key: 'punishmentType',
      width: 120,
      valueEnum: {
        '警告': { text: '警告', status: 'Warning' },
        '严重警告': { text: '严重警告', status: 'Error' },
        '记过': { text: '记过', status: 'Error' },
        '留校察看': { text: '留校察看', status: 'Error' },
        '开除学籍': { text: '开除学籍', status: 'Error' },
      },
    },
    {
      title: '处分原因',
      dataIndex: 'reason',
      key: 'reason',
      width: 200,
      ellipsis: true,
    },
    {
      title: '处分日期',
      dataIndex: 'punishmentDate',
      key: 'punishmentDate',
      width: 120,
      valueType: 'date',
    },
    {
      title: '解除日期',
      dataIndex: 'cancelDate',
      key: 'cancelDate',
      width: 120,
      valueType: 'date',
      render: (text) => text || '未解除',
    },
    {
      title: '状态',
      dataIndex: 'cancelDate',
      key: 'status',
      width: 100,
      render: (_, record) => {
        return record.cancelDate ? 
          <Tag color="green">已撤销</Tag> : 
          <Tag color="red">未撤销</Tag>;
      },
      valueEnum: {
        false: { text: '未撤销', status: 'Error' },
        true: { text: '已撤销', status: 'Success' },
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      ellipsis: true,
      hideInSearch: true,
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
      width: 200,
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
          {!record.cancelDate && (
            <Popconfirm
              title="确定要撤销这个处分吗？"
              onConfirm={() => handleRevoke(record.id!)}
              okText="确定"
              cancelText="取消"
            >
              <Button type="link" size="small">
                撤销
              </Button>
            </Popconfirm>
          )}
          <Popconfirm
            title="确定要删除这条处分记录吗？"
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
      <ProTable<API.StudentPunishment, API.StudentPunishmentQueryRequest>
        headerTitle="处分管理"
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
          const res = await listStudentPunishmentByPageUsingPOST({
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

      {/* 添加处分记录弹窗 */}
      <ModalForm
        title="添加处分记录"
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
        <ProFormSelect
          name="punishmentType"
          label="处分类型"
          rules={[{ required: true, message: '请选择处分类型' }]}
          options={[
            { label: '警告', value: '警告' },
            { label: '严重警告', value: '严重警告' },
            { label: '记过', value: '记过' },
            { label: '留校察看', value: '留校察看' },
            { label: '开除学籍', value: '开除学籍' },
          ]}
          placeholder="请选择处分类型"
        />
        <ProFormTextArea
          name="reason"
          label="处分原因"
          rules={[{ required: true, message: '请输入处分原因' }]}
          placeholder="请输入处分原因"
        />
        <ProFormDatePicker
          name="punishmentDate"
          label="处分日期"
          rules={[{ required: true, message: '请选择处分日期' }]}
        />

        <ProFormTextArea
          name="description"
          label="描述"
          placeholder="请输入描述"
        />
      </ModalForm>

      {/* 编辑处分记录弹窗 */}
      <ModalForm
        title="编辑处分记录"
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
        <ProFormSelect
          name="punishmentType"
          label="处分类型"
          rules={[{ required: true, message: '请选择处分类型' }]}
          options={[
            { label: '警告', value: '警告' },
            { label: '严重警告', value: '严重警告' },
            { label: '记过', value: '记过' },
            { label: '留校察看', value: '留校察看' },
            { label: '开除学籍', value: '开除学籍' },
          ]}
          placeholder="请选择处分类型"
        />
        <ProFormTextArea
          name="reason"
          label="处分原因"
          rules={[{ required: true, message: '请输入处分原因' }]}
          placeholder="请输入处分原因"
        />
        <ProFormDatePicker
          name="punishmentDate"
          label="处分日期"
          rules={[{ required: true, message: '请选择处分日期' }]}
        />
        <ProFormDatePicker
          name="cancelDate"
          label="解除日期"
          placeholder="选择解除日期"
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

export default PunishmentManagement; 