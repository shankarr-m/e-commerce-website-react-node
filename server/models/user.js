const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true,},
  email:{type:String,required:true,unique:true},
  phno:{type:Number,required:true},
  password: { type: String, required: true },
  purchasedItems: [
    { type: Schema.Types.ObjectId, ref: "product", default: [] },
  ],
  cartItem: [{ type: Schema.Types.ObjectId, ref: 'product' }],
  addresses: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phno: { type: Number, required: true },
      address: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: false},
    }
  ]
  
});

const UserModel = model("user", UserSchema);

module.exports = UserModel;
