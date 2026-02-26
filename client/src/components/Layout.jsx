import { Layout, Menu, Button, Space } from 'antd'
import {
  AppstoreOutlined,
  ExperimentOutlined,
  RocketOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const { Header, Sider, Content } = Layout

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      key: '/market',
      icon: <AppstoreOutlined />,
      label: 'Agent 市场'
    },
    {
      key: '/studio',
      icon: <ExperimentOutlined />,
      label: 'Agent 工作台'
    },
    {
      key: '/deploy',
      icon: <RocketOutlined />,
      label: '部署发布'
    }
  ]

  const handleMenuClick = ({ key }) => {
    navigate(key)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          color: '#1890ff'
        }}>
          {collapsed ? '🎯' : 'AI Agent 装配厂'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 24px',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Space>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              onClick: () => setCollapsed(!collapsed),
              style: { fontSize: 18 }
            })}
            <span style={{ fontSize: 16 }}>AI Agent 装配厂</span>
          </Space>
          <Button type="primary">登录</Button>
        </Header>
        <Content
          style={{
            margin: '24px',
            padding: 24,
            minHeight: 280,
            background: '#fff',
            borderRadius: 8
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default Layout
