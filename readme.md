# JavaScript Fullstack

This repo implements a fullstack application that uses Node on the backend, and React on the frontend

Check out the deployed version here!

[javascript-fullstack.vercel.app](https://javascript-fullstack.vercel.app/)

## Backend

It's a simple API that returns plans and saves purchased plans in the DB

### Tech stack

- Node
- TypeScript
- Sequelize
- PostgreSQL
- AWS (ECR, App Runner, RDS)
- Docker
- Jest + Supertest
- Github Actions

### Install deps

```
npm install
```

### How to run

```
npm run dev:docker
```

### Run tests

```
npm run test:docker
```

## Frontend

Simple client written in react. Contains three pages Login, Plans, and a Dashboard where you can check the plans you've purchased.

### Tech stack

- React
- TypeScript
- Vite
- Chakra UI
- Vercel

### Install deps

```
npm install
```

### How to run

```
npm run dev
```

## API Documentation

This document outlines the available REST API endpoints for our service, including methods for authentication, retrieving plans, and handling purchases.

## Endpoints

### POST /login

Authenticates a user and returns a token.

#### Request

- **Body**

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

#### Response

- **Success (200 OK)**

```json
{
  "token": "jwt.token.here"
}
```

- **Error (401 Unauthorized)**

```json
{
  "message": "Invalid email or password"
}
```

---

### GET /plans

Retrieves a list of available plans. Requires authentication.

#### Request

- **Headers**

`Authorization: Bearer <token>`

#### Response

- **Success (200 OK)**

```json
[
  {
    "id": 1,
    "name": "Basic Plan",
    "steps": [
      {
        "name": "Step 1",
        "order": 1
      },
      {
        "name": "Step 2",
        "order": 2
      }
    ]
  }
]
```

---

### POST /purchases

Creates a purchase for a plan. Requires authentication.

#### Request

- **Body**

```json
{
  "planId": 1
}
```

- **Headers**

`Authorization: Bearer <token>`

#### Response

- **Success (200 OK)**

```json
{
  "id": 1,
  "name": "Basic Plan",
  "userId": 123,
  "steps": [
    {
      "name": "Step 1",
      "order": 1
    },
    {
      "name": "Step 2",
      "order": 2
    }
  ]
}
```

- **Error (404 Not Found)**

```json
{
  "message": "Plan not found"
}
```

or

```json
{
  "message": "User not found"
}
```

---

### GET /purchases

Retrieves a list of purchases made by the authenticated user.

#### Request

- **Headers**

`Authorization: Bearer <token>`

#### Response

- **Success (200 OK)**

```json
[
  {
    "id": 1,
    "name": "Basic Plan",
    "userId": 123,
    "steps": [
      {
        "name": "Step 1",
        "order": 1
      },
      {
        "name": "Step 2",
        "order": 2
      }
    ]
  }
]
```

---

## Authentication

All endpoints, except for `/login`, require a valid JWT token to be included in the `Authorization` header as a Bearer token.
