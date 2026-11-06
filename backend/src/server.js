import http from 'http';
import app from './app.js';
import { config } from './config/env.js';

// Create HTTP server (ready for future Socket.io integration)
const server = http.createServer(app);

const PORT = config.port;

server.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`  🚀 Chat Application Backend Server running!`);
  console.log(`  📡 Port:        ${PORT}`);
  console.log(`  🌱 Environment: ${config.nodeEnv}`);
  console.log(`  🩺 Health check: http://localhost:${PORT}/api/health`);
  console.log(`=================================================`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err);
  process.exit(1);
});

// Graceful termination handling
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Gracefully shutting down...');
  server.close(() => {
    console.log('💥 Process terminated.');
  });
});

export default server;

