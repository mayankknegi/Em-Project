import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddEmployee from './component/AddEmployee';
import UpdateEmployee from './component/UpdateEmployee';
import EmployeeList from './component/EmployeeList';
import Navbar from './component/Navbar';

function App() {
  const [searchTerm, setSearchTerm] = useState(""); // ⭐ Search state

  return (
    <BrowserRouter>
      <Navbar setSearchTerm={setSearchTerm} /> {/* ⭐ pass function */}
      <Routes>
        <Route index element={<EmployeeList searchTerm={searchTerm} />} />
        <Route path="/" element={<EmployeeList searchTerm={searchTerm} />} />
        <Route path="/addEmployee" element={<AddEmployee />} />
        <Route path="/editEmployee/:id" element={<UpdateEmployee />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
