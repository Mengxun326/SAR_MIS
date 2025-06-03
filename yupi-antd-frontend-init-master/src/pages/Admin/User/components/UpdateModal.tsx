import { updateUserUsingPost } from '@/services/backend/userController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal } from 'antd';
import React from 'react';

interface Props {
  oldData?: API.User;
  visible: boolean;
  columns: ProColumns<API.User>[];
  onSubmit: (values: API.UserUpdateRequest) => void;
  onCancel: () => void;
}

/**
 * 更新用户
 *
 * @param fields
 */
const handleUpdate = async (fields: API.UserUpdateRequest) => {
  const hide = message.loading('正在更新用户');
  try {
    const res = await updateUserUsingPost(fields);
    hide();
    if (res.code === 0) {
      message.success('用户更新成功');
      return true;
    } else {
      message.error('用户更新失败：' + res.message);
      return false;
    }
  } catch (error: any) {
    hide();
    message.error('用户更新失败，请稍后重试');
    return false;
  }
};

/**
 * 更新用户弹窗
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {
  const { oldData, visible, columns, onSubmit, onCancel } = props;

  if (!oldData) {
    return <></>;
  }

  // 过滤掉不需要在更新表单中显示的列
  const updateColumns = columns.filter(column => 
    !['id', 'createTime', 'updateTime', 'option'].includes(column.dataIndex as string)
  );

  return (
    <Modal
      destroyOnClose
      title="更新用户信息"
      open={visible}
      footer={null}
      width={600}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={updateColumns}
        form={{
          layout: 'vertical',
          initialValues: {
            ...oldData,
          },
          submitter: {
            searchConfig: {
              submitText: '更新用户',
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
        onSubmit={async (values: API.UserUpdateRequest) => {
          const updateValues = {
            ...values,
            id: oldData.id,
          };
          
          const success = await handleUpdate(updateValues);
          if (success) {
            onSubmit?.(updateValues);
          }
        }}
      />
    </Modal>
  );
};
export default UpdateModal;
