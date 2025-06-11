import { PageContainer, ProDescriptions } from '@ant-design/pro-components';
import { history, useParams, useModel } from '@umijs/max';
import { Button, Card, message, Spin, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { getCourseByIdUsingGET } from '@/services/backend/courseController';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [courseData, setCourseData] = useState<API.Course>();
  const [loading, setLoading] = useState(true);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      try {
        const res = await getCourseByIdUsingGET({ id });
        if (res.code === 0) {
          setCourseData(res.data);
        }
      } catch (error) {
        message.error('获取课程信息失败');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <PageContainer>
        <Card>
          <Spin size="large" style={{ display: 'block', textAlign: 'center', padding: '50px' }} />
        </Card>
      </PageContainer>
    );
  }

  if (!courseData) {
    return (
      <PageContainer>
        <Card>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            课程不存在
          </div>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Card
        title="课程详情"
        extra={[
          ...(currentUser?.userRole === 'teacher' || currentUser?.userRole === 'admin' ? [
            <Button key="edit" type="primary" onClick={() => history.push(`/course/edit/${id}`)}>
              编辑课程
            </Button>
          ] : []),
          <Button key="back" onClick={() => history.push('/course/list')}>
            返回列表
          </Button>,
        ]}
      >
        <ProDescriptions
          column={2}
          dataSource={courseData}
          columns={[
            {
              title: '课程代码',
              dataIndex: 'courseCode',
              key: 'courseCode',
            },
            {
              title: '课程名称',
              dataIndex: 'courseName',
              key: 'courseName',
            },
            {
              title: '学分',
              dataIndex: 'credit',
              key: 'credit',
            },
            {
              title: '学时',
              dataIndex: 'courseHour',
              key: 'courseHour',
            },
            {
              title: '课程类型',
              dataIndex: 'courseType',
              key: 'courseType',
              render: (text) => {
                if (text === '必修') return <Tag color="success">必修</Tag>;
                if (text === '选修') return <Tag color="processing">选修</Tag>;
                if (text === '实践') return <Tag color="warning">实践</Tag>;
                return <Tag>{text}</Tag>;
              },
            },
            {
              title: '开课院系',
              dataIndex: 'department',
              key: 'department',
            },
            {
              title: '最大人数',
              dataIndex: 'maxStudent',
              key: 'maxStudent',
            },
            {
              title: '教师ID',
              dataIndex: 'teacherId',
              key: 'teacherId',
            },
            {
              title: '学期',
              dataIndex: 'semester',
              key: 'semester',
            },
            {
              title: '上课时间',
              dataIndex: 'courseTime',
              key: 'courseTime',
            },
            {
              title: '上课地点',
              dataIndex: 'location',
              key: 'location',
            },
            {
              title: '创建时间',
              dataIndex: 'createTime',
              key: 'createTime',
              valueType: 'dateTime',
            },
            {
              title: '更新时间',
              dataIndex: 'updateTime',
              key: 'updateTime',
              valueType: 'dateTime',
            },
          ]}
        />
      </Card>
    </PageContainer>
  );
};

export default CourseDetail; 