// username ,useremail,password,confirmpassword

const mongoose = require("mongoose");
const Schema = mongoose.Schema
const registrationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      // minlength: 5,
      // maxlength: 100,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      // minlength: 5,
      // maxlength: 35,
      required: true,
    },
    favoriteSports: {
      type: String,
      maxlength: 35,

    },
  },
  {
    timestamps: true,
  }
);
// databaseTable name , schema name 
const registrationschema = mongoose.model("registrationInfo", registrationSchema);

module.exports = registrationschema;