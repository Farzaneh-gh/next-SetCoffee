const mongoose = require("mongoose");
require("./Department.js");
const schema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    departmentId:{
        type:mongoose.Types.ObjectId,
        ref:"Department",
        required:true
    }
});


const model=mongoose.models.SubDepartment || mongoose.model("SubDepartment",schema);
module.exports=model