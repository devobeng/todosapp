# Todo App(CRUD AND AUTHENTICATION)

## Introduction

This is a simple todo app that allows users to create, update, and delete todos.

## Features

- CRUD operations for todos
- Authentication with JWT
- User registration and login
- Modal for adding and editing todos

## Installation

1. Clone the repository
2. Navigate to the backend and frontend directories
3. Install dependencies using `npm install`
4. Create a `.env` file in the backend and frontend directories with the following content:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.7g9x.mongodb.net/<database>?retryWrites=true&w=majority
VITE_API_URL=http://localhost:3000/api/v1
```

4. Run the backend using `npm start`
5. Run the frontend using `npm run dev`

## Usage

### Backend

The backend is a simple Express.js server that uses MongoDB as the database. It has the following routes:

- `GET /todo`: Get all todos for the authenticated user
- `POST /todo`: Create a new todo for the authenticated user
- `PATCH /todo/:id`: Update a todo for the authenticated user
- `DELETE /todo/:id`: Delete a todo for the authenticated user

### Frontend

The frontend is a React application that uses Axios for making API requests and Zustand for state management. It has the following components:

- `Navigation`: The navigation bar that displays the user's name and allows them to log in or register.
- `Login`: The login form that allows users to log in with their email and password.
- `Register`: The registration form that allows users to create an account with their email and password.
- `Dashboard`: The dashboard that displays a list of todos and allows users to add, edit, and delete todos.
- `TodoList`: The list of todos that displays the title, description, and status of each todo.
- `TodoForm`: The form that allows users to add or edit a todo.
