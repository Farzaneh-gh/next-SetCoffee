const mongoose = require("mongoose");
require("./User.js");
require("./Product.js");

const schema = new mongoose.Schema( {
    user: {
         type: mongoose.Types.ObjectId,
          ref: "User",
          required: true
         },
    product: {
         type: mongoose.Types.ObjectId, 
         ref: "Product" ,
         required: true
        },
  },
  { timestamps: true }
);

const model=mongoose.models.WishList || mongoose.model("WishList",schema);
module.exports=model