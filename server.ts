import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Persistent registrations file
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'registrations.json');

// Ensure data folder and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    mode: 'connected',
    service: 'Felix Plaza Nav Utsav Registration API',
    timestamp: new Date().toISOString()
  });
});

// Register endpoint
app.post('/api/register', (req, res) => {
  try {
    const { fullName, mobile, email, guests, city, whatsapp } = req.body || {};

    // Validate required fields
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({ error: 'Please provide a valid full name (minimum 2 characters).' });
    }

    const cleanMobile = String(mobile || '').replace(/\D/g, '');
    const mobileDigits = cleanMobile.length === 12 && cleanMobile.startsWith('91')
      ? cleanMobile.slice(2)
      : cleanMobile.length === 11 && cleanMobile.startsWith('0')
      ? cleanMobile.slice(1)
      : cleanMobile;

    if (!mobileDigits || mobileDigits.length !== 10) {
      return res.status(400).json({ error: 'Please provide a valid 10-digit mobile number.' });
    }

    if (!guests) {
      return res.status(400).json({ error: 'Please select the number of attendees.' });
    }

    if (email && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
      }
    }

    // Generate unique Pass Code (e.g., NU-847291)
    const passCode = `NU-${Math.floor(100000 + Math.random() * 900000)}`;
    const newRegistration = {
      id: `reg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      fullName: fullName.trim(),
      mobile: mobileDigits,
      email: (email || '').trim(),
      guests: String(guests),
      city: (city || 'Gurugram, Delhi NCR').trim(),
      whatsapp: (whatsapp || '').trim(),
      passCode,
      seatCategory: 'Reserved Nav Utsav Pass',
      registeredAt: new Date().toISOString(),
      source: 'Felix Plaza Web Registration'
    };

    let registrations: any[] = [];
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      registrations = JSON.parse(raw);
    } catch {
      registrations = [];
    }

    registrations.push(newRegistration);
    fs.writeFileSync(DATA_FILE, JSON.stringify(registrations, null, 2));

    return res.status(201).json({
      success: true,
      message: 'Registration confirmed successfully!',
      registration: newRegistration,
      storage: 'backend'
    });
  } catch (err: any) {
    console.error('Registration API error:', err);
    return res.status(500).json({ error: 'Internal server error while processing registration.' });
  }
});

// Get registrations count / summary
app.get('/api/registrations', (_req, res) => {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const registrations = JSON.parse(raw);
    res.json({
      count: registrations.length,
      latest: registrations.slice(-5)
    });
  } catch {
    res.json({ count: 0, latest: [] });
  }
});

// Setup Vite middlewares for development or serve dist in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Felix Plaza Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
