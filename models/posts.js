const mongoose = require('mongoose');

//Creating model
const postSchema = new mongoose.Schema({

    topic:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    postCategory:{
        type:String,
        required:true
    }

});
//export module
module.exports = mongoose.model('Posts',postSchema);