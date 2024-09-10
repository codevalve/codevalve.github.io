---

layout: post
title: Introduction to Using Prisma ORM with NodeJS and ExpressJS
author: codevalve
date: 2024-09-09 09:00:00 -0500
categories: orm prisma
tags: how-to article
mermaid: true
---

## Introduction

Prisma is a next-generation ORM (Object-Relational Mapping) for NodeJS and TypeScript. It provides a powerful and flexible way to interact with your database and helps in building robust and scalable applications. In this article, we'll walk through the steps to set up and use Prisma ORM with NodeJS and ExpressJS for a website.

## Here is what we are planning to implement

```mermaid
graph TD
    Start[User Submits Form] -->|POST /save| A[Express Route Handler]
    A -->|Extract form data| B[username & email]
    B -->|client.set | C[Postgres Database]
    C -->|Data stored| D[Success Redirect to Homepage]
    A -->|Error occurs| E[Handle Error and Send Error Message]
    
    StartView[User Requests Data] -->|GET /view/:username| F[Express Route Handler]
    F -->|Extract username param| G[username]
    G -->|client.get| C
    C -->|Data Retrieved| H[Render View with username & email]
    F -->|Error occurs| I[Handle Error and Send Error Message]
    
    style A fill:#FFC300,stroke:#333,stroke-width:2px,color:#000000
    style F fill:#FFC300,stroke:#333,stroke-width:2px,color:#000000
    style C fill:#66B2FF,stroke:#333,stroke-width:2px,color:#000000
    style D fill:#28A745,stroke:#333,stroke-width:2px,color:#000000
    style H fill:#28A745,stroke:#333,stroke-width:2px,color:#000000
    style E fill:#FF5733,stroke:#333,stroke-width:2px,color:#000000
    style I fill:#FF5733,stroke:#333,stroke-width:2px,color:#000000
```
## Prerequisites

Before we begin, ensure you have the following installed:

- NodeJS
- npm (Node Package Manager)
- PostgreSQL (or other compatible databases like MySQL, SQLite, etc.)

## Setting Up Your Project

1. **Initialize a new NodeJS project:**

```bash
mkdir prisma-express-app
cd prisma-express-app
npm init -y
```

2. **Install dependencies:**

```bash
npm install express prisma @prisma/client
```

3. **Install the Prisma CLI:**

```bash
npm install prisma -D
npx prisma init
```

## Configuring Prisma

The `npx prisma init` command creates a `prisma` directory with a `schema.prisma` file. This is where you'll define your data model and database connection.

1. **Update your `schema.prisma` file to configure your database:**

```javascript
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

2. **Set up your database URL in the `.env` file:**

```plaintext
DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase"
```

3. **Define your data model in `schema.prisma`:**

```javascript
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
```

## Migrate Your Database

With your data model defined, it's time to migrate your database.

```bash
npx prisma migrate dev --name init
```

This command will generate the necessary SQL and apply it to your database.

## Using Prisma Client in Your ExpressJS App

1. **Generate Prisma Client:**

```bash
npx prisma generate
```

2. **Create your ExpressJS server:**

```javascript
// index.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Create a new user
app.post('/user', async (req, res) => {
  const { email, name } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: 'User creation failed' });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

3. **Run your server:**

```bash
node index.js
```

## Conclusion

In this article, we walked through the steps of setting up Prisma ORM with NodeJS and ExpressJS. We configured Prisma, defined a data model, migrated our database, and created a simple ExpressJS server to interact with the database.

Prisma simplifies database interactions by providing a type-safe and intuitive API, making it easier to build robust and scalable applications. Happy coding!
