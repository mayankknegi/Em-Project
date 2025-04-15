import React from 'react';
import { Link } from 'react-router-dom'; // 👈 Yeh line zaroori hai
    
const Navbar = ({ setSearchTerm }) => {
  return (
    <div className="bg-slate-800 h-16 px-16 flex items-center justify-between text-white">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-green-400">EM Service</h1>
      </div>

      <div className="flex items-center gap-6">
        <Link className="hover:text-blue-400" to="/profile">Profile</Link>
        <Link className="hover:text-blue-400" to="/addEmployee">Add Employee</Link>

        {/* Yahan change kiya gaya hai: */}
        <input
          type="text"
          placeholder="Search..."
          className="px-2 py-1 rounded-md text-black"
          onChange={(e) => setSearchTerm(e.target.value)} // 👈 yeh line important hai
        />
      </div>
    </div>
  );
};

export default Navbar;
