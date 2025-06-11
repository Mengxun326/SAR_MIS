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
  const [student, setStudent] = useState<API.Student>();
  const [loading, setLoading] = useState(true);

  // 参数验证
  useEffect(() => {
    if (!id) {
      message.error('缺少学生ID参数');
      history.push('/student/list');
      return;
    }

    // 验证ID格式
    if (!/^[a-zA-Z0-9]+$/.test(id)) {
      message.error('学生ID格式不正确');
      history.push('/student/list');
      return;
    }

    fetchStudent();
  }, [id]);

  /**
   * 根据学号获取学生信息
   */
  const fetchStudent = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      console.log('编辑页面请求学生信息，ID:', id);
      const res = await listStudentByPageUsingPost({
        studentId: id,
        current: 1,
        pageSize: 1,
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
      message.error('获取学生信息失败，请稍后重试');
      // 发生错误时也跳转回列表页
      setTimeout(() => {
        history.push('/student/list');
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

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
        message.error('更新学生信息失败：' + (res.message || '未知错误'));
      }
    } catch (error) {
      console.error('更新请求失败:', error);
      message.error('更新学生信息失败，请稍后重试');
    }
  };

  // 加载状态页面
  if (loading) {
    return (
      <PageContainer
        header={{
          title: '编辑学生信息',
          onBack: () => history.push('/student/list'),
        }}
      >
        <Card>
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <Spin size="large" />
            <div style={{ marginTop: 16, color: '#666' }}>正在加载学生信息...</div>
          </div>
        </Card>
      </PageContainer>
    );
  }

  // 未找到学生信息
  if (!student) {
    return (
      <PageContainer
        header={{
          title: '编辑学生信息',
          onBack: () => history.push('/student/list'),
        }}
      >
        <Card>
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <div style={{ fontSize: 16, color: '#999', marginBottom: 16 }}>
              未找到学生信息
            </div>
            <div style={{ color: '#666' }}>
              学号：{id}
            </div>
          </div>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      header={{
        title: '编辑学生信息',
        subTitle: `学号：${student.studentId}`,
        onBack: () => history.push('/student/list'),
      }}
    >
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
              { pattern: /^\d{7,10}$/, message: '学号格式不正确，应为7-10位数字' },
            ]}
          />
          
          <ProFormText
            name="name"
            label="姓名"
            placeholder="请输入姓名"
            rules={[
              { required: true, message: '请输入姓名' },
              { max: 50, message: '姓名长度不能超过50个字符' },
              { pattern: /^[\u4e00-\u9fa5a-zA-Z\s]+$/, message: '姓名只能包含中文、英文和空格' },
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
            fieldProps={{
              disabledDate: (current: any) => {
                // 不能选择未来日期和100年前的日期
                const now = new Date();
                const hundredYearsAgo = new Date();
                hundredYearsAgo.setFullYear(now.getFullYear() - 100);
                return current && (current > now || current < hundredYearsAgo);
              },
            }}
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
            rules={[
              { required: true, message: '请输入民族' },
              { max: 20, message: '民族名称不能超过20个字符' },
            ]}
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
            fieldProps={{
              disabledDate: (current: any) => {
                // 不能选择未来日期
                return current && current > new Date();
              },
            }}
          />

          <ProFormText
            name="major"
            label="专业"
            placeholder="请输入专业"
            rules={[
              { required: true, message: '请输入专业' },
              { max: 100, message: '专业名称不能超过100个字符' },
            ]}
          />

          <ProFormText
            name="className"
            label="班级"
            placeholder="请输入班级"
            rules={[
              { required: true, message: '请输入班级' },
              { max: 50, message: '班级名称不能超过50个字符' },
            ]}
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
              { label: '结业', value: '结业' },
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
              { required: false },
              { type: 'email', message: '邮箱格式不正确' },
              { max: 100, message: '邮箱长度不能超过100个字符' },
            ]}
          />

          <ProFormText
            name="address"
            label="家庭住址"
            placeholder="请输入家庭住址"
            rules={[
              { max: 200, message: '地址长度不能超过200个字符' },
            ]}
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default StudentEdit; 