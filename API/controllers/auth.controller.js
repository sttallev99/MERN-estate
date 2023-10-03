import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.model.js';
import { errorHandler } from '../utils/error.js';

export const signUp = async (req, res, next) => {
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try{
        await newUser.save();
        res.status(201).json('User created successfully!');
    }catch(err){
        next(err)
    }
}

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try{
        const validUser = await User.findOne({ email });
        if(!validUser) return next(errorHandler('404', 'User not found!'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401, 'Invalid password!'));
        const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET);
        const { password: pass, ...restUserData } = validUser._doc;
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(restUserData);
    }catch(err) {
        next(err);
    }
}

export const google = async (req, res, next) => {
    try{
        const user = await User.findOne({ email: req.body.email});

        if(user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const modifiedUsername = req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4);
            const newUser = new User({username: modifiedUsername, email: req.body.email, password: hashedPassword, avatar: req.body.photo});
            await newUser.save();
            const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest); 
        }
    }catch(err) {
        next(err);
    }
}

export const signOut = (req, res, next) => {
    try{
        res.clearCookie('access_token');
        res.status(200).json('User has beed logged out!');
    }catch(err){
        next(err);
    }
}