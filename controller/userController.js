var userSchema = require('../models/users');

var controller = {};

controller.create = async function(req,res){
    let data = new userSchema({
        name: req.body.name,
        age: req.body.age
    });
    const user = await data.save();
    res.json(user);
}

controller.getAll = function(req,res){
    userSchema.find({}, function(err,users){
        if(err){
            return res.send(err);
        }
        else{
            return res.json({users});
        }
    });
}

controller.delete = function(req,res){
    let {id}= req.params;
    userSchema.deleteOne({_id:id}, function(err){
        if(err){
            return res.send(err);
        }
        else{
            return res.status(200).json({'message': 'Eliminado con exito'});
        }
    })
}

controller.search = function(req,res){
    let {id}= req.params;
    userSchema.findById(id, function(err,user){
        if(err){
            return res.send(err);
        }
        else{
            return res.json(user);
        }
    });
}

controller.update = async function(req,res){
    let {id}=req.params;
    let data ={
        name: req.body.name,
        age: req.body.age
    }
    await userSchema.findOneAndUpdate({_id:id}, data, function(err,old){
        if(err){
            return res.send(err);
        }
    })
    return res.json('Actualizado');
}

module.exports = controller;