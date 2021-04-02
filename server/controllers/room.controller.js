const db=require('../index.js')
const Room=db.Room;
const Reservation=db.Reservation;

exports.create=(req,res)=>{
    var paths = req.files.map(file => file.path)
    const room={
        type:req.body.type,
        status:req.body.status,
        price:req.body.price,
        facilities:req.body.facilities,
        locked:req.body.locked,
        photos:paths
    }
    Room.create(room)
    .then(data=>{
        res.status(200).send(data)
    })
    .catch(err=>{
        res.status(404).send({
            message:err.message||"Some error occured while creating the room"
        })
    })
}
exports.findAll=async (req,res)=>{
    try{
        const rooms=await Room.findAll();
        res.status(200).send(rooms);     
    }
    catch(err){
        res.status(404).send({err:err.message||"Some error ocuured while getting rooms"})
    }
}
exports.update=async(req,res)=>{
    try{
        const id=req.params.id;
        const room=await Room.update(req.body,{where:{id:id}})
        if(room!=1){
            return res.status(404).send(`No room with id=${id}`)
        }
        res.status(200).send("Room updated succesfully!")
    }
    catch(err){
        res.status(500).send({err:err.message})
    }
}
exports.delete=async(req,res)=>{
    try{
        const id=req.params.id;
        const room=await Room.destroy({where:{id:id}})
        if(!room){
            return res.status(404).send(`No room with id=${id}`)
        }
        res.status(200).send("Room deleted succesfully!")
    }
    catch(err){
        res.status(500).send({err:err.message})
    }
}
