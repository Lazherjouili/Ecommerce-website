const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    type : {
        type : String,
        required : [true , '{PATH} is required'],
        minLength : [3, '{PATH} must be at least 3 chars'],
        trim : true,
    },
    image : {
        type : [String],
        required : [true , '{PATH} is required'],
        // minLength : [3, '{PATH} must be at least 3 chars'],
        trim : true,
    },
    quantity : {
        type : Number,
        trim : true,
        required : [true, '{PATH} is required'],
        min : [1, '{PATH} must be at least 1'],
    },
    price : {
        type : Number,
        trim : true,
        required : [true, '{PATH} is required'],
        min : [5, '{PATH} must be at least 5 TND'],
    },
    favorite :{
        type : Boolean,
        default : false,
    },
    description :{
        type : String,
        trim : true,
        required : [true, '{PATH} is required'],
        minLength : [10, '{PATH} must be at least 10 chars'],
    }
},
{timestamps : true}
);

module.exports = mongoose.model('Product', ProductSchema);