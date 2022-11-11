const express = require('express');
const router = express.Router();
const { initDBConnection, dbConnection: db } = require('../services/db');

router.get('/', (req, res) => {
    return res.status(200).json({ msg: "CollabSQL API root" });
});

router.post('/execsql', (req, res) => {
    console.log('Executing SQL query...');
    const data = req.body;
    try {
        initDBConnection();
        db.query(data['query'], (err, result, fields) => {
            if (err) {
                return res.status(400).json({ err: true, msg: err });
            } else {
                return res.status(200).json({ err: false, msg: 'Query executed', result });
            }
        });

    } catch (err) {
        console.log('DB Error', err);
        return res.status(400).json({ err: true, msg: err });
    }
});

module.exports = router;