const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const morgan  = require('morgan');
const dotenv  = require('dotenv');

dotenv.config();

const logger               = require('./utils/logger');
const { verifyTransporter } = require('./utils/mailer');
const { globalLimiter }    = require('./middleware/rateLimiter');
const connectDB            = require('./config/db');
const contactRouter        = require('./routes/contact');

const app  = express();
const PORT = process.env.PORT || 5000;

// ─── Security Headers (Helmet) ────────────────────────────────────────────────
app.use(helmet());

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.FRONTEND_ORIGIN || 'http://localhost:5173').split(',');

app.use(cors({
  origin: (origin, callback) => {
    // Allow Postman / curl (no origin) in development
    if (!origin && process.env.NODE_ENV !== 'production') return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin '${origin}' is not allowed.`));
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// ─── HTTP Request Logging ─────────────────────────────────────────────────────
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ─── Body Parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));        // Prevent large payload attacks
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ─── Global Rate Limiter ──────────────────────────────────────────────────────
app.use(globalLimiter);

// ─── Request ID Middleware ────────────────────────────────────────────────────
const { v4: uuidv4 } = require('uuid');
app.use((req, res, next) => {
  req.requestId = uuidv4();
  res.setHeader('X-Request-ID', req.requestId);
  next();
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/contact', contactRouter);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status:    'OK',
    message:   'Portfolio backend is running.',
    requestId: req.requestId,
    uptime:    process.uptime().toFixed(2) + 's',
    timestamp: new Date().toISOString(),
  });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.', requestId: req.requestId });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  logger.error('Unhandled error', { message: err.message, requestId: req.requestId });
  res.status(500).json({
    success:   false,
    message:   'An internal server error occurred.',
    requestId: req.requestId,
  });
});

// ─── Startup ──────────────────────────────────────────────────────────────────
async function startServer() {
  // Connect to MongoDB
  try {
    await connectDB();
  } catch (err) {
    logger.error('❌ Failed to connect to MongoDB — server will not start.', { reason: err.message });
    process.exit(1);
  }

  // Verify email credentials before accepting requests
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      await verifyTransporter();
      logger.info('✅ SMTP transporter verified — email is ready.');
    } catch (err) {
      logger.warn('⚠️  SMTP verification failed — check EMAIL_USER / EMAIL_PASS in .env', {
        reason: err.message,
      });
    }
  } else {
    logger.warn('⚠️  Email credentials not set — contact form will not send emails until .env is configured.');
  }

  app.listen(PORT, () => {
    logger.info(`🚀 Portfolio backend running`, {
      url:            `http://localhost:${PORT}`,
      allowedOrigins,
      environment:    process.env.NODE_ENV || 'development',
    });
  });
}

startServer();
