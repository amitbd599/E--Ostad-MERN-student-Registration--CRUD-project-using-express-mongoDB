// routes/students.js
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

// Create a new student
router.post('/create', async (req, res) => {

    const db = req.db;
    const student = req.body;
    try {
        const result = await db.collection('students').insertOne(student);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get all students
router.get('/get', async (req, res) => {
    const db = req.db;

    try {
        const students = await db.collection('students').find().toArray();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get a student by ID
router.get('/get-single/:id', async (req, res) => {
    const db = req.db;
    const id = req.params.id;

    try {
        const student = await db
            .collection('students')
            .findOne({ _id: new ObjectId(id) });
        if (!student) {
            res.status(404).send('Student not found');
        } else {
            res.json(student);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update a student
router.post('/single-update/:id', async (req, res) => {
    const db = req.db;
    const id = req.params.id;
    const updatedStudent = req.body;

    try {
        const result = await db.collection('students').updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedStudent }
        );

        res.status(200).json(result);


    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete a student
router.delete('/single-delete/:id', async (req, res) => {
    const db = req.db;
    const id = req.params.id;

    try {
        const result = await db
            .collection('students')
            .deleteOne({ _id: new ObjectId(id) });


        res.status(200).json(result);

    } catch (err) {
        res.status(500).send(err);
    }
});


// Delete all student
router.delete('/delete-all', async (req, res) => {
    const db = req.db;
    const id = req.params.id;

    try {
        const result = await db
            .collection('students')
            .deleteMany({});


        res.status(200).json(result);

    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
