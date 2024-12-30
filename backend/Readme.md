# Tactical Report Project

This repository contains the Tactical Report project, a Spring Boot application that uses MongoDB for data storage and supports user authentication, item management, and password recovery. The project also includes email integration for account activation and password reset.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Build and Run](#build-and-run)
    - [Using Gradle](#using-gradle)
    - [Using Docker](#using-docker)
- [Endpoints](#endpoints)
- [Project Structure](#project-structure)

---

## Features
- **User Authentication**: JWT-based authentication with role-based access control.
- **Item Management**: CRUD operations for items.
- **Email Integration**: Sends account activation and password reset emails.
- **MongoDB Integration**: Uses MongoDB for data persistence.
- **Password Recovery**: Supports requesting and resetting passwords.

## Technologies Used
- **Backend**: Spring Boot (Java)
- **Database**: MongoDB
- **Authentication**: JWT
- **Email**: Spring Boot Mail with Gmail SMTP
- **Containerization**: Docker
- **Build Tool**: Gradle

## Getting Started

### Prerequisites
- **Java 17 or higher**
- **Gradle**
- **Docker and Docker Compose**
- **Gmail Account** for email integration

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/MohamadSadem0/tactical-report.git
   cd backend
   ```

2. Configure your Gmail account for email integration:
    - Enable "Allow less secure apps" or create an **App Password**.
    - Use the App Password for `spring.mail.password` in your configuration.

3. Update environment variables in `application.properties` or set them in the Docker Compose file:
   ```properties
   spring.mail.username=your_gmail_account
   spring.mail.password=your_gmail_app_password
   app.reset-password-url=http://localhost:5500/reset-password
   app.activate-url=http://localhost:5500/activate
   jwt.secret=your_jwt_secret_key
   ```

---

## Environment Variables

Set the following environment variables in the `.env` file for Docker Compose or directly in `application.properties`:

| Variable                 | Description                         | Example                     |
|--------------------------|-------------------------------------|-----------------------------|
| `SPRING_MAIL_USERNAME`   | Your Gmail account                 | `example@gmail.com`         |
| `SPRING_MAIL_PASSWORD`   | Your Gmail App Password            | `your_app_password`         |
| `APP_RESET_PASSWORD_URL` | Password reset URL                 | `http://localhost:5500/`    |
| `APP_ACTIVATE_URL`       | Account activation URL             | `http://localhost:5500/`    |
| `JWT_SECRET`             | Secret key for JWT token generation| `your_secret_key`           |

---

## Build and Run

### Using Gradle
1. Clean and build the project:
   ```bash
   ./gradlew clean build
   ```

2. Run the application:
   ```bash
   java -jar build/libs/tactical-report-0.0.1-SNAPSHOT.jar
   ```

3. Access the API at `http://localhost:8080`.

### Using Docker
1. Build and start the services using Docker Compose:
   ```bash
   docker-compose up --build
   ```

2. The backend will be available at `http://localhost:8080` and MongoDB at `localhost:27017`.

---

## Endpoints

### Public Endpoints
- **POST** `/api/public/auth/signup`: Register a new user.
- **POST** `/api/public/auth/login`: Log in with email and password.
- **POST** `/api/public/request-password-reset`: Request a password reset link.
- **POST** `/api/public/reset-password`: Reset the password.
- **GET** `/api/public/auth/activate`: Activate a user account.

### Admin Endpoints
- **POST** `/api/admin/items/create`: Create a new item.
- **GET** `/api/admin/items`: Fetch all items.
- **PUT** `/api/admin/items/{id}`: Update an item by ID.
- **DELETE** `/api/admin/items/{id}`: Delete an item by ID.

---

## Project Structure
```
src
├── main
│   ├── java
│   │   ├── com.assignment.tactical.report
│   │       ├── config         # Security, email, and application configurations
│   │       ├── controller     # REST controllers
│   │       ├── dto            # Data transfer objects
│   │       ├── mappers        # map between dto and models
│   │       ├── enums          # User roles and constants
│   │       ├── exception      # Custom exception handling
│   │       ├── model          # Entity models
│   │       ├── repository     # Database repositories
│   │       ├── service        # Business logic
│   │       ├── TacticalReportApplication.java
│   ├── resources
│       ├── application.properties  # Application configuration
│       ├── static                 # Static resources (if any)
│       ├── templates              # HTML templates (if applicable)
├── test
    ├── java
        ├── com.assignment.tactical.report
            ├── ...                   # Test cases
```

---

## Troubleshooting
1. **Error: `BUILD FAILED` in Gradle:**
    - Ensure Java 17+ is installed.
    - Check if all dependencies are correctly defined in `build.gradle`.

2. **Error: MongoDB Connection Failure:**
    - Verify MongoDB is running on `localhost:27017`.
    - Ensure the username, password, and database are correctly configured in `application.properties` or `docker-compose.yml`.

3. **Email Not Sending:**
    - Verify Gmail credentials in `application.properties`.
    - Check if "Allow less secure apps" or App Password is enabled in your Gmail account.

---

## License
This project is licensed under the [MIT License](LICENSE).

