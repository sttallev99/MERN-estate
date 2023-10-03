import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.router.js';
import listingRouter from './routes/listing.router.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

mongoose.connect(process.env.MONGO)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})