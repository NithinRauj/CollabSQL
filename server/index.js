const express = require('express');
const app = express();
const cors = require('cors');
const apiRouter = require('./routes/main');
const { initConnection } = require('./services/socket');

app.use(express.json());
app.use(cors({
    origin: 'http://127.0.0.1:5173',
    methods: ['POST', 'GET', 'PUT', 'DELETE']
}));

const PORT = 7000;

app.use('/api/', apiRouter);

app.listen(PORT, () => {
    console.log('Server running...');
});

initConnection();