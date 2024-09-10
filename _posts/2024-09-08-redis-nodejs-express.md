---
layout: post
title: "Using Redis as a Simple Database for Node.js Express.js Web Apps"
author: codevalve
date: 2024-09-10 08:00:00 -0500
categories: article
tags: redis nodejs expressjs database simple
mermaid: true
---

If you're building a web application using Node.js and Express.js, then you'll need a database to store and retrieve your data. While there are many popular database options available, Redis (Remote Dictionary Server) offers a simple and lightweight solution for storing and manipulating your data.

In this tutorial, we will explore how to use Redis as a simple database for your Node.js Express.js web application.

## Here is what we are implementing

```mermaid
graph TD
    Start[User Submits Form] -->|POST /save| A[Express Route Handler]
    A -->|Extract form data| B[username & email]
    B -->|client.set(username, email)| C[Redis Database]
    C -->|Data stored| D[Success Redirect to Homepage]
    A -->|Error occurs| E[Handle Error and Send Error Message]

    StartView[User Requests Data] -->|GET /view/:username| F[Express Route Handler]
    F -->|Extract username param| G[username]
    G -->|client.get(username)| C
    C -->|Data Retrieved| H[Render View with username & email]
    F -->|Error occurs| I[Handle Error and Send Error Message]

    Install[Install Dependencies] -->|npm install| Setup[Setup Node.js Express App]
    Setup -->|Install Redis Package| InstallRedis[Install redis npm package]
    InstallRedis -->|Connect to Redis| A

    style A fill:#FFC300,stroke:#333,stroke-width:2px,color:#000000
    style F fill:#FFC300,stroke:#333,stroke-width:2px,color:#000000
    style C fill:#66B2FF,stroke:#333,stroke-width:2px,color:#000000
    style D fill:#28A745,stroke:#333,stroke-width:2px,color:#000000
    style H fill:#28A745,stroke:#333,stroke-width:2px,color:#000000
    style E fill:#FF5733,stroke:#333,stroke-width:2px,color:#000000
    style I fill:#FF5733,stroke:#333,stroke-width:2px,color:#000000
    style Install fill:#DAA520,stroke:#333,stroke-width:2px,color:#000000
    style Setup fill:#DAA520,stroke:#333,stroke-width:2px,color:#000000
    style InstallRedis fill:#DAA520,stroke:#333,stroke-width:2px,color:#000000

```

## Prerequisites

Before diving into this tutorial, make sure you have the following:

- A basic understanding of Node.js and Express.js
- Node.js and npm installed on your machine
- Redis installed and running on your machine (you can follow the instructions on [redis.io](https://redis.io/download) to install Redis)

## Setting up Redis in your Node.js Express.js Web App

To begin, let's create a new Node.js Express.js web application using the **express-generator** package. Open your terminal and run the following command to install the package globally:

```bash
npm install -g express-generator
```

Next, create a new project with the **express** command:

```bash
express my-app-name
```

After the project has been generated, navigate into the project directory and install the dependencies by running the following commands:

```bash
cd my-app-name
npm install
```

## Adding the redis Node.js package

Next, we need to install the **redis** npm package, which will enable us to connect to our Redis database from our Node.js application. From the terminal, run the following command:

```bash
npm install redis --save
```

## Connecting to Redis

Now, let's create a connection to our Redis server in our Node.js application. Open the **app.js** file and add the following lines at the top of the file, below the express import:

```javascript
var redis = require('redis');
var client = redis.createClient();
```

This creates a new Redis client that we can use to communicate with our Redis server.

## Handling Redis Errors

It's good practice to handle any errors that might occur when connecting to our Redis server. To do this, we can use the `client.on()` method to listen for any error events, and console log the error if one occurs. Add the following code below the `client` declaration in the **app.js** file:

```javascript
client.on("error", function(error) {
    console.log(error);
});
```

## Saving Data to Redis

Now that we have our connection set up, we can start saving data to our Redis database. Let's create a new route in our Node.js application that will get some data from a form submission, and save it to Redis.

In the **routes/index.js** file, add the following code to the bottom of the file:

```javascript
router.post('/save', function(req, res, next) {
    // get the data from the form submission
    var username = req.body.username;
    var email = req.body.email;

    // save the data to Redis
    client.set(username, email, function(error, reply) {
        if (error) {
            console.log(error);
            res.send('Error occurred while saving data to Redis');
        } else {
            res.redirect('/');
        }
    });
});
```

This route will get the data from the form submission, and use the `client.set()` method to save the data to our Redis database. The `client.set()` method takes in three parameters: the key, the value, and a callback function that will be executed once the data has been saved. In this callback function, we can handle any errors that might occur, or redirect the user back to the homepage if the data was successfully saved.

## Retrieving Data from Redis

Now that we have saved some data to our Redis database, let's create another route that will retrieve the data and display it on a different page. In the **routes/index.js** file, add the following code to the bottom of the file:

```javascript
router.get('/view/:username', function(req, res, next) {
    var username = req.params.username;

    // get the data from Redis
    client.get(username, function(error, reply) {
        if (error) {
            console.log(error);
            res.send('Error occurred while retrieving data from Redis');
        } else {
            res.render('view', {
                username: username,
                email: reply
            });
        }
    });
});
```

This route will use the `client.get()` method to get the data from Redis using the provided key. It then renders a view called **view.ejs** (which we will create in the next step) and passes in the username and email data as variables.

## Creating the View

To display the retrieved data, let's create a view called **view.ejs**. In the **views** directory, create a new file called **view.ejs** and add the following code:

```html
<h2>View User</h2>
<p>Username: <%= username %></p>
<p>Email: <%= email %></p>
```

## Testing the App

To test our app, start your Node.js server by running the following command from your terminal:

```bash
npm start
```

Then open `http://localhost:3000` in your browser and submit some data using the form. You should see a success message and be redirected back to the homepage. Next, navigate to `http://localhost:3000/view/username` (replacing `username` with the username you submitted) and you should see the data displayed on the page.

## Conclusion

In this tutorial, we explored how to use Redis as a simple database for our Node.js Express.js web applications. We learned how to connect to our Redis server, save and retrieve data, and handle any errors that might occur. Redis offers a lightweight and efficient solution for storing and manipulating data in your web application. 