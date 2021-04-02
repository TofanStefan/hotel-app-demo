const db = require('../index.js');
const bcrypt = require('bcrypt');
const { findRoomsAvailable } = require('../controllers/reservation.controller');
exports.HardcodedDb=async()=>{
    try{
        db.Role.create({
        name:'Administrator'
      }),
      db.Role.create({
          name:'Guest'
      }),
      db.Role.create({
          name:'Cleaning Stuff'
      }),
      db.User.create({
        first_name:"Parasca",
        last_name:"Cristina",
        email:"cristina.parasca14@gmail.com",
        password:bcrypt.hashSync('123456',10),
        gender:"female",
        profile_photo:"uploads\\girl_photo1.jpg",
        age:14,
        roleId:'1'
      }),
      db.User.create({
        first_name:"Tofan",
        last_name:"Stefan",
        email:"stefan.tofan@gmail.com",
        password:bcrypt.hashSync('123456',10),
        gender:"male",
        profile_photo:"uploads\\photo1.jpg",
        age:22,
        roleId:'2'
      }),
      db.User.create({
        first_name:"Gulf",
        last_name:"Mike",
        email:"mike.gulf@gmail.com",
        password:bcrypt.hashSync('123456',10),
        gender:"male",
        age:23,
        roleId:'2'
      }),
      db.User.create({
        first_name:"Brooks",
        last_name:"Robert",
        email:"robert.brooks@gmail.com",
        password:bcrypt.hashSync('123456',10),
        gender:"male",
        age:30,
        roleId:'2'
      }),
      db.Room.create({
        type:'single',
        status:'available',
        price:'40',
        facilities:['Tv', 'microwave'],
        locked:false
      }),
      db.Room.create({
        type:'twin',
        status:'available',
        price:'60',
        facilities:['Tv', 'microwave', 'audio system'],
        locked:false
      }),
      db.Room.create({
        type:'twin',
        status:'available',
        price:'60',
        facilities:['Tv', 'microwave', 'audio system'],
        locked:false
      }),
      db.Room.create({
        type:'double',
        status:'available',
        price:'70',
        facilities:['Tv', 'microwave', 'balcony'],
        locked:false,
        photos: [
          "uploads\\1617365499729double1.jpg",
          "uploads\\1617365499733double2.jpg",
          "uploads\\1617365499736double3.jpg"
        ],
      }),
      db.Reservation.create({
        roomId:1,
        userId:1,
        check_in_date:"2021-12-23",
        check_out_date:"2021-12-25"
      })
    }
    catch(err){
        console.log(err.message);
    }
}