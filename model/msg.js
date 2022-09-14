const mongoose = require('mongoose');


const msg = new mongoose.Schema({
    title:{
       type: String,
       required: true,
    },
    msg_info:{
        type: String,
        required: true, 
    },
    massenger_name:{
        type: String,
        required: true,
    },
    msg_state:{
        type:String,
        default: 'في الانتظار'
    },
    time:{
        type:Date,
        default: new Date()
    },
    resaboutmsg:{
        type:String
    }
})

module.exports = mongoose.model('msg',msg);