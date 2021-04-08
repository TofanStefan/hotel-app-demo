const db = require('../index.js')
const Room = db.Room;
const Reservation = db.Reservation;
const { body } = require("express-validator");
var fs = require('fs')
exports.create = (req, res) => {
    let paths = null
    paths = ["uploads\no_image.jpg", "uploads\no_image.jpg", "uploads\no_image.jpg"]
    if (req.files != null)
        paths = req.files.map(file => file.path)

    let fac = req.body.facilities;
    let facil = fac.split(",");
    const room = {
        type: req.body.type,
        status: req.body.status,
        price: req.body.price,
        facilities: facil,
        photos: paths
    }
    Room.create(room)
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            if (paths) {
                paths.forEach(path => {
                    fs.unlinkSync(path)
                })
            }
            res.status(500).send({
                message: err.message || "Some error occured while creating the room"
            })
        })
}
exports.findAll = async(req, res) => {
    try {
        const rooms = await Room.findAll();
        res.status(200).send(rooms);
    } catch (err) {
        res.status(404).send({ err: err.message || "Some error ocuured while getting rooms" })
    }
}
exports.findByType = async(req, res) => {
    try {
        const type = req.params.type
        const rooms = await Room.findAll({ where: { type: type } })
        res.status(200).send(rooms)
    } catch (err) {
        res.status(404).send({ err: err.message })
    }
}
exports.update = async(req, res) => {
    try {

        var paths = null
        if (req.files != null)
            paths = req.files.map(file => file.path)
        let fac = req.body.facilities;
        let facil = fac.split(",");
        const id = req.params.id;
        const room = await Room.findOne({ where: { id: id } })

        if (!room) {
            if (paths) {
                paths.forEach(path => {
                    fs.unlinkSync(path)
                })
            }
            return res.status(404).send(`No room with id=${id}`)
        }
        let count = req.body.count;
        let photos = room.photos
        if (paths != null) {
            if (count)
                count = count.split(',')
            for (let i = 0; i < count.length; i++) {
                if (photos[count[i]] !== 'public\\img\\no_image.jpg') {
                    fs.unlinkSync(photos[count[i]])
                }
                photos[count[i]] = paths[i]

            }
        }


        await Room.update({ photos: photos }, { where: { id: id } })
        room.type = req.body.type
        room.price = req.body.price
        room.facilities = facil
        room.save();
        console.log(room);


        res.status(200).send("Room updated succesfully!")
    } catch (err) {
        if (paths) {
            paths.forEach(path => {
                fs.unlinkSync(path)
            })
        }
        res.status(500).send({ err: err.message })
    }
}
exports.delete = async(req, res) => {
    try {
        const id = req.params.id;
        const room = await Room.findOne({ where: { id: id } })
        if (!room)
            return res.status(404).send(`No room with id=${id}`)

        Room.destroy({ where: { id: id } })
        if (room.photos[0] !== 'uploads\\no_image.jpg') {
            room.photos.forEach(path => {
                fs.unlinkSync(path)
            })
        }
        res.status(200).send("Room deleted succesfully!")
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
}
exports.validationRules = method => {
    switch (method) {
        case ('create'):
            {
                return [
                    body(['type']).exists().withMessage("Doesn't exist").isString().withMessage("Is not string"),
                    body(['price']).exists().withMessage("Doesn't exist").withMessage("Is not double"),
                    body(['facilities']).exists().withMessage("Doesn't exist!").isArray().withMessage("Is not array").notEmpty().withMessage("is empty"),
                    body(['photos']).optional()
                ]
                break;
            }
        case ('update'):
            {
                return [
                    body(['type']).optional().isString().withMessage("Is not string"),
                    body(['price']).optional(),
                    body(['facilities']).optional().isArray().withMessage("Is not array"),
                    body(['photos']).optional()
                ]
                break;
            }
    }
}