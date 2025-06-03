import { PageContainer, ProForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { history, useParams } from '@umijs/max';
import { Card, message, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  getCourseByIdUsingGET,
  updateCourseUsingPOST,
} from '@/services/backend/courseController';

const CourseEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [courseData, setCourseData] = useState<API.Course>();
  const [loading, setLoading] = useState(true);

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

  const handleSubmit = async (values: API.CourseUpdateRequest) => {
    try {
      await updateCourseUsingPOST({ ...values, id });
      message.success('课程更新成功');
      history.push('/course/list');
    } catch (error) {
      message.error('课程更新失败');
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <Card>
          <Spin size="large" style={{ display: 'block', textAlign: 'center', padding: '50px' }} />
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Card>
        <ProForm<API.CourseUpdateRequest>
          title="编辑课程"
          initialValues={courseData}
          onFinish={handleSubmit}
          submitter={{
            searchConfig: {
              resetText: '重置',
              submitText: '更新',
            },
            resetButtonProps: {
              onClick: () => {
                history.push('/course/list');
              },
            },
          }}
        >
          <ProFormText
            name="courseCode"
            label="课程代码"
            rules={[
              {
                required: true,
                message: '请输入课程代码',
              },
            ]}
            placeholder="请输入课程代码"
          />
          <ProFormText
            name="courseName"
            label="课程名称"
            rules={[
              {
                required: true,
                message: '请输入课程名称',
              },
            ]}
            placeholder="请输入课程名称"
          />
          <ProFormDigit
            name="credit"
            label="学分"
            rules={[
              {
                required: true,
                message: '请输入学分',
              },
            ]}
            min={0}
            max={10}
            placeholder="请输入学分"
            fieldProps={{
              precision: 1,
            }}
          />
          <ProFormDigit
            name="courseHour"
            label="学时"
            rules={[
              {
                required: true,
                message: '请输入学时',
              },
            ]}
            min={0}
            placeholder="请输入学时"
          />
          <ProFormSelect
            name="courseType"
            label="课程类型"
            rules={[
              {
                required: true,
                message: '请选择课程类型',
              },
            ]}
            options={[
              { label: '必修', value: '必修' },
              { label: '选修', value: '选修' },
              { label: '实践', value: '实践' },
            ]}
            placeholder="请选择课程类型"
          />
          <ProFormText
            name="department"
            label="开课院系"
            rules={[
              {
                required: true,
                message: '请输入开课院系',
              },
            ]}
            placeholder="请输入开课院系"
          />
          <ProFormDigit
            name="maxStudent"
            label="最大人数"
            rules={[
              {
                required: true,
                message: '请输入最大人数',
              },
            ]}
            min={1}
            placeholder="请输入最大人数"
          />
          <ProFormText
            name="teacherId"
            label="教师ID"
            rules={[
              {
                required: true,
                message: '请输入教师ID',
              },
            ]}
            placeholder="请输入教师ID"
          />
          <ProFormText
            name="semester"
            label="学期"
            rules={[
              {
                required: true,
                message: '请输入学期',
              },
            ]}
            placeholder="例如：2023-2024-1"
          />
          <ProFormText
            name="courseTime"
            label="上课时间"
            placeholder="例如：周一1-2节"
          />
          <ProFormText
            name="location"
            label="上课地点"
            placeholder="例如：教学楼A101"
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default CourseEdit; 