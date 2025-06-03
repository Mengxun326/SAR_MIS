import { userRegisterUsingPost } from '@/services/backend/userController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal } from 'antd';
import React from 'react';

interface Props {
  visible: boolean;
  columns: ProColumns<API.User>[];
  onSubmit: (values: API.UserRegisterRequest) => void;
  onCancel: () => void;
}

/**
 * 注册用户
 * @param fields
 */
const handleRegister = async (fields: API.UserRegisterRequest) => {
  const hide = message.loading('正在注册用户');
  try {
    const res = await userRegisterUsingPost(fields);
    hide();
    if (res.code === 0) {
      message.success('用户注册成功');
      return true;
    } else {
      message.error('用户注册失败：' + res.message);
      return false;
    }
  } catch (error: any) {
    hide();
    message.error('用户注册失败，请稍后重试');
    return false;
  }
};

/**
 * 创建用户弹窗
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {
  const { visible, columns, onSubmit, onCancel } = props;

  // 过滤掉不需要在创建表单中显示的列
  const createColumns = columns.filter(column => 
    !['id', 'createTime', 'updateTime', 'option', 'userAvatar'].includes(column.dataIndex as string)
  );

  return (
    <Modal
      destroyOnClose
      title="注册新用户"
      open={visible}
      footer={null}
      width={600}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={createColumns}
        form={{
          layout: 'vertical',
          submitter: {
            searchConfig: {
              submitText: '注册用户',
              resetText: '重置',
            },
            render: (props, doms) => {
              return [
                <div key="buttons" style={{ textAlign: 'right', marginTop: 24 }}>
                  {doms}
                </div>
              ];
            },
          },
        }}
        onSubmit={async (values: API.UserRegisterRequest) => {
          // 验证密码一致性
          if (values.userPassword !== values.checkPassword) {
            message.error('两次输入的密码不一致');
            return;
          }

          // 设置默认值
          const submitValues = {
            ...values,
            userRole: values.userRole || 'student', // 默认角色为学生
          };
          
          const success = await handleRegister(submitValues);
          if (success) {
            onSubmit?.(submitValues);
          }
        }}
      />
    </Modal>
  );
};
export default CreateModal;
