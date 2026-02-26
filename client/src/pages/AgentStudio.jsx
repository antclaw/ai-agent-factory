import { useState } from 'react'
import { Card, Button, Form, Input, Select, Slider, Space, message, Tabs, Spin, Alert, Steps, Tag } from 'antd'
import { SaveOutlined, PlayCircleOutlined, SettingOutlined, CheckCircleOutlined, LoadingOutlined, FileTextOutlined } from '@ant-design/icons'
import { useParams, useNavigate } from 'react-router-dom'

const { TextArea } = Input
const { TabPane } = Tabs
const { Step } = Steps

function AgentStudio() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [executing, setExecuting] = useState(false)
  const [executionResult, setExecutionResult] = useState(null)
  const [executionSteps, setExecutionSteps] = useState([])

  const handleSave = async (values) => {
    try {
      setLoading(true)
      // 保存配置
      await axios.post(`/api/agents/${id}/config`, values)
      message.success('配置保存成功')
    } catch (error) {
      message.error('配置保存失败')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleRun = async () => {
    const values = form.getFieldsValue()
    if (!values.input) {
      message.warning('请输入运行输入内容')
      return
    }

    try {
      setExecuting(true)
      setExecutionSteps([
        { title: 'Starting...', status: 'process' }
      ])

      // 执行 Agent
      const response = await axios.post(`/api/agents/${id}/execute`, {
        input: values.input,
        config: {
          model: values.model,
          temperature: values.temperature,
          maxTokens: values.maxTokens
        }
      })

      setExecutionResult(response.data.result)
      setExecutionSteps([
        { title: 'Completed', status: 'finish' }
      ])

      message.success('Agent 执行成功')
    } catch (error) {
      message.error('Agent 执行失败')
      console.error(error)
      setExecutionSteps([
        { title: 'Failed', status: 'error' }
      ])
    } finally {
      setExecuting(false)
    }
  }

  const renderExecutionResult = () => {
    if (!executionResult) return null

    return (
      <div style={{ marginTop: 24 }}>
        <Card title="执行结果" bordered={false}>
          <Alert
            message={executionResult.summary}
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />

          {executionResult.steps && (
            <div style={{ marginBottom: 16 }}>
              <Steps current={executionResult.steps.length - 1} direction="vertical">
                {executionResult.steps.map((step, index) => (
                  <Step
                    key={index}
                    title={step.description}
                    status={step.status === 'completed' ? 'finish' : step.status === 'in_progress' ? 'process' : 'error'}
                    icon={step.status === 'completed' ? <CheckCircleOutlined /> : step.status === 'in_progress' ? <LoadingOutlined /> : null}
                  />
                ))}
              </Steps>
            </div>
          )}

          {executionResult.artifacts && (
            <div>
              <h3>生成物</h3>
              {executionResult.artifacts.files && (
                <div style={{ marginBottom: 16 }}>
                  <h4><FileTextOutlined /> Files</h4>
                  <ul>
                    {executionResult.artifacts.files.map((file, index) => (
                      <li key={index}>
                        <strong>{file.name}</strong>
                        <Tag color="blue">{file.lines} lines</Tag>
                        <Tag color="green">{file.testCoverage}% coverage</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {executionResult.artifacts.taskList && (
                <div style={{ marginBottom: 16 }}>
                  <h4><FileTextOutlined /> Task List</h4>
                  <ul>
                    {executionResult.artifacts.taskList.map((task, index) => (
                      <li key={index}>
                        {task.task}
                        <Tag color={task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'orange' : 'blue'}>
                          {task.priority} ({task.estimatedHours}h)
                        </Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {executionResult.findings && (
                <div>
                  <h4><FileTextOutlined /> Findings</h4>
                  <ul>
                    {executionResult.findings.map((finding, index) => (
                      <li key={index}>
                        <Tag color={
                          finding.severity === 'critical' ? 'red' :
                          finding.severity === 'major' ? 'orange' :
                          finding.severity === 'minor' ? 'blue' : 'default'
                        }>
                          {finding.severity.toUpperCase()}
                        </Tag>
                        Line {finding.line}: {finding.issue}
                        <div style={{ color: '#666', fontSize: 12 }}>
                          {finding.suggestion}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {executionResult.sources && (
                <div>
                  <h4><FileTextOutlined /> Sources</h4>
                  <ul>
                    {executionResult.sources.map((source, index) => (
                      <li key={index}>
                        <a href={source.url} target="_blank" rel="noopener noreferrer">
                          {source.title}
                        </a>
                        <Tag color="green">Relevance: {Math.round(source.relevance * 100)}%</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Agent 工作台</h1>
        <p style={{ color: '#666' }}>配置和运行 AI Agent</p>
      </div>

      <Tabs defaultActiveKey="config">
        <TabPane tab={<><SettingOutlined /> 配置</>} key="config">
          <Card title="Agent 配置" bordered={false}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSave}
              initialValues={{
                model: 'gpt-4',
                temperature: 0.7,
                maxTokens: 2000,
                autoSave: true
              }}
            >
              <Form.Item
                label="Agent ID"
                name="agentId"
                initialValue={id || 'planner'}
                rules={[{ required: true, message: '请输入 Agent ID' }]}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="模型"
                name="model"
                rules={[{ required: true, message: '请选择模型' }]}
              >
                <Select>
                  <Select.Option value="gpt-4">GPT-4</Select.Option>
                  <Select.Option value="gpt-3.5-turbo">GPT-3.5 Turbo</Select.Option>
                  <Select.Option value="claude-3-opus">Claude 3 Opus</Select.Option>
                  <Select.Option value="claude-3-sonnet">Claude 3 Sonnet</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="温度"
                name="temperature"
                description="控制输出的随机性，0-1之间"
              >
                <Slider min={0} max={1} step={0.1} marks={{ 0: '确定', 0.5: '平衡', 1: '创意' }} />
              </Form.Item>

              <Form.Item
                label="最大 Token 数"
                name="maxTokens"
                description="控制输出的长度"
              >
                <Slider min={256} max={4096} step={256} marks={{ 256: '256', 2048: '2048', 4096: '4096' }} />
              </Form.Item>

              <Form.Item
                label="自动保存"
                name="autoSave"
                valuePropName="checked"
              >
                <Select>
                  <Select.Option value={true}>是</Select.Option>
                  <Select.Option value={false}>否</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="系统提示词" name="systemPrompt">
                <TextArea
                  rows={8}
                  placeholder="输入 Agent 的系统提示词..."
                />
              </Form.Item>

              <Form.Item label="自定义参数" name="customParams">
                <TextArea
                  rows={4}
                  placeholder='{"key": "value"}'
                />
              </Form.Item>

              <Form.Item label="运行输入" name="input" rules={[{ required: true, message: '请输入运行内容' }]}>
                <TextArea
                  rows={4}
                  placeholder="输入 Agent 需要处理的内容..."
                />
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    loading={loading}
                    htmlType="submit"
                  >
                    保存配置
                  </Button>
                  <Button
                    type="primary"
                    icon={<PlayCircleOutlined />}
                    loading={executing}
                    onClick={handleRun}
                  >
                    运行 Agent
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>

        <TabPane tab={<><PlayCircleOutlined /> 运行</>} key="run">
          <Card title="Agent 运行" bordered={false}>
            {executionResult ? (
              renderExecutionResult()
            ) : (
              <div style={{ padding: 24, textAlign: 'center', color: '#999' }}>
                <PlayCircleOutlined style={{ fontSize: 64, marginBottom: 16 }} />
                <p>配置并运行 Agent 以查看结果</p>
                <Button type="primary" icon={<PlayCircleOutlined />} onClick={() => form.setFieldsValue({ input: 'Implement user authentication' })}>
                  示例运行
                </Button>
              </div>
            )}
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default AgentStudio
