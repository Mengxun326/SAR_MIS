import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable, ProCard, StatisticCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, message, Popconfirm, Space, Tag, Row, Col, Descriptions, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import { history } from '@umijs/max';
import {
  listStudentStatusChangeByPageUsingPOST,
  deleteStudentStatusChangeUsingPOST,
  getStudentStatusChangeByIdUsingGET,
} from '@/services/backend/studentStatusChangeController';

const { Statistic } = StatisticCard;

const StatusChangeList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<API.StudentStatusChange>();
  const [statistics, setStatistics] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  // 删除异动记录
  const handleDelete = async (id: string) => {
    try {
      await deleteStudentStatusChangeUsingPOST({ id });
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('删除失败');
    }
  };

  // 查看详情
  const handleViewDetail = async (record: API.StudentStatusChange) => {
    try {
      const res = await getStudentStatusChangeByIdUsingGET({ id: record.id! });
      if (res.code === 0) {
        setCurrentRecord(res.data);
        setDetailModalVisible(true);
      }
    } catch (error) {
      message.error('获取详情失败');
    }
  };

  // 状态标签配置
  const getStatusTag = (status?: string) => {
    const statusConfig = {
      '待审批': { color: 'orange', text: '待审批' },
      '已通过': { color: 'green', text: '已通过' },
      '已驳回': { color: 'red', text: '已驳回' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return config ? (
      <Tag color={config.color}>{config.text}</Tag>
    ) : (
      <Tag>未知</Tag>
    );
  };

  // 异动类型标签配置
  const getChangeTypeTag = (changeType?: string) => {
    const typeConfig = {
      '转专业': { color: 'blue', emoji: '📚' },
      '转学': { color: 'purple', emoji: '🎒' },
      '休学': { color: 'orange', emoji: '⏸️' },
      '复学': { color: 'green', emoji: '▶️' },
      '退学': { color: 'red', emoji: '❌' },
    };
    const config = typeConfig[changeType as keyof typeof typeConfig];
    return config ? (
      <Tag color={config.color}>
        {config.emoji} {changeType}
      </Tag>
    ) : (
      <Tag>{changeType}</Tag>
    );
  };

  const columns: ProColumns<API.StudentStatusChange>[] = [
    {
      title: '学号',
      dataIndex: 'studentId',
      key: 'studentId',
      width: 120,
      copyable: true,
    },
    {
      title: '异动类型',
      dataIndex: 'changeType',
      key: 'changeType',
      width: 120,
      render: (_, record) => getChangeTypeTag(record.changeType),
      valueEnum: {
        '转专业': { text: '转专业' },
        '转学': { text: '转学' },
        '休学': { text: '休学' },
        '复学': { text: '复学' },
        '退学': { text: '退学' },
      },
    },
    {
      title: '异动原因',
      dataIndex: 'reason',
      key: 'reason',
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '异动日期',
      dataIndex: 'changeDate',
      key: 'changeDate',
      width: 120,
      valueType: 'date',
      sorter: true,
    },
    {
      title: '审批人',
      dataIndex: 'approver',
      key: 'approver',
      width: 120,
      hideInSearch: true,
    },
    {
      title: '审批状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (_, record) => getStatusTag(record.status),
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
      sorter: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 180,
      render: (text, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          >
            详情
          </Button>
          {record.status === '待审批' && currentUser?.userRole === 'admin' && (
            <Button
              type="link"
              size="small"
              icon={<EditOutlined />}
              onClick={() => history.push(`/status-change/approve`)}
            >
              审批
            </Button>
          )}
          {(currentUser?.userRole === 'admin' || record.status === '待审批') && (
            <Popconfirm
              title="确定要删除这条异动记录吗？"
              onConfirm={() => handleDelete(record.id!)}
              okText="确定"
              cancelText="取消"
            >
              <Button 
                type="link" 
                size="small" 
                danger
                icon={<DeleteOutlined />}
              >
                删除
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: '学籍异动记录',
        subTitle: '管理和查看学籍异动申请',
      }}
    >
      {/* 统计卡片 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <StatisticCard
            statistic={{
              title: '总申请数',
              value: statistics.total,
              icon: <div style={{ fontSize: 24 }}>📊</div>,
            }}
          />
        </Col>
        <Col span={6}>
          <StatisticCard
            statistic={{
              title: '待审批',
              value: statistics.pending,
              valueStyle: { color: '#faad14' },
              icon: <div style={{ fontSize: 24 }}>⏰</div>,
            }}
          />
        </Col>
        <Col span={6}>
          <StatisticCard
            statistic={{
              title: '已通过',
              value: statistics.approved,
              valueStyle: { color: '#52c41a' },
              icon: <div style={{ fontSize: 24 }}>✅</div>,
            }}
          />
        </Col>
        <Col span={6}>
          <StatisticCard
            statistic={{
              title: '已驳回',
              value: statistics.rejected,
              valueStyle: { color: '#ff4d4f' },
              icon: <div style={{ fontSize: 24 }}>❌</div>,
            }}
          />
        </Col>
      </Row>

      <ProCard>
        <ProTable<API.StudentStatusChange, API.StudentStatusChangeQueryRequest>
          headerTitle="学籍异动记录"
          actionRef={actionRef}
          rowKey="id"
          search={{
            labelWidth: 120,
            collapsed: false,
            collapseRender: (collapsed) => collapsed ? '展开' : '收起',
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              icon={<PlusOutlined />}
              onClick={() => history.push('/status-change/apply')}
            >
              申请异动
            </Button>,
            currentUser?.userRole === 'admin' && (
              <Button
                key="approve"
                onClick={() => history.push('/status-change/approve')}
              >
                审批管理
              </Button>
            ),
          ]}
          request={async (params) => {
            const res = await listStudentStatusChangeByPageUsingPOST({
              ...params,
              current: params.current,
              pageSize: params.pageSize,
            });
            
            // 更新统计数据
            if (res?.data?.records) {
              const records = res.data.records;
              setStatistics({
                total: records.length,
                pending: records.filter(r => r.status === '待审批').length,
                approved: records.filter(r => r.status === '已通过').length,
                rejected: records.filter(r => r.status === '已驳回').length,
              });
            }
            
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
            showTotal: (total, range) => 
              `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`,
          }}
          options={{
            reload: true,
            density: true,
            fullScreen: true,
            setting: true,
          }}
        />
      </ProCard>

      {/* 详情弹窗 */}
      <Modal
        title={`异动申请详情 - ${currentRecord?.changeType}`}
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={600}
      >
        {currentRecord && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="学号">{currentRecord.studentId}</Descriptions.Item>
            <Descriptions.Item label="异动类型">
              {getChangeTypeTag(currentRecord.changeType)}
            </Descriptions.Item>
            <Descriptions.Item label="异动日期">{currentRecord.changeDate}</Descriptions.Item>
            <Descriptions.Item label="异动原因">{currentRecord.reason}</Descriptions.Item>
            <Descriptions.Item label="审批人">{currentRecord.approver}</Descriptions.Item>
            <Descriptions.Item label="审批状态">
              {getStatusTag(currentRecord.status)}
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">{currentRecord.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{currentRecord.updateTime}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </PageContainer>
  );
};

export default StatusChangeList; 