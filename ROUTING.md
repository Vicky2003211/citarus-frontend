# 🩺 Elder Care Frontend

A React-based frontend for managing elderly patient records, vitals, and dashboards. Built using Vite and React Router DOM, this application is designed to work in a role-based system with multiple user roles (Admin, Personal Care Manager, Adult Kid).



## 🚀 Features

- 🔐 Role-based login (Admin, Adult Kid, Personal Care Manager)
- 📄 Patient registration form
- 📅 Calendar view for vitals monitoring
- 📊 Vitals entry and history tracking
- 📁 Patient history submission
- 📋 Admin registration (by Citraverse Admin)
- 📤 Logout functionality
- 🔁 Responsive navbar with mobile drawer

---

## 🧭 Routing Structure

### 🟢 Public Routes

| Path       | Description                     |
|------------|---------------------------------|
| `/`        | Redirects to `/login`           |
| `/login`   | Login page                      |
| `/*`       | Catch-all redirects to `/login` |

### 🔒 Protected Routes

| Path                   | Description                       |
|------------------------|-----------------------------------|
| `/home`                | Home/Dashboard                    |
| `/customer-form`       | Patient registration form         |
| `/customer-dashboard`  | Calendar view with vitals         |
| `/customer-report`     | Vitals data entry form            |
| `/customer-history`    | History report for the patient    |
| `/admin-registration`  | New user registration (admin only)|

---

## 🧩 Components

### 📄 Pages

- `Home.jsx` – Dashboard after login
- `UserLogin.jsx` – Login form with credentials
- `AdminRegistration.jsx` – Register new users
- `Customerform.jsx` – Register new patients
- `Customerdashboard.jsx` – Calendar with vitals
- `Customerreport.jsx` – Vitals form
- `Customerhistoryform.jsx` – History form

### 🔁 Shared

- `Navbar.jsx` – Top navigation with role-specific links

---

## 👥 Role-Based Navigation

| Role                | Accessible Pages                                     |
|---------------------|------------------------------------------------------|
| Citraverse Admin    | Home, Patient Form, Vitals Report, History, Register |
| Personal Care Mgr   | Home, Dashboard, Vitals Report                       |
| Adult Kid           | Home, Dashboard                                      |

---
