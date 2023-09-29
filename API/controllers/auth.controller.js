import bcryptjs from 'bcryptjs';

import User from '../models/User.model.js';

export const signUp = async (req, res) => {
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try{
        await newUser.save();
        res.status(201).json('User created successfully!');
    }catch(err){
        res.status(500).json(err.message);
    }
}