

module.exports=(sequelize,Sequelize)=>{
    const Reservation=sequelize.define('reservation',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        check_in_date:{
            type:Sequelize.DATEONLY,
            allowNull:false
        },
        check_out_date:{
            type:Sequelize.DATEONLY,
            allowNull:false
        }
    })
    return Reservation
}