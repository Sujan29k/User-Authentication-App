import { verify } from "crypto";
import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema({
username:{
type: String,
required: [true, "Please provide a username"],
unique: true,

},
email:{
type: String,
required: [true, "Please provide an email"],
unique: true,

},
password:{
type: String,
required: [true, "Please provide a password"],
},

isVerified:{
type: Boolean,
default: false,
},
isAdmin:{
type: Boolean,
default: false,
},
forgotPasswordtoken:String,
forgotPasswordExpiry:Date,
verifyToken:String,
verifyTokenExpiry:Date,
},
{

});

const User =  mongoose.models.uers||mongoose.model("users", userSchema);

export default User;
