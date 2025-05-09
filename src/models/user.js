// const mongoose = require("mongoose");
// const validator = require("validator")
// const userSchema = new mongoose.Schema(
//     {
//         firstName: {
//             type: String,
//             required: true,
//             minLength: 4,
//             maxLength: 30,
//         },
//         lastName:{
//             type: String,
//         },
//         emailId:{
//             type: String,
//             lowercase: true,
//             required: true,
//             unique: true,
//             trim: true,
//             validator(value){
//                 if(!validator.isEmail(value)){
//                     throw new Error ("invalid email address:" +value);
//                 }
//             }
//         },
//         password:{
//             type: String,
//             required: true,
//             validate(value){
//                 if(validator.isStrongPassword(value)){
//                     throw new Error("enter a strong password:" +value);
//                 }
//             }
//         },
//         age: {
//             type: Number,
//             min: 18,
//         },
//         gender:{
//             type: String,
//             validate(value){
//                 if(!["male","female","others"].includes(value)){
//                     throw new Error("gender data is not valid");
//                 }
//             }
//         },
//         photoUrl:{
//             type: String,
//             default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.marvel.com%2Fmovies%2Favengers-endgame&psig=AOvVaw0r7g8USDIu-LeD1-MD0j4w&ust=1746640641339000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMjknMu1j40DFQAAAAAdAAAAABAE",
//         },
//         about:{
//             type: String,
//             default: "this is the default about of the user"
//         },
//         skills:{
//             type:[String],
//         },
//     },
//     {
//         timestamps: true,
//     }
// );
// module.exports = mongoose.model("User", userSchema);







const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 30,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough: " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.marvel.com%2Fmovies%2Favengers-endgame",
    },
    about: {
      type: String,
      default: "this is the default about of the user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const bcrypt = require("bcrypt");
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.getJWT = async function (){
    const user = this;
    const token = await jwt.sign({_id: user._id}, "DEV@Tiner$790",{
        expiresIn: "7d",
    });
    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,passwordHash
    );
    return isPasswordValid;
}
module.exports = mongoose.model("User", userSchema);
