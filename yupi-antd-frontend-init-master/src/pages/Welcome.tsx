import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, theme, Row, Col, Statistic, Typography, Space, Badge, Timeline, Avatar, Progress, message } from 'antd';
import { UserOutlined, BookOutlined, TrophyOutlined, TeamOutlined, RocketOutlined, StarOutlined, SafetyCertificateOutlined, ThunderboltOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import { PAGE_TITLES } from '@/constants/pageTitles';
import { getDashboardStatisticsUsingGET } from '@/services/backend/statisticsController';

const { Title, Paragraph, Text } = Typography;

// 统计数据接口
interface DashboardStatistics {
  studentCount: number;
  courseCount: number;
  monthlyAwardCount: number;
  teacherCount: number;
}

/**
 * 功能卡片组件
 */
const FeatureCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  desc: string;
  href: string;
  color: string;
}> = ({ title, icon, desc, href, color }) => {
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        borderRadius: '16px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '32px 24px',
        minWidth: '220px',
        flex: 1,
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid #f0f0f0',
        position: 'relative',
        overflow: 'hidden',
      }}
      onClick={() => window.location.href = href}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
        e.currentTarget.style.borderColor = color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        e.currentTarget.style.borderColor = '#f0f0f0';
      }}
    >
      {/* 背景装饰 */}
      <div
        style={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: `linear-gradient(45deg, ${color}15, ${color}05)`,
        }}
      />
      
      <div
        style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '16px',
            background: `linear-gradient(135deg, ${color}, ${color}dd)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFF',
            fontSize: '24px',
            boxShadow: `0 4px 12px ${color}30`,
          }}
        >
          {icon}
        </div>
        <div>
          <div
            style={{
              fontSize: '20px',
              color: token.colorText,
              fontWeight: 'bold',
              marginBottom: '4px',
            }}
          >
            {title}
          </div>
          <Badge status="processing" text={<span style={{ color: '#666' }}>功能模块</span>} />
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          lineHeight: '24px',
        }}
      >
        {desc}
      </div>
    </div>
  );
};

/**
 * 用户头像组件
 */
const UserAvatarDisplay: React.FC<{ currentUser?: API.LoginUserVO }> = ({ currentUser }) => {
  const [avatarError, setAvatarError] = useState(false);
  
  const handleAvatarError = () => {
    console.log('❌ 用户头像加载失败，切换到默认图标');
    setAvatarError(true);
    return false;
  };

  // 当头像URL变化时重置错误状态
  useEffect(() => {
    if (currentUser?.userAvatar) {
      setAvatarError(false);
      console.log('🔄 用户头像URL:', currentUser.userAvatar);
    }
  }, [currentUser?.userAvatar]);

  // 根据用户角色生成默认头像颜色
  const getAvatarColor = () => {
    if (!currentUser?.userRole) return 'rgba(255,255,255,0.2)';
    
    switch (currentUser.userRole) {
      case 'admin': return '#ff4d4f';
      case 'teacher': return '#1890ff';
      case 'user': return '#52c41a';
      default: return 'rgba(255,255,255,0.2)';
    }
  };

  return (
    <div style={{ textAlign: 'center', position: 'relative' }}>
      <Avatar 
        size={120} 
        src={!avatarError && currentUser?.userAvatar ? currentUser.userAvatar : undefined}
        style={{ 
          backgroundColor: getAvatarColor(),
          border: '3px solid rgba(255,255,255,0.3)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }} 
        icon={<UserOutlined />}
        onError={handleAvatarError}
      />
      <div style={{ marginTop: '16px', color: 'rgba(255,255,255,0.9)' }}>
        <div style={{ 
          fontSize: '18px', 
          fontWeight: 'bold', 
          textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '8px'
        }}>
          {currentUser?.userName || '管理员'}
        </div>
        <div style={{ 
          fontSize: '13px', 
          opacity: 0.85,
          background: 'rgba(255,255,255,0.1)',
          padding: '4px 12px',
          borderRadius: '12px',
          display: 'inline-block'
        }}>
          {currentUser?.userRole === 'admin' && '🔑 系统管理员'}
          {currentUser?.userRole === 'teacher' && '👨‍🏫 教师'}
          {currentUser?.userRole === 'user' && '👤 普通用户'}
          {!currentUser?.userRole && '👋 访客'}
        </div>
        {currentUser?.id && (
          <div style={{ 
            fontSize: '11px', 
            opacity: 0.6,
            marginTop: '6px'
          }}>
            用户ID: {currentUser.id}
          </div>
        )}
        {/* 调试信息 */}
        {process.env.NODE_ENV === 'development' && (
          <div style={{ 
            fontSize: '10px', 
            opacity: 0.5,
            marginTop: '4px',
            color: avatarError ? '#ff7875' : '#73d13d'
          }}>
            头像状态: {avatarError ? '❌ 加载失败' : currentUser?.userAvatar ? '🖼️ 自定义' : '👤 默认'}
          </div>
        )}
      </div>
    </div>
  );
};

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const [statistics, setStatistics] = useState<DashboardStatistics>({
    studentCount: 0,
    courseCount: 0,
    monthlyAwardCount: 0,
    teacherCount: 0,
  });
  const [loading, setLoading] = useState(true);
  
  // 设置页面标题
  useDocumentTitle(PAGE_TITLES.WELCOME);

  // 调试用户数据
  useEffect(() => {
    console.log('🔍 当前用户数据:', initialState?.currentUser);
    console.log('🖼️ 用户头像URL:', initialState?.currentUser?.userAvatar);
    console.log('👤 用户姓名:', initialState?.currentUser?.userName);
    console.log('🎭 用户角色:', initialState?.currentUser?.userRole);
  }, [initialState]);

  // 获取统计数据
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        console.log('开始获取统计数据...');
        const response = await getDashboardStatisticsUsingGET();
        console.log('统计数据响应:', response);
        
        if (response.code === 0 && response.data) {
          setStatistics(response.data as DashboardStatistics);
          console.log('统计数据更新成功:', response.data);
        } else {
          console.error('统计数据响应异常:', response);
          message.error(`获取统计数据失败: ${response.message || '未知错误'}`);
        }
      } catch (error) {
        console.error('获取统计数据异常:', error);
        message.error('获取统计数据失败，请检查网络连接或后端服务');
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);
  
  return (
    <PageContainer
      header={{
        title: (
          <Space>
            <RocketOutlined style={{ color: '#1890ff' }} />
            <span>欢迎来到学生学籍管理系统</span>
          </Space>
        ),
        subTitle: '智能化、现代化的学籍管理解决方案',
      }}
    >
      {/* 欢迎横幅 */}
      <Card
        style={{
          borderRadius: 16,
          marginBottom: 24,
          border: 'none',
          overflow: 'hidden',
        }}
        bodyStyle={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '48px 32px',
        }}
      >
        <Row align="middle">
          <Col span={16}>
            <Title level={1} style={{ color: 'white', marginBottom: '16px' }}>
              🎓 学生学籍管理信息系统
            </Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '24px' }}>
              为学校提供完整的学生学籍管理解决方案，包括学生信息管理、成绩管理、课程管理、学籍异动、奖惩记录等功能模块，助力学校实现数字化管理。
            </Paragraph>
            <Space size="large">
              <Badge count="NEW" style={{ backgroundColor: '#52c41a' }}>
                <Text style={{ color: 'white' }}>✨ 智能化管理</Text>
              </Badge>
              <Text style={{ color: 'white' }}>🔒 数据安全保障</Text>
              <Text style={{ color: 'white' }}>📊 可视化分析</Text>
            </Space>
          </Col>
          <Col span={8} style={{ textAlign: 'center' }}>
            <UserAvatarDisplay currentUser={initialState?.currentUser} />
          </Col>
        </Row>
      </Card>

      {/* 统计数据 */}
      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            loading={loading}
            style={{ 
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none'
            }}
            bodyStyle={{ color: 'white' }}
          >
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.9)' }}>在校学生总数</span>}
              value={statistics.studentCount}
              prefix={<UserOutlined style={{ color: 'white' }} />}
              valueStyle={{ color: 'white', fontSize: '32px', fontWeight: 'bold' }}
            />
            <Progress 
              percent={Math.min(Math.round((statistics.studentCount / 1500) * 100), 100)} 
              strokeColor="rgba(255,255,255,0.4)" 
              showInfo={false} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            loading={loading}
            style={{ 
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
              border: 'none'
            }}
          >
            <Statistic
              title={<span style={{ color: '#8b4513' }}>开设课程数</span>}
              value={statistics.courseCount}
              prefix={<BookOutlined style={{ color: '#fa8c16' }} />}
              valueStyle={{ color: '#fa8c16', fontSize: '32px', fontWeight: 'bold' }}
            />
            <Progress 
              percent={Math.min(Math.round((statistics.courseCount / 120) * 100), 100)} 
              strokeColor="#fa8c16" 
              showInfo={false} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            loading={loading}
            style={{ 
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
              border: 'none'
            }}
          >
            <Statistic
              title={<span style={{ color: '#8b4513' }}>本月获奖次数</span>}
              value={statistics.monthlyAwardCount}
              prefix={<TrophyOutlined style={{ color: '#faad14' }} />}
              valueStyle={{ color: '#faad14', fontSize: '32px', fontWeight: 'bold' }}
            />
            <Progress 
              percent={Math.min(Math.round((statistics.monthlyAwardCount / 50) * 100), 100)} 
              strokeColor="#faad14" 
              showInfo={false} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            loading={loading}
            style={{ 
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
              border: 'none'
            }}
          >
            <Statistic
              title={<span style={{ color: '#4a4a4a' }}>教职工人数</span>}
              value={statistics.teacherCount}
              prefix={<TeamOutlined style={{ color: '#722ed1' }} />}
              valueStyle={{ color: '#722ed1', fontSize: '32px', fontWeight: 'bold' }}
            />
            <Progress 
              percent={Math.min(Math.round((statistics.teacherCount / 200) * 100), 100)} 
              strokeColor="#722ed1" 
              showInfo={false} 
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={24}>
        {/* 功能模块 */}
        <Col xs={24} lg={16}>
          <Card 
            title={
              <Space>
                <ThunderboltOutlined style={{ color: 'white' }} />
                <span style={{ fontWeight: 'bold', color: 'white' }}>主要功能模块</span>
              </Space>
            }
            style={{ borderRadius: 16, marginBottom: 24 }}
            headStyle={{
              background: 'linear-gradient(90deg, #1890ff 0%, #722ed1 100%)',
              color: 'white',
              borderRadius: '16px 16px 0 0',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 24,
              }}
            >
              <FeatureCard
                icon={<UserOutlined />}
                title="学生管理"
                href="/student/list"
                color="#1890ff"
                desc="管理学生基本信息，包括个人资料、联系方式、学籍状态等，支持批量导入导出功能。"
              />
              <FeatureCard
                icon={<BookOutlined />}
                title="课程管理"
                href="/course/list"
                color="#52c41a"
                desc="管理课程信息和选课系统，包括课程设置、选课管理、课程安排等功能。"
              />
              <FeatureCard
                icon={<TrophyOutlined />}
                title="成绩管理"
                href="/score/list"
                color="#faad14"
                desc="录入和管理学生成绩，提供成绩统计分析、GPA计算、成绩排名等功能。"
              />
              <FeatureCard
                icon={<TeamOutlined />}
                title="学籍异动"
                href="/status-change/list"
                color="#722ed1"
                desc="处理学生学籍变更申请，包括休学、复学、转专业、退学等各类学籍异动。"
              />
            </div>
          </Card>
        </Col>

        {/* 系统特色 */}
        <Col xs={24} lg={8}>
          <Card 
            title={
              <Space>
                <StarOutlined style={{ color: 'white' }} />
                <span style={{ fontWeight: 'bold', color: 'white' }}>系统特色</span>
              </Space>
            }
            style={{ borderRadius: 16, marginBottom: 24 }}
            headStyle={{
              background: 'linear-gradient(90deg, #faad14 0%, #fa8c16 100%)',
              color: 'white',
              borderRadius: '16px 16px 0 0',
            }}
          >
            <Timeline
              items={[
                {
                  dot: <SafetyCertificateOutlined style={{ fontSize: '16px', color: '#52c41a' }} />,
                  color: '#52c41a',
                  children: (
                    <div>
                      <Text strong style={{ color: '#333' }}>安全可靠</Text>
                      <br />
                      <Text type="secondary">多重身份验证，数据加密存储</Text>
                    </div>
                  ),
                },
                {
                  dot: <ThunderboltOutlined style={{ fontSize: '16px', color: '#1890ff' }} />,
                  color: '#1890ff',
                  children: (
                    <div>
                      <Text strong style={{ color: '#333' }}>高效便捷</Text>
                      <br />
                      <Text type="secondary">一键操作，批量处理数据</Text>
                    </div>
                  ),
                },
                {
                  dot: <RocketOutlined style={{ fontSize: '16px', color: '#722ed1' }} />,
                  color: '#722ed1',
                  children: (
                    <div>
                      <Text strong style={{ color: '#333' }}>智能分析</Text>
                      <br />
                      <Text type="secondary">数据可视化，智能统计报告</Text>
                    </div>
                  ),
                },
                {
                  dot: <StarOutlined style={{ fontSize: '16px', color: '#faad14' }} />,
                  color: '#faad14',
                  children: (
                    <div>
                      <Text strong style={{ color: '#333' }}>用户友好</Text>
                      <br />
                      <Text type="secondary">简洁界面，操作直观易懂</Text>
                    </div>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Welcome;
