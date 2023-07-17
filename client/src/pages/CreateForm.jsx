import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { BASEURL } from '../baseUrl'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function CreateForm() {
const {token,userData} = useSelector((state)=>state.Userss)
const navigate = useNavigate()
const [user,setUser] = useState({
    name:"",
    email:"",
    job:"",
    place:""
})

const handleChange  = (e)=>{
    setUser({...user,[e.target.name] : e.target.value})
}

const handleSubmit = async(e) =>{
e.preventDefault()
try{
    const response = await fetch(BASEURL+`users/${userData?._id}`,{
        method:"POST",
        body: JSON.stringify(user), 

        headers: {
            Authorization: `Bearer ${token}` ,
          'Content-Type': 'application/json' 
        }
    })
    const addedUser = await response.json()
if(response.ok){
    navigate('/')
    alert("User Added Successfully")
}else{
    alert(addedUser?.errors?.map((item)=>{
        return item.msg
    }))
}
}catch(err){
    console.log(err)
}

}

  return (
    <>
    <div style={{marginTop:"3%"}}>
<Button onClick={()=>navigate("/")}>Back</Button>
    </div>
     <div style={{textAlign:'center',fontSize:"30px", marginTop:"1%"}}>
            <h3>
                Create User
            </h3>
        </div>
    <div style={{justifyContent:'center',alignItems:"center",display:'flex',}}>
       
    <Box sx={{width:"90%"}}>

<form onSubmit={handleSubmit} >
<TextField fullWidth label="Name" name='name' value={user.name} onChange={(e)=>handleChange(e)} id="fullWidth"  />
<TextField fullWidth label="Email" id="fullWidth" name='email' value={user.email} onChange={(e)=>handleChange(e)} sx={{marginTop:"10px"}}/>
<TextField fullWidth label="Job" id="fullWidth" name='job' value={user.job} onChange={(e)=>handleChange(e)} sx={{marginTop:"10px"}}/>
<TextField fullWidth label="Place" id="fullWidth" name='place' value={user.place} onChange={(e)=>handleChange(e)} sx={{marginTop:"10px"}}/>
<div style={{justifyContent:"center",alignItems:'center',display:'flex',marginTop:"15px"}}>
    <Button  variant='contained' type='submit'>
       Create
    </Button>
</div>
</form>





</Box>
    </div>
  
    
    
    
    
    
    </>
  )
}

export default CreateForm