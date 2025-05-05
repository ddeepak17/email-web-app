const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const db = require('../includes/db');

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const passwordHash = hashPassword(password);

  const sql = `
    SELECT u.id, u.full_name FROM user_info u
    JOIN login l ON u.id = l.user_id
    WHERE u.email = ? AND l.password_hash = ?
  `;

  db.query(sql, [email, passwordHash], (err, results) => {
    if (err) return res.json({ success: false, message: 'Server error.' });

    if (results.length > 0) {
      // save previous login time in session from cookie
      const previousLogin = req.cookies.last_login || null;

      req.session.user = {
        id: results[0].id,
        name: results[0].full_name,
        lastLogin: previousLogin
      };

      // save current login time to cookie
      const now = new Date();
      const options = { hour: 'numeric', minute: 'numeric', hour12: true };
      const time = now.toLocaleTimeString('en-US', options);
      const date = now.toLocaleDateString('en-GB');
      const currentLogin = `${date} at ${time}`;

      res.cookie('last_login', currentLogin, { maxAge: 30 * 24 * 60 * 60 * 1000 });
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Invalid email or password.' });
    }
  });
});

// destroy session and redirect
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;