import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import Layout from './components/Layout'
import AgentMarket from './pages/AgentMarket'
import AgentStudio from './pages/AgentStudio'
import AgentDeploy from './pages/AgentDeploy'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/market" replace />} />
            <Route path="market" element={<AgentMarket />} />
            <Route path="studio" element={<AgentStudio />} />
            <Route path="deploy" element={<AgentDeploy />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  )
}

export default App
