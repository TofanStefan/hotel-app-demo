const { body } = require("express-validator");
const {  param, validationResult } = require('express-validator');
const db=require("../index.js")
const User=db.User;
const bcrypt=require('bcrypt');
const { Role } = require("../index.js");

exports.create=async(req,res)=>{
    try{
        const invalidUser=await User.findOne({where:{email:req.body.email}})
        if(invalidUser){
            return res.status(404).send({message:"User already exists"})
        }
        const hashedPass=bcrypt.hashSync(req.body.password,10)
        const user={
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email,
            password:hashedPass,
            gender:req.body.gender,
            age:req.body.age,
            profile_photo:req.file.path
        }
        User.create(user)
        res.status(200).json();
    }
    catch{
        (err=>{
        res.status(500).send({
            message:err.message||"Some error ocured while creating user."
        })
    })}
}

exports.findOne=async(req,res)=>{
    try{
        const id=req.params.id;
        const user=await User.findOne({where:{id:id},
            include:[{
                model:Role,
                attributes:['name']
            }]
        })
        if(!user)
            return res.status(404).send({message:`Cannot get User with id=${id}`})
        res.status(200).send(user);
    }
    catch(err){
        res.status(500).send({err:err.message})
    }
}
exports.findAll=(req,res)=>{
    User.findAll()
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message||"Some error ocured while getting users."
        })
    })
}
exports.update=(req,res)=>{
    const id=req.params.id;
    User.update(req.body,{where:{id:id}})
    .then(num=>{
        if(num==1){
            res.send({
                message:"User was updated succesfully!"
            })
        }
        else{
            res.status(404).send({message:`Cannot update User with id=${id}. Maybe user was not found or req.body is empty!`})
        }
    })
}

exports.delete=async(req,res)=>{
    try{
        const id=req.params.id;
        const user=await User.destroy({where:{id:id}})
        if(!user){
            return res.status(404).send(`No user with id=${id}`)
        }
        res.status(200).send("User was deleted succesfully!")
    }
    catch(err){
        res.status(500).send({err:err.message})
    }
}


exports.validationRules=method=>{
    switch(method){
        case('create'):{
            return[
            body(['first_name','last_name']).exists().withMessage("Doesn't exist").isString().withMessage("Is not string"),
            body(['email']).exists().withMessage("Doesn't exist").bail().isEmail().withMessage("Is not string"),
            body(['password']).exists().withMessage("Enter password! ").bail().isString().withMessage("Is not string").notEmpty().withMessage("is empty"),
            body(['age']).optional().isInt(),
            body(['gender','profile_photo']).optional()]
            break;
        }
        case('update'):{
            return[
                body(['first_name','last_name']).exists().withMessage("Doesn't exist").isString().withMessage("Is not string"),
                //body(['email']).exists().withMessage("Doesn't exist").bail().isEmail().withMessage("Is not string"),
                //body(['password']).exists().withMessage("Enter password! ").bail().isString().withMessage("Is not string").notEmpty().withMessage("is empty"),
                body(['age']).optional().isInt(),
                body(['gender','profile_photo']).optional()]
                break;
        }
    }
}
exports.validate=(req,res,next)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        const err = errors.array().map(object => {return  {msg: `${object.param}: ${object.msg}`}});
        res.status(422).json({ errors: err});
        return;
    }
    else {
        next();
        return;
    }
}
