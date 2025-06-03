import { PageContainer, ProForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { history, useParams } from '@umijs/max';
import { Card, message, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  getStudentScoreByIdUsingGET,
  updateStudentScoreUsingPOST,
} from '@/services/backend/studentScoreController';

const ScoreEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [scoreData, setScoreData] = useState<API.StudentScore>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScore = async () => {
      if (!id) return;
      try {
        const res = await getStudentScoreByIdUsingGET({ id });
        if (res.code === 0) {
          setScoreData(res.data);
        }
      } catch (error) {
        message.error('获取成绩信息失败');
      } finally {
        setLoading(false);
      }
    };
    fetchScore();
  }, [id]);

  const handleSubmit = async (values: API.StudentScoreUpdateRequest) => {
    try {
      await updateStudentScoreUsingPOST({ ...values, id });
      message.success('成绩更新成功');
      history.push('/score/list');
    } catch (error) {
      message.error('成绩更新失败');
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
        <ProForm<API.StudentScoreUpdateRequest>
          title="编辑成绩"
          initialValues={scoreData}
          onFinish={handleSubmit}
          submitter={{
            searchConfig: {
              resetText: '重置',
              submitText: '更新',
            },
            resetButtonProps: {
              onClick: () => {
                history.push('/score/list');
              },
            },
          }}
        >
          <ProFormText
            name="studentId"
            label="学号"
            rules={[
              {
                required: true,
                message: '请输入学号',
              },
            ]}
            placeholder="请输入学号"
          />
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
          <ProFormDigit
            name="score"
            label="成绩"
            rules={[
              {
                required: true,
                message: '请输入成绩',
              },
            ]}
            min={0}
            max={100}
            placeholder="请输入成绩"
            fieldProps={{
              precision: 1,
            }}
          />
          <ProFormSelect
            name="examType"
            label="考试类型"
            rules={[
              {
                required: true,
                message: '请选择考试类型',
              },
            ]}
            options={[
              { label: '正常', value: '正常' },
              { label: '补考', value: '补考' },
              { label: '重修', value: '重修' },
            ]}
            placeholder="请选择考试类型"
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default ScoreEdit; 