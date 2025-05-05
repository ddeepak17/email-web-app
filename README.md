# 📧 Email Web Application

A secure web-based email system built with **Node.js**, **Express**, and **MySQL**, featuring user authentication, session management, and a fully functional inbox and sent mail interface. Users can log in, compose, and view emails, all within a clean UI styled with Bootstrap 5 and enhanced with custom CSS.

---

## 🚀 Features

- 🔐 **User Authentication** – Login/logout with session-based auth
- 🔒 **Secure Passwords** – SHA-256 hashing using Node's `crypto` module
- 🕒 **Last Login Tracking** – Stored and displayed using cookies
- 📥 **Inbox & Sent Mail Views** – Emails pulled from a MySQL database
- 📝 **Compose Email** – Send messages with sender/recipient tracking
- 🔄 **Real-Time Updates** – Inbox polls for new mail every 60 seconds
- 🌐 **REST-like API Structure** – All server actions are exposed via endpoints
- 🛡️ **Protected Routes** – Redirects unauthenticated users
- 🧩 **Modular Code Structure** – Clean separation of API, views, logic, and assets
- 🎨 **Styled UI** – Bootstrap 5 with additional custom styling

---

## ⚙️ Setup & Installation

### 🔧 Prerequisites

- [Node.js](https://nodejs.org/)
- MySQL (e.g., via [MAMP](https://www.mamp.info/) or another stack)

### 📦 Steps to Run

1. **Clone the Repository**
   ```bash
   git clone <your-repository-url>
   cd email-web-app
````

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Import the Database**

   * Open phpMyAdmin or MySQL CLI
   * Import `includes/db_dump.sql` to create the `email_app` database

4. **Start the Server**

   ```bash
   node server.js
   ```

5. **Open in Browser**

   ```
   http://localhost:8000
   ```

---

## 📡 API Endpoints

| Method | Endpoint            | Description                    |
| ------ | ------------------- | ------------------------------ |
| POST   | `/api/auth/login`   | Log in a user                  |
| GET    | `/api/auth/logout`  | Log out and destroy session    |
| GET    | `/api/user`         | Get user's name and last login |
| GET    | `/api/emails/inbox` | Retrieve received emails       |
| GET    | `/api/emails/sent`  | Retrieve sent emails           |
| POST   | `/api/emails/send`  | Send a new email               |

---

## 🗂 Folder Structure

```
email-web-app/
│
├── api/              # All API route logic (auth.js, emails.js)
├── includes/         # DB config, connection, SQL dump
├── views/            # Frontend HTML views (login, inbox, etc.)
├── templates/        # Shared page components (header, footer)
├── assets/           # Static files (CSS)
├── server.js         # Main server file
└── README.md
```

---

## 📚 References

* [express-session](https://www.npmjs.com/package/express-session)
* [cookie-parser](https://www.npmjs.com/package/cookie-parser)
* [Node.js crypto](https://nodejs.org/api/crypto.html)
* [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.0/getting-started/introduction/)

---

## 👨‍💻 Author

**Darren Deepak**
