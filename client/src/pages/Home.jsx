import { useEffect, useState  } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { BASEURL } from '../baseUrl';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


 const lists = ["Name","Email","Job","Place","View"]

export default function Home() {
const navigate = useNavigate()
const [paginationCount,setPaginationCount] = useState(0)

const {userData,token} = useSelector((state)=>state.Userss)

;
    const [userDetails,setUserDetails] = useState([])

    const fetchAllusers = async () => {
      const response = await fetch(BASEURL+`users?p=${paginationCount}` , {
       method:"GET"
      });
      const datas = await response.json();
      setUserDetails(datas);
    };
    
    useEffect(()=>{
  fetchAllusers()
    },[paginationCount])
  
    // const fetchAllusers = async () => {
    //   const response = await fetch(`http://localhost:3001/admin/users?p=${paginationCount}`, {
    //     method: "GET",
    //     headers: { AdminAuth: `Bearer ${adminToken}` },
    //   });
    //   const datas = await response.json();
    //   setUserDetails(datas);
    // };

if(!userDetails ) return null
  return (
    <div>


      
      <Box m={3}>
    <h3 style={{textAlign:"center",fontSize:"40px"}}> All Users </h3>
    <div style={{justifyContent:"end",alignItems:'center',display:'flex'}}>
            <Button variant='contained' onClick={()=>navigate('/create')}>
                Create User

            </Button>
        </div>
      <TableContainer component={Paper} sx={{marginTop:'10px'}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{backgroundColor:'black'}} >
            <TableRow>
                {lists.map((item)=>(
                    <TableCell sx={{color:'white'}}>{item}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userDetails && Array.isArray(userDetails) && userDetails.map((userDetail) => (
              <TableRow
                key={userDetail._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
              <TableCell>   {userDetail?.name}</TableCell>
         
            
                <TableCell>{userDetail?.email} </TableCell>
                <TableCell>{userDetail?.job}</TableCell>
                <TableCell>{userDetail?.place}</TableCell>
                <TableCell>
                    <Link to={`/single/${userDetail._id}`}>
                    <Button>
                        View
                    </Button>
                    
                    </Link>
                
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{justifyContent:"end",alignItems:"end",display:"flex", marginTop:"10px"}}>
        

        {paginationCount === 0 ? <Button onClick={()=>setPaginationCount(paginationCount  - 1)} disabled>previous</Button> :<Button onClick={()=>setPaginationCount(paginationCount  - 1)}>previous</Button>  }   
        {userDetails && userDetails.length === 0 ?  <Button onClick={()=>setPaginationCount(paginationCount +1)} disabled>next</Button>:  <Button onClick={()=>setPaginationCount(paginationCount +1)}>next</Button>}     
           </Box>
    </Box>
    

    
  
        
  
  </div>
  );
}