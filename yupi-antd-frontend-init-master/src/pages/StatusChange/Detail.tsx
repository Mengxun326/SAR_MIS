import { PageContainer, ProCard, ProDescriptions } from '@ant-design/pro-components';
import { history, useParams, useModel } from '@umijs/max';
import { Button, message, Tag, Space, Timeline, Alert } from 'antd';
import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { 
  getStudentStatusChangeByIdUsingGET,
  deleteStudentStatusChangeUsingPOST 
} from '@/services/backend/studentStatusChangeController';

const StatusChangeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [record, setRecord] = useState<API.StudentStatusChange>();
  const [loading, setLoading] = useState(true);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  useEffect(() => {
    if (id) {
      fetchDetail();
    }
  }, [id]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const res = await getStudentStatusChangeByIdUsingGET({ id: id! });
      if (res.code === 0) {
        setRecord(res.data);
      } else {
        message.error('获取详情失败');
        history.back();
      }
    } catch (error) {
      message.error('获取详情失败');
      history.back();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteStudentStatusChangeUsingPOST({ id: id! });
      message.success('删除成功');
      history.push('/status-change/list');
    } catch (error) {
      message.error('删除失败');
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

  return (
    <PageContainer
      loading={loading}
      header={{
        title: `异动申请详情 - ${record?.changeType}`,
        onBack: () => history.back(),
        extra: [
          <Button
            key="back"
            icon={<ArrowLeftOutlined />}
            onClick={() => history.push('/status-change/list')}
          >
            返回列表
          </Button>,
          ...(record?.status === '待审批' && (currentUser?.userRole === 'admin') ? [
            <Button
              key="edit"
              type="primary"
              icon={<EditOutlined />}
              onClick={() => history.push('/status-change/approve')}
            >
              审批
            </Button>
          ] : []),
          <Button
            key="delete"
            danger
            icon={<DeleteOutlined />}
            onClick={handleDelete}
          >
            删除
          </Button>,
        ],
      }}
    >
      {record && (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* 状态提醒 */}
          {record.status === '待审批' && (
            <Alert
              message="申请状态"
              description="您的异动申请正在审批中，请耐心等待审批结果。"
              type="info"
              showIcon
              closable
            />
          )}
          {record.status === '已通过' && (
            <Alert
              message="申请通过"
              description="恭喜！您的异动申请已通过审批。"
              type="success"
              showIcon
              closable
            />
          )}
          {record.status === '已驳回' && (
            <Alert
              message="申请被驳回"
              description="很抱歉，您的异动申请被驳回，请查看驳回原因。"
              type="error"
              showIcon
              closable
            />
          )}

          {/* 基本信息 */}
          <ProCard title="申请信息" bordered>
            <ProDescriptions
              column={2}
              dataSource={record}
              columns={[
                {
                  title: '学号',
                  key: 'studentId',
                  dataIndex: 'studentId',
                  copyable: true,
                },
                {
                  title: '异动类型',
                  key: 'changeType',
                  dataIndex: 'changeType',
                  render: () => getChangeTypeTag(record.changeType),
                },
                {
                  title: '异动日期',
                  key: 'changeDate',
                  dataIndex: 'changeDate',
                  valueType: 'date',
                },
                {
                  title: '审批状态',
                  key: 'status',
                  dataIndex: 'status',
                  render: () => getStatusTag(record.status),
                },
                {
                  title: '审批人',
                  key: 'approver',
                  dataIndex: 'approver',
                  span: 2,
                },
                {
                  title: '异动原因',
                  key: 'reason',
                  dataIndex: 'reason',
                  valueType: 'textarea',
                  span: 2,
                },
              ]}
            />
          </ProCard>

          {/* 时间线 */}
          <ProCard title="处理流程" bordered>
            <Timeline
              items={[
                {
                  color: 'green',
                  children: (
                    <div>
                      <p><strong>申请提交</strong></p>
                      <p>时间：{record.createTime}</p>
                      <p>状态：已提交</p>
                    </div>
                  ),
                },
                {
                  color: record.status === '待审批' ? 'blue' : 'green',
                  children: (
                    <div>
                      <p><strong>管理员审批</strong></p>
                      <p>审批人：{record.approver}</p>
                      <p>状态：{record.status}</p>
                      {record.updateTime !== record.createTime && (
                        <p>时间：{record.updateTime}</p>
                      )}
                    </div>
                  ),
                },
                ...(record.status !== '待审批' ? [{
                  color: record.status === '已通过' ? 'green' : 'red',
                  children: (
                    <div>
                      <p><strong>审批完成</strong></p>
                      <p>结果：{record.status}</p>
                      <p>时间：{record.updateTime}</p>
                    </div>
                  ),
                }] : []),
              ]}
            />
          </ProCard>

          {/* 系统信息 */}
          <ProCard title="系统信息" bordered>
            <ProDescriptions
              column={2}
              dataSource={record}
              columns={[
                {
                  title: '申请ID',
                  key: 'id',
                  dataIndex: 'id',
                  copyable: true,
                },
                {
                  title: '创建时间',
                  key: 'createTime',
                  dataIndex: 'createTime',
                  valueType: 'dateTime',
                },
                {
                  title: '更新时间',
                  key: 'updateTime',
                  dataIndex: 'updateTime',
                  valueType: 'dateTime',
                },
              ]}
            />
          </ProCard>
        </Space>
      )}
    </PageContainer>
  );
};

export default StatusChangeDetail; 