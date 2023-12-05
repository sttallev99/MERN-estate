import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.router.js';
import listingRouter from './routes/listing.router.js';
import chatRouter from './routes/chat.router.js';
import messageRouter from './routes/message.router.js';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

const io = new Server(server, {
    cors: 'http://127.0.0.1:5173',
});

let onlineUserListings = [];

io.on('connection', (socket) => {
    console.log('User connected - ' + socket.id);

    socket.on('addOnlineUserListings', (userListings, socketId) => {
        userListings.forEach(listing => {
            !onlineUserListings.some(prevListing => prevListing._id === listing._id) &&
            onlineUserListings.push({
                ...listing,
                socketId
            })
        });
        io.emit('getOnlineUserListings', onlineUserListings);
    });

    socket.on('disconnect', () => {
        onlineUserListings = onlineUserListings.filter(listing => listing.socketId !== socket.id);
        io.emit('getOnlineUserListings', onlineUserListings);
        console.log('User disconnected!')
    })
},
)



mongoose.connect(process.env.MONGO)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})