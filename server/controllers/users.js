import { validationResult } from "express-validator"
import userMod from "../model/usersModel.js"


// get All Users

// export const getAllUsers = async(req,res)=>{
//     try{

// const userss = await userMod.find()

// return res.status(200).json(userss)


//     }catch(err){
//         return res.status(500).json({error: err.message})
//     }
// }

export const getAllUsers = async (req, res) => {
    try {
      const page = req.query.p || 0 
      let usersPerPage = 3
  
      const AllUsers = await userMod.find().skip(page * usersPerPage).limit(usersPerPage)
      res.json(AllUsers);
    } catch(err){
                return res.status(500).json({error: err.message})
            }
  };



// Post User

export const postUser = async(req,res)=>{
    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

const  {name,email,job,place} = req.body
const {userId} = req.params

const newUser = new userMod({
    user:userId,
    name,
    email,
    job,
    place
})

const savedUser = await newUser.save()
return res.status(200).json(savedUser)

    }catch(err){
        return res.status(500).json({error: err.message})
    }
}



// get User By Id 


export  const getUserById = async(req,res)=>{
    try{
const {id} = req.params 

const getUser = await userMod.findById(id)

return res.status(200).json(getUser)
    }catch(err){
return res.status(500).json({error : err.message})
    }
}


// userUpdate 

export const updateUser = async (req,res) =>{
    try{
const {id,userId} = req.params
const {name,email,job,place} = req.body

const updatedUser = await userMod.findByIdAndUpdate( id ,{
    user:userId,
    name,
    email,
    job,
place
}) 

return res.status(200).json(updatedUser)

    }catch(err){
        return res.status(500).json({error : err.message})
    }
}

// Delete User

export const deleteUser = async (req,res) =>{
    try{
const {id} = req.params
const deletedUser = await userMod.findByIdAndDelete(id)
return res.status(200).json(deletedUser)

    }catch(err){
        return res.status(500).json({error : err.message})
    }
}


// Search Users


export const SearchUser = async(req,res) =>{
    try{
      let data = await userMod.find({
        "$or":[
          {name:{$regex:req.params.key}}
        ]
      })
    
      res.status(200).json(data);
    
    }catch(err){
      res.status(404).json({ message: err.message });
    }
    
    }



 