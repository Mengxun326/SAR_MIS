import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable, ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, message, Popconfirm, Space } from 'antd';
import React, { useRef, useState } from 'react';
import {
  listStudentFamilyByPageUsingPOST,
  deleteStudentFamilyUsingPOST,
  addStudentFamilyUsingPOST,
  updateStudentFamilyUsingPOST,
} from '@/services/backend/studentFamilyController';

const FamilyManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<API.StudentFamily>();

  // 删除家庭信息
  const handleDelete = async (id: string) => {
    try {
      await deleteStudentFamilyUsingPOST({ id });
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('删除失败');
    }
  };

  // 添加家庭信息
  const handleAdd = async (values: API.StudentFamilyAddRequest) => {
    try {
      await addStudentFamilyUsingPOST(values);
      message.success('添加成功');
      setCreateModalVisible(false);
      actionRef.current?.reload();
    } catch (error) {
      message.error('添加失败');
    }
  };

  // 编辑家庭信息
  const handleEdit = async (values: API.StudentFamilyUpdateRequest) => {
    try {
      await updateStudentFamilyUsingPOST({ ...values, id: currentRecord?.id });
      message.success('更新成功');
      setEditModalVisible(false);
      actionRef.current?.reload();
    } catch (error) {
      message.error('更新失败');
    }
  };

  const columns: ProColumns<API.StudentFamily>[] = [
    {
      title: '学号',
      dataIndex: 'studentId',
      key: 'studentId',
      width: 120,
    },
    {
      title: '家长姓名',
      dataIndex: 'parentName',
      key: 'parentName',
      width: 120,
    },
    {
      title: '关系',
      dataIndex: 'relationship',
      key: 'relationship',
      width: 100,
      valueEnum: {
        '父亲': { text: '父亲', status: 'Default' },
        '母亲': { text: '母亲', status: 'Default' },
        '监护人': { text: '监护人', status: 'Processing' },
        '其他': { text: '其他', status: 'Warning' },
      },
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 130,
    },
    {
      title: '职业',
      dataIndex: 'occupation',
      key: 'occupation',
      width: 120,
    },
    {
      title: '工作单位',
      dataIndex: 'workUnit',
      key: 'workUnit',
      width: 200,
      ellipsis: true,
    },
    {
      title: '家庭地址',
      dataIndex: 'address',
      key: 'address',
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
            title="确定要删除这条家庭信息吗？"
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
      <ProTable<API.StudentFamily, API.StudentFamilyQueryRequest>
        headerTitle="家庭信息管理"
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
          const res = await listStudentFamilyByPageUsingPOST({
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

      {/* 添加家庭信息弹窗 */}
      <ModalForm
        title="添加家庭信息"
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
          name="parentName"
          label="家长姓名"
          rules={[{ required: true, message: '请输入家长姓名' }]}
          placeholder="请输入家长姓名"
        />
        <ProFormSelect
          name="relationship"
          label="关系"
          rules={[{ required: true, message: '请选择关系' }]}
          options={[
            { label: '父亲', value: '父亲' },
            { label: '母亲', value: '母亲' },
            { label: '监护人', value: '监护人' },
            { label: '其他', value: '其他' },
          ]}
          placeholder="请选择关系"
        />
        <ProFormText
          name="phone"
          label="联系电话"
          rules={[{ required: true, message: '请输入联系电话' }]}
          placeholder="请输入联系电话"
        />
        <ProFormText
          name="occupation"
          label="职业"
          placeholder="请输入职业"
        />
        <ProFormText
          name="workUnit"
          label="工作单位"
          placeholder="请输入工作单位"
        />
        <ProFormText
          name="address"
          label="家庭地址"
          placeholder="请输入家庭地址"
        />
      </ModalForm>

      {/* 编辑家庭信息弹窗 */}
      <ModalForm
        title="编辑家庭信息"
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
          name="parentName"
          label="家长姓名"
          rules={[{ required: true, message: '请输入家长姓名' }]}
          placeholder="请输入家长姓名"
        />
        <ProFormSelect
          name="relationship"
          label="关系"
          rules={[{ required: true, message: '请选择关系' }]}
          options={[
            { label: '父亲', value: '父亲' },
            { label: '母亲', value: '母亲' },
            { label: '监护人', value: '监护人' },
            { label: '其他', value: '其他' },
          ]}
          placeholder="请选择关系"
        />
        <ProFormText
          name="phone"
          label="联系电话"
          rules={[{ required: true, message: '请输入联系电话' }]}
          placeholder="请输入联系电话"
        />
        <ProFormText
          name="occupation"
          label="职业"
          placeholder="请输入职业"
        />
        <ProFormText
          name="workUnit"
          label="工作单位"
          placeholder="请输入工作单位"
        />
        <ProFormText
          name="address"
          label="家庭地址"
          placeholder="请输入家庭地址"
        />
      </ModalForm>
    </PageContainer>
  );
};

export default FamilyManagement; 