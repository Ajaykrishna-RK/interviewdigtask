import mongoose from "mongoose";


const UsersSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'newUsers',
        required: true,
      },
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        unique:true,
        required:true,
        
    },
    job:{
        type:String
    },
    place:{
        type:String
    }
})

const userMod = mongoose.model("userMod",UsersSchema)

export default userMod