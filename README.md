
🗂️ Kanban Board – GraphQL Edition

📋 Project Overview

This project is a full-stack Kanban Board application rebuilt with GraphQL, Apollo Server, and Apollo Client, featuring secure JWT authentication.

Originally designed as a REST API app, this version upgrades the backend to GraphQL for more flexible data fetching and efficient communication between the client and server.

Users can log in securely, manage their tasks in a Kanban board (organized by status: To Do, In Progress, Done), and maintain authenticated sessions using JWTs.

The application is fully deployed on Render, with a PostgreSQL database.

🚀 Features

✅ JWT Authentication

Login with username and password

Token-based authentication stored in localStorage

Token verification middleware for secure API access

Automatic logout on token expiration

✅ GraphQL + Apollo Integration

Backend powered by Apollo Server

Frontend connected with Apollo Client

Queries and mutations for users, tasks, and authentication

✅ Kanban Board Functionality

Create, edit, and delete tasks

Organize tasks by status

Real-time updates via Apollo cache

✅ Session Management

Protected routes: users must log in to access the board

Automatic redirect to login when token expires

✅ Deployment

Full-stack app deployed on Render

Connected to a PostgreSQL instance

🧱 Tech Stack
Frontend

React

Apollo Client

React Router

TailwindCSS (or other styling library used)

Backend

Node.js

Apollo Server (GraphQL)

Express

PostgreSQL

JSON Web Token (JWT)

bcrypt

⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/<your-username>/kanban-board-graphql.git
cd kanban-board-graphql

2️⃣ Install Dependencies

Install dependencies for both the server and client:

cd server
npm install
cd ../client
npm install

3️⃣ Configure Environment Variables

Create a .env file in the server folder:

DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
JWT_SECRET=your_jwt_secret_key
PORT=4000


If running locally, make sure your PostgreSQL database is accessible.

4️⃣ Run the Application
Start the Server
cd server
npm start

Start the Client
cd client
npm start


The app should open automatically at http://localhost:3000
.

🔐 Authentication Flow

User logs in → Server validates credentials.

Server generates JWT → Sent to client.

Client stores token in localStorage.

Subsequent requests → Include Authorization: Bearer <token> header.

Server verifies token via middleware before fulfilling queries or mutations.

On logout or expiration → Token removed; user redirected to login.

🧩 GraphQL Schema Overview
Types
type User {
  id: ID!
  username: String!
}

type Task {
  id: ID!
  title: String!
  description: String
  status: String!
  user: User!
}

Queries
type Query {
  me: User
  tasks: [Task]
}

Mutations
type Mutation {
  login(username: String!, password: String!): AuthPayload
  addTask(title: String!, description: String, status: String!): Task
  updateTask(id: ID!, status: String!): Task
  deleteTask(id: ID!): Boolean
}

type AuthPayload {
  token: String!
  user: User!
}

📦 Deployment

The app is deployed to Render:

🌐 Web: https://kanba-app.onrender.com/

Render Setup Notes

Add the .env variables in your Render Environment Settings.

Connect both client and server repos to Render.

Ensure CORS settings allow communication between the two services.

🧠 Future Improvements

🔍 Add sorting and filtering for tasks

🕒 Implement token refresh mechanism

📱 Add responsive layout for mobile users

🔔 Add real-time updates with subscriptions

🖼️ Screenshots

Login Page


Kanban Board


🧑‍💻 Author

Alejandro Cabrera Figuera
Full-Stack Developer at TechTooine

💼 LinkedIn Profile