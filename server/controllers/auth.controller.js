const db = require("../index")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ACCESS_TOKEN_SECRET = '8f8a2bae70e1ba6f28c48986ef4528a4fd94b7a036d51ee954caa4ef1620ada2a6ae0a640c1b00481058ef158a1d0480d63f800e46bf0848a5d069bbdd96399d'
exports.login = async(req, res, next) => {
    try {
        const user = await db.User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (!user) {
            return res.status(404).send({ message: "Email not found!" })
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(404).send({ message: "Password incorrect!" })
        }
        let token = jwt.sign({ userId: user.id, roleId: user.roleId }, ACCESS_TOKEN_SECRET);
        return res.status(200).send({
            title: "login",
            token: token
        })
    } catch (err) {
        res.status(500).send(err.message);
    }

}
exports.authenticated = (req, res, next) => {
    let token = req.headers.token;
    console.log(token)
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "unauthorized" })
        }
        next()
    })
}
exports.authenticatedAdmin = async(req, res, next) => {
    let token = req.headers.token;
    console.log(token)
    jwt.verify(token, ACCESS_TOKEN_SECRET, async(err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "unauthorized" })
        }
        const user = await db.User.findOne({ where: { id: decoded.userId } })
        if (!user)
            return res.status(404).send({ message: "No user with given id" })

        if (user.roleId != 1)
            return res.status(401).send({ message: "unauthorized" })
        next()
    })


}