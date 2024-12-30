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
git clone https://github.com/MohamadSadem0/tactical-report.git
cd frontend
```

### **3. Configure Environment Variables**
The application requires environment variables to be set up for both local development and production builds. Create the following files in the root of the frontend directory:

#### `.env.local`
This file is used for local development:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
ENCRYPTION_KEY=super-secret-key
```

#### `.env.production`
This file is used for production builds:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
ENCRYPTION_KEY=super-secret-key
```

### **4. Run the Application**

#### Using Docker
- Build the Docker image:
```bash
docker-compose build
```
- Run the Docker container:
```bash
docker-compose up
```
The application will be accessible at [http://localhost:5500](http://localhost:5500).

#### Without Docker (Local Development)
- Install dependencies:
```bash
npm install
```
- Run the development server:
```bash
npm run dev
```
The application will be accessible at [http://localhost:3000](http://localhost:3000).

- To create a production build and serve it:
```bash
npm run build
npm start
```

---

## **Folder Structure**
Key Directories:
- **/app**: Pages and routes for the application.
  - Examples: `/login`, `/signup`, `/profile`, `/items`.
- **/components**: Reusable UI components.
  - Examples: `Navbar.tsx`, `ItemCard.tsx`, `Forms`.
- **/redux**: Redux slices and store configuration.
  - Examples: `itemsSlice.ts`, `userSlice.ts`.
- **/services**: API service files for handling HTTP requests.
  - Examples: `authService.ts`, `itemService.ts`, `passwordService.ts`.
- **/utils**: Utility functions for encryption, validation, and Axios configuration.
