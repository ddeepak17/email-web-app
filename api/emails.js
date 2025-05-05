const express = require('express');
const router = express.Router();
const db = require('../includes/db');

// get inbox emails
router.get('/inbox', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const sql = `
    SELECT e.id, e.subject, e.body, e.sent_at,
           s.full_name AS sender_name,
           r.full_name AS recipient_name
    FROM emails e
    JOIN user_info s ON e.sender_id = s.id
    JOIN user_info r ON e.recipient_id = r.id
    WHERE e.recipient_id = ?
    ORDER BY e.sent_at DESC
  `;

  db.query(sql, [req.session.user.id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

// get sent emails 
router.get('/sent', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const sql = `
    SELECT e.id, e.subject, e.body, e.sent_at,
           s.full_name AS sender_name,
           r.full_name AS recipient_name
    FROM emails e
    JOIN user_info s ON e.sender_id = s.id
    JOIN user_info r ON e.recipient_id = r.id
    WHERE e.sender_id = ?
    ORDER BY e.sent_at DESC
  `;

  db.query(sql, [req.session.user.id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

// send a new email
router.post('/send', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const { recipient, subject, body } = req.body;

  // find recipient ID from email
  const findRecipient = 'SELECT id FROM user_info WHERE email = ?';
  db.query(findRecipient, [recipient], (err, results) => {
    if (err) return res.status(500).json({ success: false });

    if (results.length === 0) {
      return res.json({ success: false, message: 'Recipient not found.' });
    }

    const recipientId = results[0].id;
    const senderId = req.session.user.id;

    // insert new email into DB
    const insert = `
      INSERT INTO emails (sender_id, recipient_id, subject, body)
      VALUES (?, ?, ?, ?)
    `;

    db.query(insert, [senderId, recipientId, subject, body], (err2) => {
      if (err2) return res.status(500).json({ success: false });
      res.json({ success: true });
    });
  });
});

module.exports = router;