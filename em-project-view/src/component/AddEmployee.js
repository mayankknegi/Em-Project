import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../Service/EmployeeService';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({ ...employee, [e.target.name]: value });
  };

  const saveEmployee = (e) => {
    e.preventDefault();
    EmployeeService.saveEmployee(employee)
      .then((response) => {
        console.log('saved ', response);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setEmployee({
      id: '',
      name: '',
      phone: '',
      email: '',
    });
  };

  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="w-full max-w-lg mx-auto bg-slate-800 rounded-xl shadow-lg p-8">
        <div className="text-3xl font-semibold text-center text-white mb-6">
          Add 🧑🏼‍💻 New Employee
        </div>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded text-black"
            placeholder="Name"
          />
          <input
            type="number"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded text-black"
            placeholder="Phone"
          />
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded text-black"
            placeholder="Email"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={saveEmployee}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={reset}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Clear
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
