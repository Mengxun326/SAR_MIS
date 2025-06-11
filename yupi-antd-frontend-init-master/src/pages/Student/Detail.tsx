import { PageContainer, ProDescriptions } from '@ant-design/pro-components';
import { Card, message, Spin, Button, Tag } from 'antd';
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { history, useParams, useModel } from '@umijs/max';
import { getStudentByIdUsingGet, listStudentByPageUsingPost } from '@/services/backend/studentController';

/**
 * 学生详情页面
 */
const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<API.Student>();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  /**
   * 获取学生信息
   */
  const fetchStudent = async () => {
    if (!id) return;
    
    console.log('详情页面接收到的学号:', id);
    console.log('学号类型:', typeof id);
    
    setLoading(true);
    try {
      // 先通过分页查询API根据学号查找学生
      const res = await listStudentByPageUsingPost({
        current: 1,
        pageSize: 1,
        studentId: id
      });
      console.log('API响应:', res);
      if (res.code === 0 && res.data && res.data.records && res.data.records.length > 0) {
        console.log('获取到学生数据:', res.data.records[0]);
        setStudent(res.data.records[0]);
      } else {
        console.error('未找到学生信息');
        message.error('未找到该学号的学生信息');
        history.push('/student/list');
      }
    } catch (error) {
      console.error('API调用异常:', error);
      message.error('获取学生信息失败');
      history.push('/student/list');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  /**
   * 性别格式化
   */
  const formatGender = (gender: number) => {
    return gender === 1 ? '男' : '女';
  };

  /**
   * 学籍状态格式化
   */
  const formatStatus = (status: string) => {
    const statusMap = {
      '在读': 'green',
      '休学': 'orange',
      '退学': 'red',
      '毕业': 'blue',
    };
    return (
      <Tag color={statusMap[status as keyof typeof statusMap] || 'default'}>
        {status}
      </Tag>
    );
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
    <PageContainer
      header={{
        title: '学生详情',
        extra: [
          <Button
            key="back"
            icon={<ArrowLeftOutlined />}
            onClick={() => history.push('/student/list')}
          >
            返回列表
          </Button>,
          ...(currentUser?.userRole === 'teacher' || currentUser?.userRole === 'admin' ? [
            <Button
              key="edit"
              type="primary"
              icon={<EditOutlined />}
              onClick={() => history.push(`/student/edit/${id}`)}
            >
              编辑
            </Button>
          ] : []),
        ],
      }}
    >
      <Card>
        <ProDescriptions
          title="基本信息"
          column={2}
          dataSource={student}
          columns={[
            {
              title: '学号',
              dataIndex: 'studentId',
              copyable: true,
            },
            {
              title: '姓名',
              dataIndex: 'name',
            },
            {
              title: '性别',
              dataIndex: 'gender',
              render: (_, record) => formatGender(record.gender || 0),
            },
            {
              title: '出生日期',
              dataIndex: 'birthDate',
              valueType: 'date',
            },
            {
              title: '身份证号',
              dataIndex: 'idCard',
              copyable: true,
            },
            {
              title: '民族',
              dataIndex: 'nationality',
            },
            {
              title: '政治面貌',
              dataIndex: 'politicalStatus',
            },
            {
              title: '入学日期',
              dataIndex: 'enrollmentDate',
              valueType: 'date',
            },
            {
              title: '专业',
              dataIndex: 'major',
            },
            {
              title: '班级',
              dataIndex: 'className',
            },
            {
              title: '学籍状态',
              dataIndex: 'status',
              render: (_, record) => formatStatus(record.status || ''),
            },
            {
              title: '手机号',
              dataIndex: 'phone',
              copyable: true,
            },
            {
              title: '邮箱',
              dataIndex: 'email',
              copyable: true,
            },
            {
              title: '家庭住址',
              dataIndex: 'address',
              span: 2,
            },
            {
              title: '创建时间',
              dataIndex: 'createTime',
              valueType: 'dateTime',
            },
            {
              title: '更新时间',
              dataIndex: 'updateTime',
              valueType: 'dateTime',
            },
          ]}
        />
      </Card>
    </PageContainer>
  );
};

export default StudentDetail; 