import { useState, useEffect } from 'react'
import { Card, Button, Table, Tag, Progress, Space, message, Upload, Alert } from 'antd'
import {
  RocketOutlined,
  WindowsOutlined,
  AppleOutlined,
  LinuxOutlined,
  CheckCircleOutlined,
  CloudUploadOutlined
} from '@ant-design/icons'
import axios from 'axios'

function AgentDeploy() {
  const [builds, setBuilds] = useState([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    fetchBuilds()
  }, [])

  const fetchBuilds = async () => {
    try {
      const response = await axios.get('/api/builds')
      setBuilds(response.data)
    } catch (error) {
      console.error('获取构建记录失败', error)
    }
  }

  const handleUpload = () => {
    message.info('上传功能开发中...')
  }

  const handleRelease = () => {
    message.info('发布功能开发中...')
  }

  const platformColumns = [
    {
      title: '平台',
      dataIndex: 'platform',
      key: 'platform',
      render: (platform) => {
        const icons = {
          windows: <WindowsOutlined />,
          macos: <AppleOutlined />,
          linux: <LinuxOutlined />
        }
        return (
          <Space>
            {icons[platform]}
            <span>{platform.toUpperCase()}</span>
          </Space>
        )
      }
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          building: 'processing',
          ready: 'success',
          failed: 'error'
        }
        return <Tag color={colors[status]}>{status}</Tag>
      }
    },
    {
      title: '文件大小',
      dataIndex: 'size',
      key: 'size',
      render: (size) => `${(size / 1024 / 1024).toFixed(2)} MB`
    },
    {
      title: '上传时间',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
      render: (time) => new Date(time).toLocaleString('zh-CN')
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<RocketOutlined />}
            onClick={handleRelease}
          >
            发布
          </Button>
          <Button
            type="link"
            icon={<CloudUploadOutlined />}
            onClick={handleUpload}
          >
            上传
          </Button>
        </Space>
      )
    }
  ]

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>部署发布</h1>
        <p style={{ color: '#666' }}>配置多平台发布和版本管理</p>
      </div>

      <Alert
        message="提示"
        description="上传构建文件后，系统将自动生成各平台的可执行文件。支持 Windows、macOS 和 Linux 平台。"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Card title="平台构建配置" bordered={false}>
        <Table
          columns={platformColumns}
          dataSource={builds}
          rowKey="id"
          loading={builds.length === 0}
        />
      </Card>

      <Card title="发布配置" bordered={false} style={{ marginTop: 24 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button
            type="primary"
            size="large"
            icon={<RocketOutlined />}
            onClick={handleRelease}
          >
            创建新发布版本
          </Button>
          <Button
            size="large"
            icon={<CloudUploadOutlined />}
            onClick={handleUpload}
          >
            上传构建文件
          </Button>
        </Space>
      </Card>
    </div>
  )
}

export default AgentDeploy
