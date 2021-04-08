const nodemailer = require('nodemailer')
const USER = 'atlantichotel06@gmail.com'
const PASS = 'atlantique'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: USER,
        pass: PASS,
    }
});
module.exports = transporter;