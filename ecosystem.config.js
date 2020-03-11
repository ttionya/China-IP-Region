module.exports = {
  apps: [
    {
      name: 'China-IP-Region',
      script: './dist/index.js',
      watch: false,
      env: {
        NODE_PORT: 8101,
      },
      max_restarts: 5,
    },
  ],
}
