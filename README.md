# 📘 LedgerSystem
LedgerSystem is a modern, full-stack financial management application designed to help users track income and expenses with ease. Built with Node.js, Express, MongoDB, and EJS, it features a secure authentication system and a responsive dashboard that provides real-time financial summaries.

<hr>

# ✨ Features
* Secure Authentication: User registration and login with encrypted passwords (Bcrypt).

* Financial Dashboard: Real-time calculation of Total Income, Total Expenses, and Net Balance.

* Record Management: Full CRUD functionality to add, view, and delete financial entries.

* Profile Management: Update user details and change passwords securely.

* Responsive UI/UX: A clean, "glassmorphism" inspired design that works on all devices.

<hr>

# 📸 Screenshots
## 1. User Authentication
The system provides a sleek and intuitive interface for both Login and Registration, ensuring a smooth entry point for users.

### Login page
<img width="1361" height="655" alt="image" src="https://github.com/user-attachments/assets/a5cea462-69b5-48cf-b5ab-8594c16fea89" />

### Register User page
<img width="1359" height="636" alt="image" src="https://github.com/user-attachments/assets/ae93a6d5-4172-4bad-b040-726bd4337659" />

## 2. Comprehensive Dashboard
The core of the application where users can visualize their financial health and manage their transactions.
<img width="1240" height="1641" alt="image" src="https://github.com/user-attachments/assets/1f089dbd-d354-4a21-b3fe-2c1f193da8a1" />

<hr>

# 🛠️ Tech Stack
* Frontend: EJS (Embedded JavaScript Templates), Modern CSS3 (Grid & Flexbox).

* Backend: Node.js, Express.js.

* Database: MongoDB (via Mongoose).

* Security: JSON Web Tokens (JWT), Cookie-Parser, Bcrypt for password hashing.

* Validation: Validator.js.

  <hr>

  # 🚀 Setup & Installation

  ## 1. Clone the repository:Clone the repository:
  git clone https://github.com/pankajraghav15/LedgerSystem.git
  cd LedgerSystem

  ## 2. Install Dependencies:
  npm install
  
  ## 3. Environment Setup:
Create a .env file in the root directory:
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

## 4. Run the Application:
npm run dev  # or node server.js

<hr>

# 📝 Usage
* Register a new account.

* Login to access your private dashboard.

* Add Records: Enter an amount, select the type (Income/Expense), and categorize the entry.

* Track: View your net balance update automatically based on your entries.

* Settings: Update your profile name or change your password at any time.

  <hr>

# ⚖️ Tradeoffs & Considerations
Server-Side Rendering (SSR): Used EJS for faster initial load and simplified state management for this scale of application.

Data Integrity: Implemented Mongoose pre-save hooks to ensure passwords are never stored in plain text, even during updates.

User Experience: Focused on a "Zero-Redirect" feel within the dashboard by utilizing clean CSS transitions and intuitive form layouts.
