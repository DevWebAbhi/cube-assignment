import React from 'react'
import {Routes,Route,BrowserRouter} from "react-router-dom";
import LandingPage from './Components/LandingPage.tsx';
const AllRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<LandingPage/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default AllRoutes
