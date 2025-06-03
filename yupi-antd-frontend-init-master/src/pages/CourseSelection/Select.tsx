import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, message, Space, Tag } from 'antd';
import React, { useRef } from 'react';
import {
  listCourseByPageUsingPOST,
  checkCourseUsingGET,
} from '@/services/backend/courseController';
import {
  selectCourseUsingPOST,
  checkCourseSelectionUsingGET,
} from '@/services/backend/courseSelectionController';

const CourseSelect: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  // 选课
  const handleSelectCourse = async (courseId: string) => {
    try {
      // 先检查是否可以选课
      const checkRes = await checkCourseUsingGET({ id: courseId });
      if (!checkRes.data) {
        message.error('该课程不可选择');
        return;
      }

      // 检查是否已选
      const selectionRes = await checkCourseSelectionUsingGET({ courseId });
      if (selectionRes.data) {
        message.warning('您已选择该课程');
        return;
      }

      // 选课
      await selectCourseUsingPOST({ courseId });
      message.success('选课成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('选课失败');
    }
  };

  const columns: ProColumns<API.Course>[] = [
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
      title: '学时',
      dataIndex: 'courseHour',
      key: 'courseHour',
      width: 80,
    },
    {
      title: '课程类型',
      dataIndex: 'courseType',
      key: 'courseType',
      width: 100,
      valueEnum: {
        '必修': { text: '必修', status: 'Success' },
        '选修': { text: '选修', status: 'Processing' },
        '实践': { text: '实践', status: 'Warning' },
      },
    },
    {
      title: '开课院系',
      dataIndex: 'department',
      key: 'department',
      width: 120,
    },
    {
      title: '最大人数',
      dataIndex: 'maxStudent',
      key: 'maxStudent',
      width: 100,
    },
    {
      title: '学期',
      dataIndex: 'semester',
      key: 'semester',
      width: 120,
    },
    {
      title: '上课时间',
      dataIndex: 'courseTime',
      key: 'courseTime',
      width: 150,
    },
    {
      title: '上课地点',
      dataIndex: 'location',
      key: 'location',
      width: 120,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 120,
      render: (text, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => handleSelectCourse(record.id!)}
          >
            选课
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Course, API.CourseQueryRequest>
        headerTitle="课程选择"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={async (params) => {
          const res = await listCourseByPageUsingPOST({
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

export default CourseSelect; 