import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import CreateForm from './pages/CreateForm'
import { BASEURL } from './baseUrl'
import Home from './pages/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import SingleUserPage from './pages/SingleUserPage'
import Form from './pages/Form'
import { useSelector } from 'react-redux'

function App() {

  const {token} = useSelector((state)=>state.Userss)

  return (
   <>

   <Header/>
   <Routes>
    <Route path='/' element={  <Home/>}/>
    <Route path='/create' element={token ?  <CreateForm/> : <Navigate to={"/auth"}/>}/>
    <Route path='/single/:id' element={token ? <SingleUserPage/> : <Navigate to={"/auth"}/>}/>
    <Route path='/auth' element={!token ? <Form/> :<Navigate to={"/"}/> }/>
   </Routes>



   
   </>
  )
}

export default App
