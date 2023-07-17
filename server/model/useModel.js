import mongoose from 'mongoose'

const usserrsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    }
})

const newUsers = mongoose.model("newUsers",usserrsSchema)

export default newUsers