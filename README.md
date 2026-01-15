# SpendMate - AI-Powered EXPENSE TRACKER

**SpendMate** is a modern, full-stack expense tracker built with a React + Vite frontend and an Express + MongoDB backend. Its unique feature is an **AI Expense Assistant** that uses the OpenAI API to analyze a user's personal expenses, warn about overspending, and provide friendly, actionable financial advice.

---

## Key Features

- **Add / Edit / Delete Expenses & Income** (CRUD)
- **Dashboard & charts** for quick finance overview
- **PDF export** for income & expense reports
- **User authentication** (JWT-based cookies)
- **Cloud uploads** (Cloudinary integration) for avatars/receipts
- **AI Expense Assistant (Unique)** — Uses OpenAI to:
  - Answer questions about your expenses (e.g., "How much did I spend on food last month?").
  - Detect and warn about overspending and give 2 practical tips.
  - Strict prompt rules: replies only use the user's expense data and never hallucinate.

---

## Tech Stack

- **Frontend**: [React](https://reactjs.org/), [Vite](https://vitejs.dev/)
- **Backend**: [Express.js](https://expressjs.com/), [MongoDB](https://www.mongodb.com/)
- **Authentication**: [JWT](https://jwt.io/)
- **AI Integration**: [OpenAI API](https://openai.com/)
- **Cloud Storage**: [Cloudinary](https://cloudinary.com/)

---

## Repo Structure (high level)

- `backend/` - Express server, routes, controllers, models, AI service
  - `controller/ai.controller.js` - AI chat controller
  - `utils/ai.service.js` - OpenAI integration & prompt orchestration
  - `config/ai.Config.js` - Prompt templates for expenses & overspending
- `frontend/` - React (Vite), components, stores, utils
  - `src/components/chats/` - AI chat UI: `AiFloatingButton`, `AiMessageInput`, `AiChatBody`, etc.
  - `src/lib/axios.js` - Axios instance (with credentials)
  - `src/utils/apiPaths.js` - API path configuration

---

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas (or any MongoDB, `ATLASDB_URI` env var)
- OpenAI API Key (for the AI assistant)
- Cloudinary account (optional, for avatar/receipt uploads)

---

## Quickstart

1. Clone the repo

   ```bash
   git clone <repo-url>
   cd "SpendMate - EXPENSE TRACKER"
   ```

2. Backend

   ```bash
   cd backend
   cp .env.example .env   # create .env from example (or create manually)
   npm install
   npm run dev            # nodemon server.js (dev)
   # OR
   npm start              # start server
   ```

3. Frontend

   ```bash
   cd frontend
   npm install
   npm run dev            # Vite dev server
   ```

Open the app in the browser (frontend Vite dev server usually on `http://localhost:5173`) and ensure the backend `PORT` (defaults used in `.env`) and frontend `BASE_URL` (`src/utils/apiPaths.js`) match.

---

## Environment Variables

Create `backend/.env` with the following (example):

```env
PORT=5000
ATLASDB_URI=your_mongodb_connection_string
OPENAI_API_KEY=sk-...
JWT_SECRET=some-long-secret
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

Notes:

- If `ATLASDB_URI` is not set the server exits with an error (see `config/db.js`).
- `OPENAI_API_KEY` is required for AI features. The backend uses the `openai` package to call `gpt-4o-mini` with low temperature and a system message that says: "You are a strict personal finance assistant. Never invent data." (See `backend/utils/ai.service.js`).

---

## API Reference (selected)

> Base URLs

- Backend: `http://localhost:<PORT>` (default `PORT=5000`)
- Frontend expects `BASE_URL` = `http://localhost:5000` (see `frontend/src/utils/apiPaths.js`)

### Auth

- POST `/api/auth/register` — register a user
- POST `/api/auth/login` — login (sets `jwt` cookie)
- GET `/api/auth/me` — get current user (requires auth cookie)

### Income & Expense

- POST `/income/add` — add income (protected)
- GET `/income/get` — get incomes (protected)
- POST `/expense/add` — add expense (protected)
- GET `/expense/get` — get expenses (protected)

### Dashboard / Profile

- GET `/dashboard` — gets aggregated dashboard data
- GET `/profile/me` — get profile details

### AI Chat (Unique Feature)

- POST `/ai/chat` — **Protected**: requires authentication cookie (`jwt`)
  - Request body: `{ "message": "How am I doing on food spending?" }`
  - Success response: `{ success: true, reply: "<AI reply>" }`
  - If user has no expenses: returns a friendly prompt asking to add expenses
  - If AI quota exceeded: returns 500 with `reply: "AI usage limit reached. Please try again later."`

Example (curl with cookie set):

```bash
curl -X POST "http://localhost:5000/ai/chat" \
  -H "Content-Type: application/json" \
  -H "Cookie: jwt=<token_here>" \
  -d '{ "message": "Am I overspending on groceries?" }'
```

---

## How the AI Assistant Works (Technical overview)

- The frontend chat UI collects user input (`AiMessageInput`, `AiFloatingButton`) and sends messages to `/ai/chat`.
- The backend `ai.controller`:
  - Verifies the user via cookie-based JWT (`protect` middleware).
  - Loads the user's expenses and currency preferences.
  - Uses `detectIntent(message)` to decide the flow: either a general expense question or an overspending analysis.
  - Builds a prompt (see `backend/config/ai.Config.js`) and calls the OpenAI API via `backend/utils/ai.service.js`.
  - Returns `{ success: true, reply }` with the assistant's text.

Important prompt rules enforced server-side:

- Only answer using the user's expense data
- Be short, friendly and actionable
- Do not hallucinate or invent data

---

## Errors, Logs & Troubleshooting

- If you see `AI_QUOTA_EXCEEDED`, the API throws and the endpoint responds with `500` and a friendly message about quota limits.
- Missing `ATLASDB_URI` will cause the server to exit.
- Auth issues return `401` (missing/invalid `jwt` cookie).
- If chat replies are incorrect: confirm the `OPENAI_API_KEY` is valid and has sufficient quota, and inspect server logs for the actual API error.

---

## Development Tips

- Frontend uses `axios` instance with `withCredentials: true`. Authentication relies on cookie-based JWT set by the backend.
- To test AI flows quickly:
  - Create a test user via `/api/auth/register` and login to get `jwt` cookie
  - Add a few sample expenses via `/expense/add`
  - Use the chat UI or call `/ai/chat` directly

---

## Deployment Notes (short)

- Use environment variables in your hosting platform (e.g., Azure App Service, Heroku, Railway): `ATLASDB_URI`, `OPENAI_API_KEY`, `JWT_SECRET`, Cloudinary keys.
- Consider restricting the frontend & backend origins with CORS in production.
- Track OpenAI usage to avoid unexpected costs.

---

## License & Credits

- MIT License
- Built with ❤️ using React, Express, MongoDB, and OpenAI
