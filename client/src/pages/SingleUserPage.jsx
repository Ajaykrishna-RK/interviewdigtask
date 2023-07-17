import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BASEURL } from '../baseUrl';
import { Button, Card, TextField } from '@mui/material';
import { useSelector } from 'react-redux';

function SingleUserPage() {
const {id} = useParams()
const [user,setUser] = useState()
const [userById,setUserById] = useState()
const [edit , setEdit] = useState(false)
const {userData,token} = useSelector((state)=>state.Userss)
const navigate = useNavigate()

const getUser = async () => {

  
    const response = await fetch(BASEURL+`users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}` ,
        'Content-Type': 'application/json' 
      }
      
    });
    const data = await response.json();
    setUser(data);
   
  };
  console.log(user,"Oo")

  const getregisteredUserById = async () => {

  
    const response = await fetch(BASEURL+`${user?.user}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}` ,
        
      }
      
    });
    const data = await response.json();
setUserById(data)
  };

  useEffect(() => {
    getUser();
 
  }, []); 

  useEffect(()=>{
getregisteredUserById()
  },[user?.user])


  const handleChange = (e) =>{
    setUser({...user,[e.target.name]:e.target.value})

  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
        const response = await fetch(BASEURL+`users/${id}/${userData._id}`,{
            method:"PATCH",
            body: JSON.stringify(user), 
            headers: {
              Authorization: `Bearer ${token}` ,
              'Content-Type': 'application/json' 
            }
        })
        const addedUser = await response.json()
      if(response.ok){
        navigate('/')
       alert("Updated Successfully")
      }
    }catch(err){
        console.log(err)
    }
   

  }

const handleDelete = async(id) =>{
    try{
        const response = await fetch(BASEURL+`users/${id}`,{
            method:"DELETE",
          
            headers: {
              Authorization: `Bearer ${token}` ,
              
            }
        })
        const addedUser = await response.json()
        if(response.ok){
          navigate('/')
         alert("Deleted Successfully")
        }
    }catch(err){
        console.log(err)
    }
   
}

  if(!user) return null 


  return (
    <>
<div style={{marginTop:"3%"}}>
<Button onClick={()=>navigate('/')}>Back
</Button>
</div>


<div style={{justifyContent:"center",alignItems:"center",display:"flex",marginTop:'2%'}}>
        <Card sx={{width:"50%"}}>
        

        {edit ? 
          <form  onSubmit={handleSubmit}>
          <h3 style={{textAlign:"center"}}>Edit User</h3>
  <TextField fullWidth label="Name" name='name' value={user?.name} onChange={(e)=>handleChange(e)} id="fullWidth"  />
  <TextField fullWidth label="Email" id="fullWidth" name='email' value={user?.email} onChange={(e)=>handleChange(e)}  sx={{marginTop:"10px"}}/>
  <TextField fullWidth label="Job" id="fullWidth" name='job' value={user?.job} onChange={(e)=>handleChange(e)} sx={{marginTop:"10px"}}/>
  <TextField fullWidth label="Place" id="fullWidth" name='place' value={user?.place} onChange={(e)=>handleChange(e)}  sx={{marginTop:"10px"}}/>
  <div style={{justifyContent:"center",alignItems:'center',display:'flex',marginTop:"15px"}}>
      <Button  variant='contained' type='submit'>
       Update
      </Button>
  </div>
  </form>

  : 
  <div style={{textAlign:'center'}}>
 {user.user === userData._id ? <p style={{textAlign:"start"}}> This  user is Created by : {userById?.name} (you) </p> :<p style={{textAlign:"start"}}> This  user is Created by : {userById?.name}</p> } 
  <p> Name : {user?.name}</p>
  <p>Email :  {user?.email}</p>
  <p> Job : {user?.job}</p>
  <p> place : {user?.place}</p>

{user.user === userData._id ? <div>
      <Button onClick={()=>setEdit(true)}>
          Edit
      </Button>

      <Button onClick={()=>handleDelete(user._id)}>
          Delete
      </Button>
  </div> : "" }
  
</div>
    
    }


  

  


</Card>

    </div>
    </>
   
  )
}

export default SingleUserPage