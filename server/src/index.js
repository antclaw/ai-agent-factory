const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const agentService = require('./src/services/agentService');
const { initDatabase } = require('./src/services/databaseService');

// 初始化数据库
initDatabase();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.get('/api/agents', (req, res) => {
  const agents = [
    {
      id: 'planner',
      name: 'Planner Agent',
      description: 'Task breakdown and planning',
      icon: '📋',
      version: '1.0.0',
      author: 'AI Agent Factory'
    },
    {
      id: 'coder',
      name: 'Coder Agent',
      description: 'Code implementation with TDD',
      icon: '💻',
      version: '1.0.0',
      author: 'AI Agent Factory'
    },
    {
      id: 'reviewer',
      name: 'Reviewer Agent',
      description: 'Code quality and security review',
      icon: '🔍',
      version: '1.0.0',
      author: 'AI Agent Factory'
    },
    {
      id: 'researcher',
      name: 'Researcher Agent',
      description: 'Information gathering and research',
      icon: '🔬',
      version: '1.0.0',
      author: 'AI Agent Factory'
    }
  ];
  res.json(agents);
});

app.get('/api/agents/:id', (req, res) => {
  const agentId = req.params.id;
  const agents = {
    planner: {
      id: 'planner',
      name: 'Planner Agent',
      description: 'Task breakdown and planning',
      icon: '📋',
      version: '1.0.0',
      author: 'AI Agent Factory',
      skills: ['Task Analysis', 'Implementation Planning', 'Dependency Identification', 'Priority Assessment'],
      config: {
        defaultModel: 'gpt-4',
        maxSteps: 10,
        autoSave: true
      }
    },
    coder: {
      id: 'coder',
      name: 'Coder Agent',
      description: 'Code implementation with TDD',
      icon: '💻',
      version: '1.0.0',
      author: 'AI Agent Factory',
      skills: ['TDD Implementation', 'Code Quality', 'Error Handling', 'Documentation', 'Security'],
      config: {
        defaultModel: 'gpt-4',
        testCoverageTarget: 80,
        autoFormat: true
      }
    },
    reviewer: {
      id: 'reviewer',
      name: 'Reviewer Agent',
      description: 'Code quality and security review',
      icon: '🔍',
      version: '1.0.0',
      author: 'AI Agent Factory',
      skills: ['Code Quality Review', 'Security Audit', 'Performance Analysis', 'Best Practices Check'],
      config: {
        defaultModel: 'gpt-4',
        severityLevels: ['Critical', 'Major', 'Minor', 'Suggestion']
      }
    },
    researcher: {
      id: 'researcher',
      name: 'Researcher Agent',
      description: 'Information gathering and research',
      icon: '🔬',
      version: '1.0.0',
      author: 'AI Agent Factory',
      skills: ['Web Search', 'Documentation Review', 'Pattern Recognition', 'Solution Evaluation'],
      config: {
        defaultModel: 'gpt-4',
        searchEngines: ['google', 'github', 'stackoverflow'],
        maxSources: 10
      }
    }
  };

  if (agents[agentId]) {
    res.json(agents[agentId]);
  } else {
    res.status(404).json({ error: 'Agent not found' });
  }
});

app.post('/api/agents/:id/config', (req, res) => {
  const agentId = req.params.id;
  const config = req.body;

  // Save configuration (in production, save to database)
  console.log(`Saving config for ${agentId}:`, config);

  res.json({
    success: true,
    message: 'Configuration saved',
    agentId,
    config
  });
});

// 用户认证相关 API
app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // 在生产环境中，这里应该使用 bcrypt 哈希密码
  const password_hash = password; // TODO: 使用 bcrypt

  db.run(
    `INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)`,
    [email, password_hash, name],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Email already exists' });
        }
        return res.status(500).json({ error: 'Registration failed' });
      }

      res.json({
        success: true,
        message: 'Registration successful',
        userId: this.lastID
      });
    }
  );
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  db.get(
    `SELECT * FROM users WHERE email = ?`,
    [email],
    function(err, user) {
      if (err) {
        return res.status(500).json({ error: 'Login failed' });
      }

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // 在生产环境中，这里应该验证密码哈希
      if (user.password_hash !== password) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      res.json({
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    }
  );
});

// Agent 运行相关 API
app.post('/api/agents/:id/execute', async (req, res) => {
  try {
    const agentId = req.params.id;
    const { input, config } = req.body;

    if (!input) {
      return res.status(400).json({ error: 'Input is required' });
    }

    const result = await agentService.executeAgent(agentId, input, config);

    res.json({
      success: true,
      agentId,
      result
    });
  } catch (error) {
    console.error('Agent execution error:', error);
    res.status(500).json({
      error: 'Agent execution failed',
      message: error.message
    });
  }
});

app.get('/api/agents/:id/history', (req, res) => {
  const agentId = req.params.id;

  // 模拟历史记录
  const history = [
    {
      id: `exec-${Date.now() - 3600000}`,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      input: 'Implement user authentication',
      status: 'completed',
      duration: 4500
    },
    {
      id: `exec-${Date.now() - 7200000}`,
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      input: 'Review code for security issues',
      status: 'completed',
      duration: 3200
    }
  ];

  res.json({
    success: true,
    agentId,
    history
  });
});

// Static files for client build
app.use(express.static(path.join(__dirname, '../client/dist')));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
