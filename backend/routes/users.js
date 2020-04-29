const {Router} = require('express');
const router = Router();
const Users = require('../models/User');

router.get('/',async(req,res)=>{
    const users = await Users.find();
    res.json(users);//se muestra en la api
});

router.post('/',async(req,res)=>{
    const {name,last_name,email,password,dui} = req.body;
    const newUser = new Users({name,last_name,email,password,dui});
    await newUser.save();
    res.json({message:'User Saved'});
    console.log(newUser);
});

module.exports = router;