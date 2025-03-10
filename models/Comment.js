const mongoose = require("mongoose");
require("./Product.js");

const schema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true    
    },
    score:{type:Number,
        required:true
    },
  
    date:{
        type:Date,
        default:Date.now,
        immutable:false
    },
    isAccept:{
        type:Boolean,
        default:false
    },
    productId:{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    }


})

const model=mongoose.models.Comment || mongoose.model("Comment",schema)
export default model;