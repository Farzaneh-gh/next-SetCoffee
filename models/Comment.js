const mongoose = require("mongoose");
require("./Product.js");
require("./User.js");

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
    isPending:{
        type:Boolean,
        default:true
    },
    productId:{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    },
    userId:{
        type:mongoose.Types.ObjectId,
       required:false,
         ref:"User"
    },
    answer:{
        type:String,
        required:false
    },
    answerDate:{
        type:Date,
        required:false
    },
    answerAdminId:{
        type:mongoose.Types.ObjectId,
        required:false,
        ref:"User"
    },
    hasAnswered:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    }




})

const model=mongoose.models.Comment || mongoose.model("Comment",schema)
export default model;