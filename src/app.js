const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const app = express();
const morgan = require('morgan');
const user = require('./routes/userRoutes');
const crypto = require('./routes/cryptoRoutes');
const wallet = require('./routes/walletRoutes');
const transaction = require('./routes/transactionRoutes');
const order = require('./routes/orderRoutes');


dotenv.config();
connectDB();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api', user)
app.use('/api', crypto)
app.use('/api', wallet)
app.use('/api', transaction)
app.use('/api', order)

app.get('/', (req, res) => {
    res.status(200).send("Server running!");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on  http://localhost:${PORT}/api`)
})