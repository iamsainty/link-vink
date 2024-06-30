const express = require('express');
const dotenv = require('dotenv');
const connectToMongo = require('./config/db');
const cors = require('cors');

dotenv.config();

connectToMongo();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', (req, res) => {
    res.json({ Success: "Server is working perfectly" });
});
app.use('/auth', require('./routes/auth'));
app.use('/link', require('./routes/link'));

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
