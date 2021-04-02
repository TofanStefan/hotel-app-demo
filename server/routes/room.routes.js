module.exports=app=>{
    const rooms=require("../controllers/room.controller.js")
    const router=require('express').Router();
    const upload=require('../utils/uploadImage.utils')
    router.post("/create",upload.array('photos',10),rooms.create)
    router.get("/get",rooms.findAll)
    router.put("/:id/update",rooms.update)
    router.delete("/:id/delete", rooms.delete)
    app.use("/api/room",router);
}