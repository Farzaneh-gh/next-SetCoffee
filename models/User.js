const mongoose=require("mongoose");

const schema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:false
    },
    phone:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false
    },
    role:{
        type:String,
        default:"USER"
    },
    refreshToken:{
        type:String
    }
});

const model=mongoose.models.User || mongoose.model("User",schema)

export  default model;