import { useState, useEffect } from 'react'
import { Card, Button, Tag, Row, Col, Space, Modal, message } from 'antd'
import {
  PlusOutlined,
  DownloadOutlined,
  StarOutlined,
  StarFilled
} from '@ant-design/icons'
import axios from 'axios'

function AgentMarket() {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [favorites, setFavorites] = useState(new Set())

  useEffect(() => {
    fetchAgents()
  }, [])

  const fetchAgents = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/agents')
      setAgents(response.data)
    } catch (error) {
      message.error('获取 Agent 列表失败')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (agent) => {
    try {
      message.loading({ content: `正在下载 ${agent.name}...`, key: 'download' })
      // 模拟下载
      await new Promise(resolve => setTimeout(resolve, 2000))
      message.success({ content: `${agent.name} 下载成功！`, key: 'download' })
    } catch (error) {
      message.error({ content: `下载 ${agent.name} 失败`, key: 'download' })
    }
  }

  const handleFavorite = (agentId) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(agentId)) {
      newFavorites.delete(agentId)
    } else {
      newFavorites.add(agentId)
    }
    setFavorites(newFavorites)
  }

  const handleViewDetails = (agent) => {
    setSelectedAgent(agent)
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Agent 市场</h1>
        <p style={{ color: '#666' }}>浏览和下载社区分享的 AI Agent 模板</p>
      </div>

      <Row gutter={[16, 16]}>
        {agents.map(agent => (
          <Col key={agent.id} xs={24} sm={12} lg={8}>
            <Card
              hoverable
              cover={
                <div style={{
                  height: 120,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 64,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}>
                  {agent.icon}
                </div>
              }
              actions={[
                <Button
                  key="view"
                  type="text"
                  icon={<StarOutlined />}
                  onClick={() => handleFavorite(agent.id)}
                >
                  {favorites.has(agent.id) ? '已收藏' : '收藏'}
                </Button>,
                <Button
                  key="download"
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={() => handleDownload(agent)}
                >
                  下载
                </Button>
              ]}
            >
              <Card.Meta
                title={agent.name}
                description={agent.description}
              />
              <div style={{ marginTop: 12 }}>
                <Tag color="blue">v{agent.version}</Tag>
                <Tag color="green">{agent.author}</Tag>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={selectedAgent?.name}
        open={!!selectedAgent}
        onCancel={() => setSelectedAgent(null)}
        footer={[
          <Button key="close" onClick={() => setSelectedAgent(null)}>
            关闭
          </Button>,
          <Button
            key="download"
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => selectedAgent && handleDownload(selectedAgent)}
          >
            下载
          </Button>
        ]}
      >
        {selectedAgent && (
          <div>
            <p style={{ fontSize: 16, marginBottom: 12 }}>{selectedAgent.description}</p>
            <p><strong>版本：</strong>{selectedAgent.version}</p>
            <p><strong>作者：</strong>{selectedAgent.author}</p>
            <p><strong>技能：</strong></p>
            <ul>
              {selectedAgent.skills?.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default AgentMarket
