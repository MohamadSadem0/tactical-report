# Frontend Application for Tactical Report

This is the frontend application for Tactical Report, built with **Next.js**, **Redux**, and **TypeScript**. The application is designed to work with a backend API and includes features like authentication, item management, password reset, and more.

---

## **Features**
- **User Authentication**:
  - Login, signup, and logout functionality.
- **Item Management**:
  - Admins can create, update, delete, and view items.
  - Regular users can view item details.
- **Password Management**:
  - Users can request a password reset link and reset their password securely.
- **Responsive Design**:
  - Optimized for desktop and mobile devices.
- **Secure Data Handling**:
  - Sensitive data like tokens are encrypted using a configurable `ENCRYPTION_KEY`.
- **Dynamic Navigation**:
  - Includes a global Navbar for easy navigation across routes.

---

## **Getting Started**

Follow these steps to clone, set up, and run the application.

### **1. Prerequisites**
Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **Docker** (optional for containerized deployment)

---

### **2. Clone the Repository**
```bash
git clone <your-repo-url>
cd frontend
