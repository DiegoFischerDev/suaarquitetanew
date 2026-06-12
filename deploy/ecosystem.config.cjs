module.exports = {
  apps: [
    {
      name: "suaarquiteta",
      script: "server.js",
      cwd: "/var/www/suaarquiteta",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
      },
    },
  ],
};
