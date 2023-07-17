import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { BASEURL } from "../baseUrl";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { setLogin } from "../redux/Slice";

function Form() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  const [auth, setAuth] = useState(false);

  const [registerUser, setRegisterUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const Register = async (e) => {
    e.preventDefault();
    try {
      const register = await fetch(BASEURL + `register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerUser),
      });
      const response = await register.json();

      if (register.ok) {
        alert("Registration Successfull");
        setAuth(false)
      } else {
        alert(response.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setRegisterUser({ ...registerUser, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };




  const Login = async (e)=>{
    e.preventDefault()
    try{
       
            const loginApi = await fetch(BASEURL+"login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(loginUser),
            });
      const response = await loginApi.json()

     
      

   if(loginApi.ok){
    dispatch(setLogin(response))
  
    navigate('/')
   }else{
    alert(response.error)
   }
    }catch(err){
console.log(err)
    }
} 

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >



<Box sx={{ width: "50%" }}>
{auth ?  
<form onSubmit={Register}>
  <h3 style={{ textAlign: "center" }}> Register </h3>
  <TextField
    fullWidth
    label="Name"
    name="name"
    value={registerUser?.name}
    onChange={(e) => handleChange(e)}
    id="fullWidth"
  />
  <TextField
    fullWidth
    label="Email"
    id="fullWidth"
    name="email"
    value={registerUser?.email}
    onChange={(e) => handleChange(e)}
    sx={{ marginTop: "10px" }}
  />
  <TextField
    fullWidth
    label="password"
    id="fullWidth"
    name="password"
    value={registerUser?.password}
    onChange={(e) => handleChange(e)}
    sx={{ marginTop: "10px" }}
  />

  <div
    style={{
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      marginTop: "15px",
    }}
  >
    <Button variant="contained" type="submit">
      Register
    </Button>
  </div>
</form>
:


<form onSubmit={Login}>
  <h3 style={{ textAlign: "center" }}> Login </h3>
  <TextField
    fullWidth
    label="Email"
    id="fullWidth"
    name="email"
    value={loginUser?.email}
    onChange={(e) => handleLoginChange(e)}
    sx={{ marginTop: "10px" }}
  />
  <TextField
    fullWidth
    label="password"
    id="fullWidth"
    name="password"
    value={loginUser?.password}
    onChange={(e) => handleLoginChange(e)}
    sx={{ marginTop: "10px" }}
  />

  <div
    style={{
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      marginTop: "15px",
    }}
  >

    <Button variant="contained" type="submit">
     Login
    </Button>
  </div>
</form>


}

<Typography  onClick={()=>setAuth(!auth)} sx={{fontSize:"14px",textAlign:"center",cursor:"pointer"}}>
    
    {auth ? "Already Have an Account ? Login" : "Dont have an account ? Register"}  
      
       </Typography>
</Box>






    
    </div>
  );
}

export default Form;
