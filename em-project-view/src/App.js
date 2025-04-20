import './index.css';
import './App.css'; 
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AddEmployee from './component/AddEmployee';
import UpdateEmployee from './component/UpdateEmployee';
import EmployeeList from './component/EmployeeList';
import Navbar from './component/Navbar';


function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>

    <Routes>
       <Route index element={ <EmployeeList/> } />
       <Route path="/" element={ <EmployeeList/> } />
       <Route path="/addEmployee" element={ <AddEmployee/>} />
       <Route path="/editEmployee/:id" element={ <UpdateEmployee/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;     
