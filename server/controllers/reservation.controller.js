const db=require('../index.js')
const { Op, DATEONLY } = require("sequelize");
const Sequelize=require('sequelize');
const Room=db.Room;
const Reservation=db.Reservation;
const User=db.User
exports.create=async(req,res)=>{
    try{
        const user=await User.findOne({where:{
            id:req.body.userId
        }})
        if(!user)
            return res.status(404).send({message:`No user with id=${req.body.userId}`})
        const room=await Room.findOne({where:{
            id:req.body.roomId
        }})
        if(!room)
            return res.status(404).send({message:`No room with id=${req.body.roomId}`})
        const exists=await Reservation.findOne({where:{
            userId:req.body.userId,
            roomId:req.body.roomId,
            check_in_date:req.body.check_in_date,
            check_out_date:req.body.check_out_date
        }})
        if(exists)
            return res.status(404).send({message:`No user with id=${req.body.userId}`})
        
            const reservation={
                userId:req.body.userId,
                roomId:req.body.roomId,
                check_in_date:req.body.check_in_date,
                check_out_date:req.body.check_out_date
            }
        const reservationCreated=await Reservation.create(reservation)  
        return res.status(200).send(reservationCreated)      
    }
    catch(err){
        res.status(500).send({err:err.message})
    }
}

exports.findAll=async(req,res)=>{
    try{
        const reservations=await Reservation.findAll();
        res.status(200).send(reservations);
    }
    catch(err){
        res.status(500).send({err:err.message||"Some error ocuured while retrieving reservations!"})
    }
}

exports.findByUser=async(req,res)=>{
    try{
        const id=req.params.userId
        const user=User.findOne({where:{id:id}})
        if(!user){
            return res.status(404).send({message:`No user with id=${id}`})
        }
        const reservation=await Reservation.findAll({where:{userId:id}})
        res.status(200).send(reservation)
    }
    catch(err){
        res.status(500).send({err:err.message})
    }
}
exports.delete=async(req,res)=>{
    try{
        const id=req.params.id
        const reservation=await Reservation.destroy({where:{id:id}})
        if(!reservation){
            return res.status(404).send({message:`No reservation with id=${id}`})
        }
        res.status(200).send("Reservation deleted succesfully!")
    }
    catch(err){
        res.status(500).send({err:err.message})
    }
}

exports.findRoomsAvailable=async(req,res)=>{
    try{
        var response={
            nr_days,
            single:[],
            twin:[],
            double:[]
        }
        var roomsId=[]
        const reqIn=req.body.check_in_date
        const reqOut=req.body.check_out_date
        const roomsAvailable=await Reservation.findAll({where:{
            [Op.or]:[
                {
                    check_in_date:{
                        [Op.between]:[reqIn,reqOut]
                    }
                },
                {
                    check_out_date:{
                        [Op.between]:[reqIn,reqOut]
                    }
                },
                {
                    check_in_date:{[Op.lte]:reqIn},
                    check_out_date:{[Op.gte]:reqIn}
                },
                {
                    check_in_date:{[Op.lte]:reqOut},
                    check_out_date:{[Op.gte]:reqOut}
                }
            ] 
        }})
        var Difference_In_Time = new Date(reqOut).getTime() - new Date(reqIn).getTime();
        var nr_days = Difference_In_Time / (1000 * 3600 * 24);
        response.nr_days=nr_days
        roomsId=roomsAvailable.map(room=>room.roomId)
        const roomsSingle=await Room.findAll({
            where:{
                id:{[Op.notIn]:roomsId},
                type:'single'
            },
            attributes: {
                include: [[Sequelize.literal(`${Sequelize.col('price').col} * ${nr_days}`), 'total_price'],'type','facilities'],
                exclude:['createdAt','updatedAt','price','locked']
            },

        })
        const roomsTwin=await Room.findAll({
            where:{
                id:{[Op.notIn]:roomsId},
                type:'twin'},
            attributes: {
                include: [[Sequelize.literal(`${Sequelize.col('price').col} * ${nr_days}`), 'total_price']],
                exclude:['createdAt','updatedAt','price','locked']
            }
        })
        const roomsDouble=await Room.findAll({
            where:{
                id:{[Op.notIn]:roomsId},
                type:'double'
            },
            attributes: {
                include: [[Sequelize.literal(`${Sequelize.col('price').col} * ${nr_days}`), 'total_price']],
                exclude:['createdAt','updatedAt','price','locked']
            }
        })
        response.single=roomsSingle;
        response.twin=roomsTwin;
        response.double=roomsDouble;
        res.status(200).json(response);
    }
    catch(err){
        res.status(404).send({
            message:err.message||"Error in getting rooms"
        })
    }
    
}