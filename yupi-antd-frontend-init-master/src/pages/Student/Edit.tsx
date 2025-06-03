import { PageContainer, ProForm, ProFormText, ProFormSelect, ProFormDatePicker } from '@ant-design/pro-components';
import { Card, message, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { history, useParams } from '@umijs/max';
import { getStudentByIdUsingGet, updateStudentUsingPost, listStudentByPageUsingPost } from '@/services/backend/studentController';

/**
 * 编辑学生页面
 */
const StudentEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<API.Student>();

  /**
   * 获取学生信息
   */
  const fetchStudent = async () => {
    if (!id) return;
    
    console.log('编辑页面接收到的学号:', id);
    
    setLoading(true);
    try {
      // 通过分页查询API根据学号查找学生
      const res = await listStudentByPageUsingPost({
        current: 1,
        pageSize: 1,
        studentId: id
      });
      console.log('编辑页面API响应:', res);
      if (res.code === 0 && res.data && res.data.records && res.data.records.length > 0) {
        console.log('编辑页面获取到学生数据:', res.data.records[0]);
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
   * 提交表单
   */
  const handleSubmit = async (values: API.StudentUpdateRequest) => {
    if (!student?.id) {
      message.error('学生信息不完整，无法更新');
      return;
    }
    
    console.log('原始ID字符串:', student.id);
    console.log('准备发送的更新数据:', {
      ...values,
      id: student.id,
    });
    
    try {
      const res = await updateStudentUsingPost({
        ...values,
        id: student.id, // 直接传递字符串ID
      });
      if (res.code === 0) {
        message.success('更新学生信息成功');
        history.push('/student/list');
      } else {
        message.error('更新学生信息失败：' + res.message);
      }
    } catch (error) {
      console.error('更新请求失败:', error);
      message.error('更新学生信息失败');
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
        <ProForm
          onFinish={handleSubmit}
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={student}
          submitter={{
            searchConfig: {
              submitText: '更新',
              resetText: '取消',
            },
            resetButtonProps: {
              onClick: () => {
                history.push('/student/list');
              },
            },
          }}
        >
          <ProFormText
            name="studentId"
            label="学号"
            placeholder="请输入学号"
            rules={[
              { required: true, message: '请输入学号' },
              { pattern: /^\d{7,10}$/, message: '学号格式不正确' },
            ]}
          />
          
          <ProFormText
            name="name"
            label="姓名"
            placeholder="请输入姓名"
            rules={[
              { required: true, message: '请输入姓名' },
              { max: 50, message: '姓名长度不能超过50个字符' },
            ]}
          />

          <ProFormSelect
            name="gender"
            label="性别"
            placeholder="请选择性别"
            options={[
              { label: '女', value: 0 },
              { label: '男', value: 1 },
            ]}
            rules={[{ required: true, message: '请选择性别' }]}
          />

          <ProFormDatePicker
            name="birthDate"
            label="出生日期"
            placeholder="请选择出生日期"
            rules={[{ required: true, message: '请选择出生日期' }]}
          />

          <ProFormText
            name="idCard"
            label="身份证号"
            placeholder="请输入身份证号"
            rules={[
              { required: true, message: '请输入身份证号' },
              { pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '身份证号格式不正确' },
            ]}
          />

          <ProFormText
            name="nationality"
            label="民族"
            placeholder="请输入民族"
            rules={[{ required: true, message: '请输入民族' }]}
          />

          <ProFormSelect
            name="politicalStatus"
            label="政治面貌"
            placeholder="请选择政治面貌"
            options={[
              { label: '群众', value: '群众' },
              { label: '团员', value: '团员' },
              { label: '党员', value: '党员' },
              { label: '民主党派', value: '民主党派' },
            ]}
            rules={[{ required: true, message: '请选择政治面貌' }]}
          />

          <ProFormDatePicker
            name="enrollmentDate"
            label="入学日期"
            placeholder="请选择入学日期"
            rules={[{ required: true, message: '请选择入学日期' }]}
          />

          <ProFormText
            name="major"
            label="专业"
            placeholder="请输入专业"
            rules={[{ required: true, message: '请输入专业' }]}
          />

          <ProFormText
            name="className"
            label="班级"
            placeholder="请输入班级"
            rules={[{ required: true, message: '请输入班级' }]}
          />

          <ProFormSelect
            name="status"
            label="学籍状态"
            placeholder="请选择学籍状态"
            options={[
              { label: '在读', value: '在读' },
              { label: '休学', value: '休学' },
              { label: '退学', value: '退学' },
              { label: '毕业', value: '毕业' },
            ]}
            rules={[{ required: true, message: '请选择学籍状态' }]}
          />

          <ProFormText
            name="phone"
            label="手机号"
            placeholder="请输入手机号"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' },
            ]}
          />

          <ProFormText
            name="email"
            label="邮箱"
            placeholder="请输入邮箱"
            rules={[
              { type: 'email', message: '邮箱格式不正确' },
            ]}
          />

          <ProFormText
            name="address"
            label="家庭住址"
            placeholder="请输入家庭住址"
            rules={[{ max: 200, message: '地址长度不能超过200个字符' }]}
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default StudentEdit; 