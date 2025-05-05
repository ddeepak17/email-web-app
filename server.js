const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const app = express();
const PORT = 8000;

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: 'email-app-secret-2170',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 }
}));

const authRoutes = require('./api/auth');
const emailRoutes = require('./api/emails');
app.use('/api/auth', authRoutes);
app.use('/api/emails', emailRoutes);

// helper, this wraps view content with header & footer
function renderWithLayout(contentPath) {
  const header = fs.readFileSync(path.join(__dirname, 'templates', 'header.html'), 'utf8');
  const footer = fs.readFileSync(path.join(__dirname, 'templates', 'footer.html'), 'utf8');
  const body = fs.readFileSync(path.join(__dirname, contentPath), 'utf8');
  return header + body + footer;
}

// routes
app.get('/', (req, res) => {
  const html = renderWithLayout('views/login.html');
  res.send(html);
});

app.get('/inbox', (req, res) => {
  if (req.session.user) {
    const html = renderWithLayout('views/index.html');
    res.send(html);
  } else {
    res.redirect('/');
  }
});

app.get('/sent.html', (req, res) => {
  if (req.session.user) {
    const html = renderWithLayout('views/sent.html');
    res.send(html);
  } else {
    res.redirect('/');
  }
});

app.get('/compose.html', (req, res) => {
  if (req.session.user) {
    const html = renderWithLayout('views/compose.html');
    res.send(html);
  } else {
    res.redirect('/');
  }
});

app.get('/api/user', (req, res) => {
  if (req.session.user) {
    res.json({
      name: req.session.user.name,
      lastLogin: req.session.user.lastLogin || 'First login'
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
