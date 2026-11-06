# Chat Application - Backend API

Modular Monolithic Node.js & Express.js backend with MVC principles for the WhatsApp-style chatting web application.

## 🏗️ Architecture Overview

The backend uses a **Modular Monolithic Architecture** combined with **MVC (Model-View-Controller)** principles:

- **Modular Monolith**: Each domain (Health, Private Chat, Group Chat, Status, Calls) is encapsulated within its own module in `src/modules/<module-name>/`. This keeps business boundaries clean and facilitates easy extraction or scaling in the future.
- **MVC & Service Pattern**:
  - **Model (`models/`)**: Defines the data schema and models (prepared for MongoDB / Mongoose).
  - **Controller (`controllers/`)**: Handles HTTP requests, input validation, and coordinates service responses.
  - **Service (`services/`)**: Encapsulates core business logic and database interactions.
  - **View / Presentation**: Standardized JSON responses handled via `utils/apiResponse.js`.
- **Cross-cutting Infrastructure**: Centralized routing, global error handling, environment configuration, and logging are separated into dedicated directories (`config/`, `middlewares/`, `utils/`, `routes/`).

---

## 📁 Directory Structure

```text
backend/
├── .env                  # Local environment configuration (ignored by git)
├── .env.example          # Template environment file
├── .gitignore            # Git ignore rules for backend
├── package.json          # Project scripts and dependencies
├── README.md             # Backend documentation
└── src/
    ├── app.js            # Express application setup and global middleware
    ├── server.js         # HTTP server entry point and process lifecycle
    ├── config/
    │   └── env.js        # Environment variable loader and validator
    ├── middlewares/
    │   ├── errorHandler.js   # Centralized error handler returning clean JSON
    │   ├── notFoundHandler.js# 404 Not Found handler
    │   └── requestLogger.js  # Console HTTP request logger
    ├── modules/
    │   ├── health/           # System health check module
    │   │   ├── controllers/
    │   │   │   └── health.controller.js
    │   │   └── routes/
    │   │       └── health.routes.js
    │   ├── private-chat/     # 1-on-1 private messaging module
    │   │   ├── controllers/
    │   │   │   └── privateChat.controller.js
    │   │   ├── models/
    │   │   │   └── privateChat.model.js
    │   │   ├── routes/
    │   │   │   └── privateChat.routes.js
    │   │   └── services/
    │   │       └── privateChat.service.js
    │   ├── group-chat/       # Group messaging, membership, admin controls
    │   │   ├── controllers/
    │   │   │   └── groupChat.controller.js
    │   │   ├── models/
    │   │   │   └── groupChat.model.js
    │   │   ├── routes/
    │   │   │   └── groupChat.routes.js
    │   │   └── services/
    │   │       └── groupChat.service.js
    │   ├── status/           # 24-hour stories / status updates
    │   │   ├── controllers/
    │   │   │   └── status.controller.js
    │   │   ├── models/
    │   │   │   └── status.model.js
    │   │   ├── routes/
    │   │   │   └── status.routes.js
    │   │   └── services/
    │   │       └── status.service.js
    │   └── call/             # Audio / Video calling logs & signaling
    │       ├── controllers/
    │       │   └── call.controller.js
    │       ├── models/
    │       │   └── call.model.js
    │       ├── routes/
    │       │   └── call.routes.js
    │       └── services/
    │           └── call.service.js
    ├── routes/
    │   └── index.js          # Master router aggregating all module routes under /api
    └── utils/
        ├── apiResponse.js    # Standardized API response structure
        └── appError.js       # Operational error class
```

---

## 🚀 Quick Start Guide

### 1. Navigate to the backend folder
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the server

- **Development mode (with auto-reload via Nodemon):**
  ```bash
  npm run dev
  ```

- **Production mode:**
  ```bash
  npm start
  ```

---

## 🩺 Health Check Endpoint

Once the server is running, verify it by visiting or sending a GET request:

```http
GET http://localhost:5000/api/health
```

**Expected JSON Response:**
```json
{
  "success": true,
  "message": "Backend service is up and running",
  "data": {
    "uptime": "1.23s",
    "timestamp": "2026-11-05T08:55:00.000Z",
    "environment": "development",
    "service": "chat-app-backend",
    "status": "healthy"
  }
}
```

