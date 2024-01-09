const User = require('../models/user')
const {hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken')


const test = (req,res)=>{
    res.json("test is working");
}

// Register endpoint
const registerUser = async(req,res)=>{
    try {
        // we need middleware or this info will give error, middleware will parse
        const {name,email,password} = req.body;
        // check if name is entered or not
        if (!name){
            return res.json({
                error: "Name is required"
            })
        }

        // check for password
        if (!password || password.length < 6){
            return res.json({
                error: "Password is required and should be at least 6 characters long"
            })
        }

        // check email, is email is found, exist is true, email is already existing, so use another email
        const exist = await User.findOne({email})
        if(exist){
            return res.json({
                error: "Email is already taken, use another one"
            })
        }
        
        const hashedPassword = await hashPassword(password)

        // create user in database
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        return res.json(user)
    } catch (error) {
        console.log(error);
    }
}

// login endpoint
const loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body;

        // check if user exists
        const user = await User.findOne({email})
        if(!user){
            return res.json({
                error: "No user found!"
            })
        }

        // check if passwords match
        const match = await comparePassword(password, user.password)

        // this is JWT assigning to user so that we can track the user which is logged in the whole time
        // JSON web token
        if(match){
            // res.json({
            //     message:"Login Successful"
            // })
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token)=>{
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
        }


    } catch (error) {
        console.log(error);
    }
}

const getProfile = (res,req)=>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err,user)=>{
            if(err) throw err;
            res.json(user);
        })
    }
    else{
        res.json(null)
    }
}



module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}