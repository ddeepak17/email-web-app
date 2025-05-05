# Email Web Application – Final Submission (CSCI 2170)

## Application Description

This is a simple email interface built using **Node.js**, **Express**, and **MySQL**, with secure user authentication and session management. It allows users to log in, log out, and view their last successful login time using cookies.

---

## Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/)
- [MAMP / MySQL](https://www.mamp.info/)

### Steps to Run

1. **Clone the Repository**
   git clone https://git.cs.dal.ca/courses/2025-winter/csci-2170/assignments/a4/ddeepak.git

2. **Navigate to the project folder**
   cd a4

3. **Install dependencies**
   npm install

4.	**Import the database**
	•	Open phpMyAdmin or MySQL CLI
	•	Import includes/db_dump.sql to create the email_app database and tables

5.	**Run the server**
   node server.js

6.	Visit in browser
   http://localhost:8000


## Features Implemented
	•	User login and logout with session-based authentication
	•	Passwords stored securely using SHA-256 hashing (crypto module)
	•	Last successful login time displayed using cookies
	•	Inbox and sent email views pulled from MySQL database
	•	Compose and send email functionality
	•	Emails stored and shown in both sender’s sent view and recipient’s inbox
	•	Asynchronous server communication using the fetch() API
	•	Inbox view polls server every 60 seconds for new emails
	•	RESTful API-like structure for all backend operations
	•	Fully protected routes with redirect if user not authenticated
	•	Modular folder and file structure for clean organization
	•	Clear error and success messages for user feedback
	•	Bootstrap 5 used for UI styling and layout
	•	Custom CSS used alongside Bootstrap for additional style control

## API Endpoints (Milestone)
	• POST - /api/auth/login - Log in a user
	• GET - /api/auth/logout - Log out and destroy session
	• GET - /api/user - Get logged-in user's name + last login
	• GET - /api/emails/inbox - Get user's received emails
	• GET - /api/emails/sent - Get user's sent emails
	• POST - /api/emails/send - Sends a new email

## Folder Structure
The folder structure used in this assignment is based on the format introduced in previous assignments especially assignment 3 in this course. It showcases the separation of concerns and keeps the application modular and maintainable. For example:

	•	The api/ folder contains all API-like route handlers (auth.js, emails.js), clearly showing the backend logic from other layers.
	•	The views/ folder contains HTML files for the client-side interface.
	•	The includes/ folder contains reusable backend components such as the database configuration, connection logic, and the SQL dump.
	•	Static assets like CSS files are placed under assets/, separating styling from logic and content.
	•	The main server logic is kept in server.js at the root for easy access.

This mirrors what was taught throughout the course and aligns with how we’ve been structuring the folders for previous assignments all semester.

## References
	•	https://www.npmjs.com/package/express-session
	•	https://www.npmjs.com/package/cookie-parser
	•	https://nodejs.org/api/crypto.html
	•	https://getbootstrap.com/docs/5.0/getting-started/introduction/