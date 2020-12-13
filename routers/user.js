const router = require("express").Router()
const User = require('../models/User')

/*
    Get all users
*/

router.get('/all',async(req,res)=>{
    try{
        const users = await User.find({})
        res.json({
            code : 200 ,
            msg : 'OK',
            data : users
        })
    }
    catch(err){
        res.json({
            code : 500 ,
            msg : 'Internal Server Error',
        })
    }
})

/*
    Signup
*/

router.post('/signup',async(req,res)=>{
    try{
        const userExists=await userExists(req.body.email)
        if(userExists)
        {
            res.send({
                code : 200,
                msg  : 'Email id already taken'
            })
        }
        else{
            const hashPwd = await bcrypt.hash(req.body.password,10)
            const newUser = new User({
                email       : req.body.email,
                name        : req.body.name,
                phoneNumber : req.body.phoneNumber,
                date        : req.body.date,
                password    : hashPwd
            })
            await newUser.save()
            res.json({
                code : 201,
                msg : 'User created successfully'
            })
        }
    }
    catch(err){
        res.json({
            code : 500 ,
            msg : 'Internal Server Error',
        })
    }
})

/*
    Login
*/

router.post('/login',async(req,res)=>{
    try{
        const userExists=await userExists(req.body.email)
        if(userExists)
        {
            const user = await User.findOne({email:req.body.email})
            const password = user.password
            const match = await bcrypt.compare(req.body.password, password)
            if(match)
            {
                req.session.userid=user.id
                res.send({
                    code : 200,
                    msg  : 'Login Successfull',
                    data:{
                        id:user.id,
                        email:user.email
                    }
                })
            }
            else
            {
                res.send({
                    code : 400,
                    msg  : 'Invalid Credential'
                })

            }
        }
        else
        {
            res.send({
                code : 404,
                msg  : 'User not found'
            })

        }
    }
    catch(err){
        res.json({
            code : 500 ,
            msg : 'Internal Server Error',
        })
    }
})
module.exports = router