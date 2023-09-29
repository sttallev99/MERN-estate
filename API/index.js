import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.router.js';

const app = express();

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

mongoose.connect(process.env.MONGO)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})