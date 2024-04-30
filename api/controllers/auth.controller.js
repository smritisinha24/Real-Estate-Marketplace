import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async(req,res,next) => {
    const { username , email , password} = req.body;
    const hashedPassword = await bcryptjs.hashSync(password, 10);
    const newUser = new User({ username , email, password:hashedPassword });
    
    try{
        await newUser.save();
        res.status(201).json('User created successfully!');        
    }
    catch(error){
        next(error);
    }
};

export const signin = async(req,res,next) => {
    const {email , password} = req.body;
    // handling the error using the middleware created inside the index.js
    try{
        const validUser = await User.findOne({email});
        // if the user is not valid, using the cunstomised error handler created in error.js to handle it
        if(!validUser) return next(errorHandler(404, 'User not found!'));
        const validPassword = bcryptjs.compareSync(password , validUser.password);
        if(!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
        // if both email and password is correct, I need to authenticate the user, and to do so I need to add the cookies inside the browser
        // for that, i need to create a hashtoken that includes the email(id) of the user and store it safely inside the browser
        const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET)

        // to remove the password before sednding it back to the user
        const {password: pass, ...rest } = validUser._doc;

        res.cookie('acess_token' , token, {httpOnly: true })
        .status(200)
        .json(rest);
    }
    catch(error){
        next(error);
    }
}