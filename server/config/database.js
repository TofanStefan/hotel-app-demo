const Sequelize = require('sequelize');
module.exports = new Sequelize('d3mhhn0okh3ghg', 'gybjvokskuzgly', '170105cdc457ce70f184827644def1167175026d2ff68ba37365cfbc43211e21', {
    host: 'ec2-54-155-226-153.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres',
    comparatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});