import { Tag } from 'antd';
import React from 'react';

// 状态标签配置
export const getStatusTag = (status?: string) => {
  const statusConfig = {
    '待审批': { color: 'orange', text: '待审批' },
    '已通过': { color: 'green', text: '已通过' },
    '已驳回': { color: 'red', text: '已驳回' },
  };
  const config = statusConfig[status as keyof typeof statusConfig];
  return config ? (
    <Tag color={config.color}>{config.text}</Tag>
  ) : (
    <Tag>未知</Tag>
  );
};

// 异动类型标签配置
export const getChangeTypeTag = (changeType?: string) => {
  const typeConfig = {
    '转专业': { color: 'blue', emoji: '📚' },
    '转学': { color: 'purple', emoji: '🎒' },
    '休学': { color: 'orange', emoji: '⏸️' },
    '复学': { color: 'green', emoji: '▶️' },
    '退学': { color: 'red', emoji: '❌' },
  };
  const config = typeConfig[changeType as keyof typeof typeConfig];
  return config ? (
    <Tag color={config.color}>
      {config.emoji} {changeType}
    </Tag>
  ) : (
    <Tag>{changeType}</Tag>
  );
};

// 异动类型选项
export const changeTypeOptions = [
  { 
    label: '转专业', 
    value: '转专业',
    emoji: '📚'
  },
  { 
    label: '转学', 
    value: '转学',
    emoji: '🎒'
  },
  { 
    label: '休学', 
    value: '休学',
    emoji: '⏸️'
  },
  { 
    label: '复学', 
    value: '复学',
    emoji: '▶️'
  },
  { 
    label: '退学', 
    value: '退学',
    emoji: '❌'
  },
];

// 状态选项
export const statusOptions = [
  { label: '待审批', value: '待审批' },
  { label: '已通过', value: '已通过' },
  { label: '已驳回', value: '已驳回' },
];

// 审批结果选项
export const approvalOptions = [
  { label: '通过', value: '已通过' },
  { label: '驳回', value: '已驳回' },
]; 