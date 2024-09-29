# **Money Manager** - Personal Expense Tracker

**Money Manager** is a sleek, user-friendly web application designed to help users track and manage their personal expenses efficiently. With a focus on simplicity, powerful analytics, and customizable features, this app allows users to visualize and take control of their spending habits.

## **Features**

* **User Authentication**
   * Secure Sign-Up and Sign-In using hashed passwords.
   * JWT-based user session management.
* **Expense Management**
   * Add, edit, and delete expenses.
   * Categorize expenses into preset and user-defined categories.
   * View expense history with date, amount, and description.
* **Custom Categories**
   * Create and manage your own expense categories.
   * Preset categories like *Food*, *Transport*, *Rent*, and *Entertainment* for ease of use.
* **Analytics & Reports**
   * Visual summary of expenses via pie charts and bar graphs.
   * Category-wise breakdown of monthly and total expenses.
   * High-level summaries to track trends in spending over time.
* **Responsive Design**
   * Optimized for mobile and desktop with clean, intuitive layouts.
* **Engaging UI**
   * Modern, gradient-based design with smooth animations and interactive charts.
   * Light and dark mode options.

## **Tech Stack**

* **Backend**:
   * Hono - High-performance JavaScript framework.
   * Prisma - ORM for managing the PostgreSQL database.
   * PostgreSQL - Relational database for managing users, expenses, and categories.
* **Frontend**:
   * React.js - Frontend library for building the user interface.
   * Tailwind CSS - Utility-first CSS framework for rapid UI development.
   * Chart.js - For interactive charts and analytics.
* **Authentication**:
   * JWT (JSON Web Tokens) for secure user authentication.

## **Database Schema**

The app uses a PostgreSQL database, managed through Prisma ORM, with the following key models:

### **User**
* `user_id`: Primary key
* `name`: User's name
* `email`: Unique email
* `password`: Encrypted password
* `expenses`: Relation to the expenses table

### **Category**
* `category_id`: Primary key
* `category_name`: Unique name of the category
* `expenses`: Relation to the expenses table

### **Expense**
* `expense_id`: Primary key
* `user_id`: Foreign key (relation to User)
* `category_id`: Foreign key (relation to Category)
* `amount`: Expense amount
* `description`: Optional description
* `date_of_expense`: Date of the expense
* `created_at`: Auto-generated timestamp

## **API Endpoints**

### **Authentication**
* **POST** `/auth/signup`: Register a new user.
* **POST** `/auth/login`: Authenticate and log in a user.

### **Expense Management**
* **GET** `/expense`: Get all expenses for the logged-in user.
* **POST** `/expense`: Add a new expense.
* **PUT** `/expense/:id`: Edit an existing expense.
* **DELETE** `/expense/:id`: Delete an expense.

### **Category Management**
* **GET** `/category`: Fetch all categories (preset and custom).
* **POST** `/category`: Add a new custom category.
* **DELETE** `/category/:id`: Delete a custom category.

### **Analytics**
* **GET** `/expense/summary`: Fetch a summary of expenses (total, highest category, etc.).
* **GET** `/expense/summary/category/:category_id`: Fetch a breakdown for a specific category.
