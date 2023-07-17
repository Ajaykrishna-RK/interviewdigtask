import newUsers from "../model/useModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export const register = async (req,res)=>{
 try{
const {name,email,password} = req.body
const salt = await bcrypt.genSalt();
const passwordHash = await bcrypt.hash(password, salt);

const newuse = new newUsers({
    name,
    email,
    password:passwordHash
}) 

const savedUse = await newuse.save()
return res.status(200).json(savedUse)
 }catch(err){
    return res.status(500).json({error:err.message})
 }   
}

export const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await newUsers.findOne({ email: email });
  
      if (!user) return res.status(400).json({ message: "USer Does Not Exist" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "invalid crendentials" });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
     
  
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const regsteredUserById = async (req,res)=>{
    try{
const {id} = req.params
const User = await newUsers.findById(id)
res.status(200).json(User);
    }catch(err){
      res.status(500).json({ error: err.message });
    }
  }