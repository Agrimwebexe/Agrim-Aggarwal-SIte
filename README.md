# Backend — Portfolio Contact API

A production-grade Express.js backend that handles contact form submissions, sending styled emails to the portfolio owner and an auto-reply confirmation to the visitor.

---

## Project Structure

```
backend/
├── middleware/
│   └── rateLimiter.js     # express-rate-limit — global + contact-specific limits
├── routes/
│   └── contact.js         # POST /api/contact — validate, sanitize, send emails
├── utils/
│   ├── logger.js          # Structured logger (coloured in dev, JSON in prod)
│   └── mailer.js          # Nodemailer transporter factory + SMTP verifier
├── .env.example           # Environment variable template (safe to commit)
├── .env                   # Your secrets — NEVER commit this
├── .gitignore
├── package.json
├── server.js              # Express app entry point
├── test.js                # Automated test suite (19 tests)
└── README.md
```

---

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Open `.env` and fill in every value:

| Variable            | Description |
|---------------------|-------------|
| `PORT`              | Server port (default: `5000`) |
| `NODE_ENV`          | `development` or `production` |
| `FRONTEND_ORIGIN`   | React app URL (e.g. `http://localhost:5173`). Comma-separate multiple. |
| `EMAIL_USER`        | Gmail address used to **send** emails |
| `EMAIL_PASS`        | Gmail **App Password** — see below |
| `EMAIL_RECEIVER`    | Address that **receives** submissions |

### 3. Generate a Gmail App Password

> Your regular Gmail password won't work — you must use an App Password.

1. Go to [myaccount.google.com](https://myaccount.google.com) → **Security**
2. Enable **2-Step Verification** (required first)
3. Search **"App Passwords"** → Select **Mail** / **Windows Computer**
4. Click **Generate** → copy the 16-character code into `EMAIL_PASS`

### 4. Run the Server

```bash
# Development (auto-restarts on save)
npm run dev

# Production
npm start
```

The server starts at `http://localhost:5000` and verifies your SMTP credentials on boot.

### 5. Run Tests

With the server running in another terminal:

```bash
npm test
```

All 19 tests should pass (✅ 19 passed, 0 failed).

---

## API Reference

### `GET /api/health`

Liveness check — useful for uptime monitors.

**Response (200):**
```json
{
  "status": "OK",
  "message": "Portfolio backend is running.",
  "requestId": "d94eda2a-cffe-4711-a795-83202671a533",
  "uptime": "12.58s",
  "timestamp": "2026-04-26T09:50:02.587Z"
}
```

---

### `POST /api/contact`

Receives a contact form submission, validates it, and dispatches two emails concurrently:
1. **Owner notification** — sent to `EMAIL_RECEIVER` with the visitor's details.
2. **Auto-reply** — sent to the visitor confirming receipt.

**Request Body (JSON):**
```json
{
  "name":    "John Doe",
  "email":   "john@example.com",
  "message": "Hello, I'd love to collaborate on a project!"
}
```

**Validation rules:**
- `name` — min 2 characters
- `email` — must be a valid email format
- `message` — min 10 characters, max 2000 characters

**Responses:**

| Status | Meaning |
|--------|---------|
| `200`  | Emails sent successfully |
| `400`  | Validation failed — `errors` array in body |
| `429`  | Rate limited — max 5 submissions per IP per 15 minutes |
| `500`  | SMTP failure |

Every response includes a `requestId` UUID for tracing.

---

## Security Features

| Feature | Detail |
|---------|--------|
| **Helmet** | Sets 11 secure HTTP headers automatically |
| **Rate Limiting** | 5 contact submissions / 15 min per IP; 100 global requests / 15 min |
| **CORS** | Locked to `FRONTEND_ORIGIN` only |
| **Input Sanitization** | `<` and `>` stripped to prevent HTML injection |
| **Payload Size Limit** | Request body capped at 10 KB |
| **SMTP Verification** | Credentials verified at startup — misconfiguration is caught immediately |
| **No secrets in code** | All credentials live in `.env`, which is `.gitignore`'d |

---

## Deployment Notes

When deploying to a cloud provider (Railway, Render, Fly.io):

1. Set all `.env` variables as **environment variables** in the provider's dashboard — do not upload `.env`.
2. Set `NODE_ENV=production` — the logger will switch to JSON output for log aggregators.
3. Update `FRONTEND_ORIGIN` to your production frontend URL (e.g. `https://agrimaggarwal.dev`).
4. The `/api/health` endpoint is ready to use as a health check probe.
