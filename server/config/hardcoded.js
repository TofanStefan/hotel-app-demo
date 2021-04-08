const db = require('../index.js');
const bcrypt = require('bcryptjs');
const { findRoomsAvailable } = require('../controllers/reservation.controller');
exports.HardcodedDb = async() => {
    try {
        db.Role.create({
                name: 'Administrator'
            }),
            db.Role.create({
                name: 'Guest'
            }),
            db.Role.create({
                name: 'Cleaning Staff'
            }),
            db.User.create({
                first_name: "Parasca",
                last_name: "Cristina",
                email: "cristina.parasca14@gmail.com",
                password: bcrypt.hashSync('123456', 10),
                gender: "female",
                profile_photo: "public\\img\\girl_photo1.jpg",
                age: 14,
                roleId: '1'
            }),
            db.User.create({
                first_name: "Tofan",
                last_name: "Stefan",
                email: "stefan.tofan@gmail.com",
                password: bcrypt.hashSync('123456', 10),
                gender: "male",
                profile_photo: "public\\img\\photo1.jpeg",
                age: 22,
                roleId: '2'
            }),
            db.User.create({
                first_name: "Gulf",
                last_name: "Mike",
                email: "mike.gulf@gmail.com",
                profile_photo: "public\\img\\girl_photo1.jpg",
                password: bcrypt.hashSync('123456', 10),
                gender: "male",
                age: 23,
                roleId: '2'
            }),
            db.User.create({
                first_name: "Brooks",
                last_name: "Robert",
                email: "robert.brooks@gmail.com",
                profile_photo: "public\\img\\girl_photo1.jpg",
                password: bcrypt.hashSync('123456', 10),
                gender: "male",
                age: 30,
                roleId: '2'
            }),
            db.Room.create({
                type: 'Single',
                status: 'available',
                price: '40',
                facilities: ['TV', 'Sea View'],
                locked: false
            }),
            db.Room.create({
                type: 'Twin',
                status: 'available',
                price: '60',
                facilities: ['TV', 'Sea View', 'Mini-Bar'],
                locked: false
            }),
            db.Room.create({
                type: 'Twin',
                status: 'available',
                price: '60',
                facilities: ['TV', 'Wi-Fi', 'Audio System'],
                locked: false
            }),
            db.Room.create({
                type: 'Double',
                status: 'available',
                price: '70',
                facilities: ['TV', 'Sea View'],
                locked: false,
                photos: [
                    "\\img\\double1.jpg",
                    "\\img\\double2.jpg",
                    "\\img\\double3.jpg"
                ]
            }),
            db.Reservation.create({
                roomId: 1,
                userId: 1,
                check_in_date: "2021-12-23",
                check_out_date: "2021-12-25",
                nr_days: 2,
                total_price: 80
            }),
            db.Reservation.create({
                roomId: 1,
                userId: 2,
                check_in_date: "2021-06-05",
                check_out_date: "2021-06-25",
                nr_days: 2,
                total_price: 80,
                status: "Checked in"
            })
        db.Reservation.create({
            roomId: 2,
            userId: 1,
            check_in_date: "2021-04-05",
            check_out_date: "2021-04-06",
            nr_days: 2,
            total_price: 80
        }), db.Reservation.create({
            roomId: 1,
            userId: 2,
            check_in_date: "2021-04-04",
            check_out_date: "2021-04-05",
            nr_days: 2,
            total_price
        })
    } catch (err) {
        console.log(err.message);
    }
}
