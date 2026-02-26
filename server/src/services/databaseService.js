const sqlite3 = require('sqlite3').verbose();
const path = require('path');

/**
 * Database Service - SQLite 数据库管理
 */

// 数据库路径
const DB_PATH = path.join(__dirname, '../../data/ai_agent_factory.db');

// 创建数据库连接
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('数据库连接失败:', err.message);
  } else {
    console.log('数据库连接成功');
  }
});

// 初始化数据库表
function initDatabase() {
  const sql = `
    -- 用户表
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      name VARCHAR(100),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Agent 配置表
    CREATE TABLE IF NOT EXISTS agent_configs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      agent_id VARCHAR(50) NOT NULL,
      config TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(user_id, agent_id)
    );

    -- Agent 执行历史表
    CREATE TABLE IF NOT EXISTS agent_executions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      agent_id VARCHAR(50) NOT NULL,
      input TEXT NOT NULL,
      output TEXT,
      status VARCHAR(20) DEFAULT 'completed',
      duration INTEGER,
      error_message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- Agent 市场表
    CREATE TABLE IF NOT EXISTS agent_market (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      agent_id VARCHAR(50) UNIQUE NOT NULL,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      icon VARCHAR(50),
      version VARCHAR(20),
      author VARCHAR(100),
      skills TEXT,
      download_count INTEGER DEFAULT 0,
      rating DECIMAL(3,2) DEFAULT 5.00,
      is_public INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 创建索引
    CREATE INDEX IF NOT EXISTS idx_agent_configs_user_id ON agent_configs(user_id);
    CREATE INDEX IF NOT EXISTS idx_agent_executions_user_id ON agent_executions(user_id);
    CREATE INDEX IF NOT EXISTS idx_agent_executions_agent_id ON agent_executions(agent_id);
  `;

  db.run(sql, (err) => {
    if (err) {
      console.error('数据库初始化失败:', err.message);
    } else {
      console.log('数据库表初始化成功');

      // 插入默认 Agent 市场
      insertDefaultAgents();
    }
  });
}

// 插入默认 Agent 市场
function insertDefaultAgents() {
  const agents = [
    {
      agent_id: 'planner',
      name: 'Planner Agent',
      description: 'Task breakdown and planning',
      icon: '📋',
      version: '1.0.0',
      author: 'AI Agent Factory',
      skills: JSON.stringify(['Task Analysis', 'Implementation Planning', 'Dependency Identification', 'Priority Assessment']),
      download_count: 0,
      rating: 5.00
    },
    {
      agent_id: 'coder',
      name: 'Coder Agent',
      description: 'Code implementation with TDD',
      icon: '💻',
      version: '1.0.0',
      author: 'AI Agent Factory',
      skills: JSON.stringify(['TDD Implementation', 'Code Quality', 'Error Handling', 'Documentation', 'Security']),
      download_count: 0,
      rating: 5.00
    },
    {
      agent_id: 'reviewer',
      name: 'Reviewer Agent',
      description: 'Code quality and security review',
      icon: '🔍',
      version: '1.0.0',
      author: 'AI Agent Factory',
      skills: JSON.stringify(['Code Quality Review', 'Security Audit', 'Performance Analysis', 'Best Practices Check']),
      download_count: 0,
      rating: 5.00
    },
    {
      agent_id: 'researcher',
      name: 'Researcher Agent',
      description: 'Information gathering and research',
      icon: '🔬',
      version: '1.0.0',
      author: 'AI Agent Factory',
      skills: JSON.stringify(['Web Search', 'Documentation Review', 'Pattern Recognition', 'Solution Evaluation']),
      download_count: 0,
      rating: 5.00
    }
  ];

  agents.forEach(agent => {
    db.run(
      `INSERT OR IGNORE INTO agent_market (agent_id, name, description, icon, version, author, skills, download_count, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        agent.agent_id,
        agent.name,
        agent.description,
        agent.icon,
        agent.version,
        agent.author,
        agent.skills,
        agent.download_count,
        agent.rating
      ]
    );
  });

  console.log('默认 Agent 市场数据已插入');
}

module.exports = {
  db,
  initDatabase
};
