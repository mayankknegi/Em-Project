import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../Service/EmployeeService';

const EmployeeList = ({ searchTerm }) => {  // 👈 Props se searchTerm liya
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await EmployeeService.getEmployees();
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
    EmployeeService.deleteEmployeeById(id).then(() => {
      setEmployees((prevElement) =>
        prevElement.filter((employee) => employee.id !== id)
      );
    });
  };

  const editEmployee = (e, id) => {
    e.preventDefault();
    navigate(`/editEmployee/${id}`);
  };

  // 👇 Filter logic for search
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto my-8">
      <div>
        <button
          onClick={() => navigate('/addEmployee')}
          className="bg-slate-600 hover:bg-blue-700 my-12 font-semibold px-20 py-2 rounded"
        >
          Add Employee 👨🏼‍💻
        </button>
      </div>

      <div>
        <table className="shadow">
          <thead className="bg-slate-600">
            <tr>
              <th className="px-6 py-3 uppercase tracking-wide">Name</th>
              <th className="px-6 py-3 uppercase tracking-wide">Phone</th>
              <th className="px-6 py-3 uppercase tracking-wide">Email</th>
              <th className="px-6 py-3 uppercase tracking-wide">Action</th>
            </tr>
          </thead>

          {loading ? (
            <tbody>
              <tr>
                <td colSpan="4" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            </tbody>
          ) : filteredEmployees.length > 0 ? ( // 👈 Filtered list yahan use ki
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-white hover:text-black">
                  <td className="text-left px-6 py-4 whitespace-nowrap">
                    {employee.name}
                  </td>
                  <td className="text-left px-6 py-4 whitespace-nowrap">
                    {employee.phone}
                  </td>
                  <td className="text-left px-6 py-4 whitespace-nowrap">
                    {employee.email}
                  </td>
                  <td className="text-left px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={(e) => editEmployee(e, employee.id)}
                      className="hover:text-green-500 hover:cursor-pointer mr-4"
                    >
                      Edit 📝
                    </button>
                    <button
                      onClick={(e) => deleteEmployee(e, employee.id)}
                      className="hover:text-red-500 hover:cursor-pointer"
                    >
                      Delete 🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No employees found.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;

