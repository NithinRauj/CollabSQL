const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({ msg: "CollabSQL API root" });
});

router.get('/execsql', (req, res) => {
    console.log('Executing SQL query...');
    return res.status(200).json({ msg: "Executing query" });
});

module.exports = router;