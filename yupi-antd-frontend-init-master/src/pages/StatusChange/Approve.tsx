import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable, ModalForm, ProFormTextArea, ProFormSelect } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, message, Space, Tag, Descriptions } from 'antd';
import React, { useRef, useState } from 'react';
import {
  listStudentStatusChangeByPageUsingPOST,
  approveStudentStatusChangeUsingPOST,
} from '@/services/backend/studentStatusChangeController';

const StatusChangeApprove: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [approveModalVisible, setApproveModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<API.StudentStatusChange>();

  // 审批异动申请
  const handleApprove = async (values: { approvalStatus: string; approvalComment?: string }) => {
    try {
      await approveStudentStatusChangeUsingPOST(
        currentRecord?.id!,
        values.approvalStatus,
        values.approvalComment
      );
      message.success('审批成功');
      setApproveModalVisible(false);
      actionRef.current?.reload();
    } catch (error) {
      message.error('审批失败');
    }
  };

  const columns: ProColumns<API.StudentStatusChange>[] = [
    {
      title: '学号',
      dataIndex: 'studentId',
      key: 'studentId',
      width: 120,
    },
    {
      title: '异动类型',
      dataIndex: 'changeType',
      key: 'changeType',
      width: 120,
      valueEnum: {
        '转专业': { text: '转专业', status: 'Processing' },
        '转学': { text: '转学', status: 'Warning' },
        '休学': { text: '休学', status: 'Error' },
        '复学': { text: '复学', status: 'Success' },
        '退学': { text: '退学', status: 'Error' },
      },
    },
    {
      title: '异动原因',
      dataIndex: 'reason',
      key: 'reason',
      width: 200,
      ellipsis: true,
    },
    {
      title: '异动日期',
      dataIndex: 'changeDate',
      key: 'changeDate',
      width: 120,
      valueType: 'date',
    },
    {
      title: '审批人',
      dataIndex: 'approver',
      key: 'approver',
      width: 120,
    },
    {
      title: '审批状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (_, record) => {
        const status = record.status;
        if (status === '待审批') return <Tag color="orange">待审批</Tag>;
        if (status === '已通过') return <Tag color="green">已通过</Tag>;
        if (status === '已驳回') return <Tag color="red">已驳回</Tag>;
        return <Tag>未知</Tag>;
      },
      valueEnum: {
        '待审批': { text: '待审批', status: 'Warning' },
        '已通过': { text: '已通过', status: 'Success' },
        '已驳回': { text: '已驳回', status: 'Error' },
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
      width: 120,
      render: (text, record) => (
        <Space>
          {record.status === '待审批' && (
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setCurrentRecord(record);
                setApproveModalVisible(true);
              }}
            >
              审批
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.StudentStatusChange, API.StudentStatusChangeQueryRequest>
        headerTitle="学籍异动审批"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={async (params) => {
          // 只查询待审批的记录
          const res = await listStudentStatusChangeByPageUsingPOST({
            ...params,
            status: '待审批',
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

      {/* 审批弹窗 */}
      <ModalForm
        title={`审批异动申请 - ${currentRecord?.changeType}`}
        visible={approveModalVisible}
        onVisibleChange={setApproveModalVisible}
        onFinish={handleApprove}
        width={600}
        modalProps={{
          destroyOnClose: true,
        }}
      >
        <Descriptions
          title="申请详情"
          bordered
          column={1}
          style={{ marginBottom: 24 }}
        >
          <Descriptions.Item label="学号">{currentRecord?.studentId}</Descriptions.Item>
          <Descriptions.Item label="异动类型">{currentRecord?.changeType}</Descriptions.Item>
          <Descriptions.Item label="异动日期">{currentRecord?.changeDate}</Descriptions.Item>
          <Descriptions.Item label="异动原因">{currentRecord?.reason}</Descriptions.Item>
          <Descriptions.Item label="当前状态">{currentRecord?.status}</Descriptions.Item>
          <Descriptions.Item label="当前审批人">{currentRecord?.approver}</Descriptions.Item>
        </Descriptions>
        
        <ProFormSelect
          name="approvalStatus"
          label="审批结果"
          rules={[{ required: true, message: '请选择审批结果' }]}
          options={[
            { label: '通过', value: '已通过' },
            { label: '驳回', value: '已驳回' },
          ]}
          placeholder="请选择审批结果"
        />
        <ProFormTextArea
          name="approvalComment"
          label="审批意见"
          placeholder="请输入审批意见（选填）"
          fieldProps={{
            rows: 4,
          }}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default StatusChangeApprove; 