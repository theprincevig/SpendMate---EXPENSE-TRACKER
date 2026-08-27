# SpendMate AI-Powered Expense Tracker

SpendMate is a full-stack personal finance tracker with a React/Vite frontend and an Express/MongoDB backend. It helps authenticated users record income and expenses, review dashboard summaries and charts, export transaction reports, manage their profile and currency, and ask an AI assistant questions about their spending.

## Features

- JWT authentication stored in an HTTP cookie
- Dashboard with finance summaries, recent transactions, income and expense charts
- Add and delete income and expense records
- PDF downloads for income and expense reports
- Profile viewing and editing, including optional Cloudinary avatar uploads
- Password changes and logout
- Currency selection with exchange-rate data
- AI Expense Assistant with:
  - Expense questions answered from the user's own expense records
  - Overspending analysis with practical recommendations
  - Persistent chat sessions and message history
  - Chat titles generated automatically after the conversation begins
  - New-chat and chat-history deletion controls
  - A disabled state when the OpenAI usage limit is reached

## Tech Stack

- Frontend:
  - ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  - ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  - ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  - ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
  - ![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=react&logoColor=white)
  - ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
  - ![Recharts](https://img.shields.io/badge/Recharts-BAED91?style=for-the-badge)

- Backend:
  - ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
  - ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
  - ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
  - ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

- Integrations:
  - ![Multer](https://img.shields.io/badge/Multer-FF6F00?style=for-the-badge)
  - ![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
  - ![Exchange Rate](https://img.shields.io/badge/Exchange_Rate-CA4245?style=for-the-badge)
  - ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

- Security and operations:
  - ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
  - ![Helmet](https://img.shields.io/badge/Helmet-000000?style=for-the-badge)
  - ![Compression](https://img.shields.io/badge/Compression-FF6F00?style=for-the-badge)
  - ![CORS](https://img.shields.io/badge/CORS-00599C?style=for-the-badge)
  - ![Cookie Parser](https://img.shields.io/badge/Cookie_Parser-6DB33F?style=for-the-badge)

## Project Structure

```text
backend/
  config/       Database, AI, currency, and Cloudinary configuration
  controller/   HTTP request handlers
  middleware/   Authentication middleware
  models/       User, income, expense, and AI chat models
  routes/       API route definitions
  services/     OpenAI and exchange-rate integrations
  utils/        Token generation, intent detection, and overspending analysis
frontend/
  src/pages/    Authentication, dashboard, AI chat, and profile screens
  src/components/
    charts/     Dashboard charts
    chats/      AI chat body, input, history, and quick actions
    layouts/    Dashboard and authentication layouts
  src/store/    Zustand application stores
  src/utils/    API paths and shared utilities
```

## Prerequisites

- Node.js 18 or later
- npm
- MongoDB (Atlas or a local instance)
- OpenAI API key for AI features
- Cloudinary account for profile-image uploads

## Setup

Install dependencies from the repository root:

```bash
npm run install-backend
npm run install-frontend
```

Create `backend/.env` with the required values:

```env
PORT=5000
ATLASDB_URI=mongodb_connection_string
JWT_SECRET=long_random_secret
OPENAI_API_KEY=openai_api_key
CLOUD_NAME=cloudinary_name
CLOUD_API_KEY=cloudinary_api_key
CLOUD_API_SECRET=cloudinary_api_secret
NODE_ENV=development
CLIENT_URL=https://your-frontend.example.com
```

`CLIENT_URL` is used for CORS in production. Cloudinary variables are required for avatar uploads; the database, JWT, and OpenAI variables are required for their corresponding features. The backend exits when `ATLASDB_URI` is missing.

Start the services in separate terminals:

```bash
cd backend
npm run dev
```

```bash
cd frontend
npm run dev
```

The frontend is served at `http://127.0.0.1:5173` and the backend defaults to `http://localhost:5000`. Set `VITE_API_BASE_URL` in the frontend environment when the backend is hosted at another URL; otherwise the frontend uses `http://localhost:5000`.

Root-level scripts:

```bash
npm run install-backend
npm run install-frontend
npm run build-frontend
```

Useful frontend checks:

```bash
cd frontend
npm run lint
npm run build
```

## Frontend Routes

Public routes are `/`, `/login`, and `/signup`. The following routes require authentication:

- `/dashboard` - financial overview
- `/income` - income records and PDF export
- `/expense` - expense records, PDF export, and AI assistant access
- `/ai/chat` - full-page AI assistant
- `/profile` - profile details and currency selection
- `/profile/edit` - update profile details and avatar
- `/change-password` - change the account password

## API Reference

All API routes are served from the backend and use the `/api` prefix. Protected routes require the `jwt` cookie.

### Authentication

| Method | Endpoint                    | Description                              |
| ------ | --------------------------- | ---------------------------------------- |
| POST   | `/api/auth/register`        | Create an account                        |
| POST   | `/api/auth/login`           | Log in and set the JWT cookie            |
| GET    | `/api/auth/session`         | Check the current session                |
| POST   | `/api/auth/change-password` | Change the authenticated user's password |
| DELETE | `/api/auth/logout`          | Log out and clear the session            |

### Finance and profile

| Method | Endpoint                   | Description                                  |
| ------ | -------------------------- | -------------------------------------------- |
| GET    | `/api/dashboard`           | Get aggregated dashboard data                |
| POST   | `/api/income/add`          | Add income                                   |
| GET    | `/api/income/get`          | Get the user's income records                |
| GET    | `/api/income/pdf`          | Download an income PDF report                |
| DELETE | `/api/income/delete/:id`   | Delete an income record                      |
| POST   | `/api/expense/add`         | Add an expense                               |
| GET    | `/api/expense/get`         | Get the user's expense records               |
| GET    | `/api/expense/pdf`         | Download an expense PDF report               |
| DELETE | `/api/expense/delete/:id`  | Delete an expense record                     |
| GET    | `/api/profile/me`          | View the profile                             |
| PUT    | `/api/profile/me`          | Update profile fields or upload `profilePic` |
| PATCH  | `/api/profile/me/currency` | Change the preferred currency                |
| GET    | `/api/exchange-rates`      | Get exchange-rate data                       |

### AI chat

| Method | Endpoint                      | Description                                          |
| ------ | ----------------------------- | ---------------------------------------------------- |
| POST   | `/api/ai/chat`                | Send a message and create or continue a chat session |
| GET    | `/api/ai/history`             | List the authenticated user's chat sessions          |
| GET    | `/api/ai/chat/:chatId`        | Load messages for one chat session                   |
| DELETE | `/api/ai/chat/delete/:chatId` | Delete a chat and its messages                       |

Send a message with an optional `chatId`:

```json
{
  "message": "Am I overspending on groceries?",
  "chatId": null
}
```

A successful response includes the session identifier and reply:

```json
{
  "success": true,
  "chatId": "chat_id",
  "reply": "AI response"
}
```

When the OpenAI quota is exhausted, the endpoint responds with HTTP `429` and `code: "AI_QUOTA_EXCEEDED"`. The frontend then displays the limit message and disables further AI requests for that session. An authenticated user with no expenses receives a prompt to add expenses first.

## AI Assistant Implementation

The AI controller loads only the authenticated user's expenses and preferred currency. `detectIntent` selects either a general expense question or the overspending flow. Overspending is calculated locally before its summary is sent to OpenAI. The AI service calls `gpt-4o-mini` with a low temperature and a system instruction never to invent financial data.

Chat sessions and individual messages are stored in MongoDB. A new session is created when `chatId` is omitted; subsequent requests continue that session. The first messages are used to generate a more descriptive session title.

## Troubleshooting and Deployment

- `ATLASDB_URI` missing: the backend exits during startup.
- `401` responses: log in again and check that the `jwt` cookie is being sent with credentials.
- AI errors: check `OPENAI_API_KEY`, account quota, and backend logs. Quota exhaustion is reported as `AI_QUOTA_EXCEEDED` with HTTP `429`.
- CORS errors in production: set `CLIENT_URL` to the exact frontend origin.
- The backend health check is available at `GET /` and returns `SpendMate API is running...`.

For deployment, provide the backend environment variables through the hosting platform and build the frontend with `npm run build-frontend`. Keep API keys and database credentials out of source control.

## License

The project is distributed under the ISC license specified in the root `package.json`.

## Author

Built with ❤ by **[@theprincevig](https://github.com/theprincevig)**
