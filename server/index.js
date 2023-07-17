import  express  from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from "./routes/users.js"
import authRoutes from './routes/Auth.js'
import mongoose from "mongoose";

const app = express()
dotenv.config()
app.use(express.json());
app.use(cors())


app.use("/",userRoutes)
app.use("/",authRoutes)

const PORT = process.env.PORT


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("dataBase Connected")
    app.listen(PORT,()=> console.log("Server Started"))

// Add Data One Time
// UUser.insertMany(users)
// Post.insertMany(posts) 
})
.catch((err)=>{
    console.log(err,"error :Data base not connected")
})

