const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')

dotenv.config({ path:'./config/config.env'});

connectDB();

const app = express();

app.use(express.json());

app.use('/api/v1/stores',require('./routes/stores'));

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>console.log(`server running on ${process.env.NODE_ENV} mode on port ${PORT}`))