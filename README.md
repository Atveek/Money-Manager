# Money Expense Tracker

## Overview
Money Expense Tracker is a versatile tool designed to help individuals and small businesses manage their finances. It allows users to track expenses, monitor budgets, and view detailed financial reports. For small businesses, it offers additional features to manage profit, supply, and customer details, making it a comprehensive solution for financial tracking and management.

## Features
- **Expense Management:**
  - Add, edit, and delete expenses
  - Categorize expenses (e.g., Food, Transport, Entertainment)
- **Budget Monitoring:**
  - Set and monitor budgets for different categories
- **Financial Reporting:**
  - View summary reports and charts of expenses and budgets
- **Small Business Management:**
  - Track profit and loss
  - Manage supply details
  - Store and view customer details
- **User Management:**
  - User authentication and profile management

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript - React js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (jsonwebtoken)
- **Charting:** Chart.js

## Installation

### Prerequisites
- Node.js and npm installed on your local machine
- MongoDB installed and running

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Atveek/Money-Mind.git
   cd Money-Mind
2.Set up environment variables:
  Create a .env file in the root directory and add the following:
   ```bash
        PORT = 8080
        MONGO_URL = mongodb localhost url
        secret = jwt secret key
  ```
3. Install dependencies:
      ```bash
      npm install
4.Start the server:
   ```bash
    npm start
  ```
5. Install dependencies of client:
      ```bash
      cd client
      npm install
6. run client side interfece:
   ```bash
    npm start
