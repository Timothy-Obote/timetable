// routes/timetable.js

const express = require('express');
const router = express.Router();
const generateTimetable = require('./generateTimetable');
const fs = require('fs');
const path = require('path');

router.get('/generate', (req, res) => {
    try {
        const timetable = generateTimetable();
        res.render('timetable', { timetable });
    } catch (err) {
        res.send(`Error generating timetable: ${err.message}`);
    }
});

router.get('/', (req, res) => {
    const file = path.join(__dirname, '../data/timetable.json');
    const timetable = JSON.parse(fs.readFileSync(file));
    res.render('timetable', { timetable });
});

module.exports = router;
