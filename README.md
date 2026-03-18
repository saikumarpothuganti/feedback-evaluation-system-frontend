# Student Feedback Management System

A feature-rich Student Feedback Management System built with React + Vite for frontend and Spring Boot + MySQL for backend.

## Features

- Role-based access for Student, Faculty, and Admin
- Feedback submission workflows
- Dashboard analytics and reports
- Responsive UI with charts and animations

## Quick Start

```bash
# Install frontend dependencies
npm install

# Run frontend only
npm run dev

# Run Spring Boot backend only
npm run spring:dev

# Run frontend + Spring Boot together
npm run dev:spring
```

## Backend (Spring Boot Only)

Backend is implemented only with Spring Boot under `backend/`.

Endpoints:
- GET `/api/health`
- POST `/api/feedback`

Requirements:
- Java 21
- Maven 3.9+
- MySQL 8+

Run backend directly:

```bash
cd backend
mvn spring-boot:run
```

## Tech Stack

React 18, Vite, React Router, Context API, Chart.js, Framer Motion, Spring Boot, MySQL
