module.exports=app=>{
    const reservation=require("../controllers/reservation.controller");
    const router=require('express').Router();
    router.post('/create',reservation.create);
    router.post('/available',reservation.findRoomsAvailable)
    router.get('/get',reservation.findAll)
    router.delete('/:id/delete',reservation.delete)
    router.get("/:userId",reservation.findByUser)
    app.use('/api/reservation',router)
}