import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'

mongoose.connect(process.env.MONGO)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err))
const app = express();

app.get('/', (req, res) => {
    res.send('Hello world');
    res.end();
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})