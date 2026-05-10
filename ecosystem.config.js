module.exports = {
  apps: [{
    name: 'yihuixuan-admin',
    script: 'npm',
    args: 'start',
    cwd: '/home/ubuntu/yihuixuan-admin',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3003
    },
    error_file: '/home/ubuntu/logs/admin-error.log',
    out_file: '/home/ubuntu/logs/admin-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    autorestart: true,
    watch: false,
    max_memory_restart: '500M'
  }]
}
