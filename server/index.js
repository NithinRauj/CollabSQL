const express = require('express');
const app = express();
const apiRouter = require('./routes/main');
app.use(express.json());

const PORT = 7000;

app.use('/api/', apiRouter);

app.listen(PORT, () => {
    console.log('Server running...');
});
