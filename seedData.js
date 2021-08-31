const mongoose=require('mongoose');
const User=require('./user')

const user=[
    {
        name:'rohan',
        email:'rohan@gmail.com'
    },{
        name:'raman',
        email:'raman@gmail.com'
    }
]

const seedDB = async ()=>{
    
    await User.insertMany(user);
    console.log("DB Seeded");
}

module.exports = seedDB;