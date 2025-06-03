import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, message, Popconfirm, Space, Tag } from 'antd';
import React, { useRef } from 'react';
import {
  listCourseSelectionByPageUsingPOST,
  dropCourseUsingPOST,
} from '@/services/backend/courseSelectionController';

const CourseSelectionManage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  // 强制退课
  const handleForceDrop = async (courseId: string) => {
    try {
      await dropCourseUsingPOST({ courseId });
      message.success('强制退课成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('强制退课失败');
    }
  };

  const columns: ProColumns<API.CourseSelection>[] = [
    {
      title: '学号',
      dataIndex: 'studentId',
      key: 'studentId',
      width: 120,
    },
    {
      title: '课程代码',
      dataIndex: 'courseCode',
      key: 'courseCode',
      width: 120,
    },
    {
      title: '课程名称',
      dataIndex: 'courseName',
      key: 'courseName',
      width: 200,
    },
    {
      title: '学分',
      dataIndex: 'credit',
      key: 'credit',
      width: 80,
    },
    {
      title: '教师',
      dataIndex: 'teacherName',
      key: 'teacherName',
      width: 120,
    },
    {
      title: '选课时间',
      dataIndex: 'selectTime',
      key: 'selectTime',
      width: 150,
      valueType: 'dateTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (_, record) => {
        const status = record.status;
        if (status === '已选') return <Tag color="green">已选</Tag>;
        if (status === '待审核') return <Tag color="orange">待审核</Tag>;
        if (status === '已退课') return <Tag color="red">已退课</Tag>;
        return <Tag>{status}</Tag>;
      },
      valueEnum: {
        '已选': { text: '已选', status: 'Success' },
        '待审核': { text: '待审核', status: 'Warning' },
        '已退课': { text: '已退课', status: 'Error' },
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
          {record.status === '已选' && (
            <Popconfirm
              title="确定要强制退选这门课程吗？"
              onConfirm={() => handleForceDrop(record.courseId!)}
              okText="确定"
              cancelText="取消"
            >
              <Button type="link" size="small" danger>
                强制退课
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.CourseSelection, API.CourseSelectionQueryRequest>
        headerTitle="选课管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={async (params) => {
          const res = await listCourseSelectionByPageUsingPOST({
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
    </PageContainer>
  );
};

export default CourseSelectionManage; 