const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: {     
        type: String,   
        required: true,
    }
});

const model = mongoose.models.Department || mongoose.model("Department", schema);
module.exports = model;