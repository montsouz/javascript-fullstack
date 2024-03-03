# JavaScript Fullstack

This repo implements a fullstack application that uses Node on backend, and React on Frontend

Check out the deployed version here!

[javascript-fullstack.vercel.app](https://javascript-fullstack.vercel.app/login)

## Backend

It's a simple API that returns plans and saves purchased plans on the DB

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
