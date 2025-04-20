import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../Service/EmployeeService';

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await EmployeeService.getEmployees();
        console.log("Employee data:", response.data);
        setEmployees(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const deleteEmployee = (e, id) => {
    e.preventDefault();
    EmployeeService.deleteEmployeeById(id)
      .then(() => {
        if (employees) {
          setEmployees((prevElement) => {
            return prevElement.filter((employee) => employee.id !== id);
          });
        }
      });
  };

  const editEmployee = (e, id) => {
    e.preventDefault();
    navigate(`/editEmployee/${id}`);
  };

  return (
    <div className="container mx-auto my-8 px-4">
      {/* ➕ Add Employee Button */}
      <div>
        <button
          onClick={() => navigate("/addEmployee")}
          className="bg-slate-600 hover:bg-blue-700 my-12 font-semibold px-20 py-2 rounded text-white"
        >
          Add Employee 👨🏼‍💻
        </button>
      </div>

      {/* 👨‍💼 Employee Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-slate-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left uppercase tracking-wide">Name</th>
              <th className="px-6 py-3 text-left uppercase tracking-wide">Phone</th>
              <th className="px-6 py-3 text-left uppercase tracking-wide">Email</th>
              <th className="px-6 py-3 text-left uppercase tracking-wide">Action</th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-slate-100 text-black">
                  <td className="px-6 py-4">{employee.name}</td>
                  <td className="px-6 py-4">{employee.phone}</td>
                  <td className="px-6 py-4">{employee.email}</td>
                  <td className="px-6 py-4 flex gap-4">
                    <button
                      onClick={(e) => editEmployee(e, employee.id)}
                      className="text-green-600 text-sm font-semibold hover:text-green-800"
                    >
                      Edit 📝
                    </button>
                    <button
                      onClick={(e) => deleteEmployee(e, employee.id)}
                      className="text-red-600 text-sm font-semibold hover:text-red-800"
                    >
                      Delete 🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;

