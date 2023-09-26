import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

import userRouter from './routes/user.route.js';

const app = express();

app.use('/api/user', userRouter);

mongoose.connect(process.env.MONGO)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})