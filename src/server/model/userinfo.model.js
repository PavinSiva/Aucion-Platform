import mongoose from 'mongoose';


const userSchema =mongoose.Schema(
    {
        fullName :{
            type :String
        },
        email : {
            type :String
        },
        password :{
            type :String
        },
        userType :{
            type :String
        }  
    },
    {
        timestamp : true
    }
);
const user = mongoose.model("userinfo",userSchema);
export default user;