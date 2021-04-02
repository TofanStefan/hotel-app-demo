module.exports=app=>{
    const users = require("../controllers/user.controller.js");
    const auth=require("../controllers/auth.controller")
    const utils=require("../utils/validator.utils.js")
    const router=require('express').Router();
    const upload=require('../utils/uploadImage.utils')
    
    router.post('/login',auth.login)
    router.post('/create',auth.authenticated,upload.single('profile_photo'),users.validationRules('create'),utils.validate,users.create);
    router.get('/get',auth.authenticated,users.findAll);
    router.get('/:id/get',users.findOne)
    router.put('/:id/update',auth.authenticated,users.validationRules('update'),utils.validate,users.update)
    router.delete('/:id/delete',auth.authenticated,users.delete)
    app.use('/api/user',router);
}