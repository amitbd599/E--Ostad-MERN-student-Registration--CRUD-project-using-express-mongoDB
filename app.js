// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();
const port = 5000;
// Import Routes
const studentRoutes = require('./routes/students');


// MongoDB connection settings
const url = 'mongodb://localhost:27017';
const dbName = 'studentdb';
let db = null;

// Connect to MongoDB
const connectToDB = async () => {
    if (db) {
        return db;
    } else {
        const client = new MongoClient(url);
        await client.connect();
        db = client.db(dbName);
        console.log('Connected successfully to MongoDB server');
        return db;
    }
};



// Middleware
app.use(bodyParser.json());

// Database connection and server start
connectToDB()
    .then((database) => {
        // Make the db accessible to the router
        app.use((req, res, next) => {
            req.db = database;
            next();
        });
        // Routes
        app.use('/api', studentRoutes);

    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });



// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});