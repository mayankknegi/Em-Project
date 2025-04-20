import axios from 'axios';


const EMPLOYEE_API_BASE_URL = 'http://localhost:4040/employees';

class EmployeeService {
  static saveEmployee(employee) {
    return axios.post(EMPLOYEE_API_BASE_URL, employee);
  }

  static getEmployees() {
    return axios.get(EMPLOYEE_API_BASE_URL);
  }

  static getEmployeeById(id) {
    return axios.get(EMPLOYEE_API_BASE_URL + '/' + id);
  }

  static deleteEmployeeById(id) {
    return axios.delete(EMPLOYEE_API_BASE_URL + '/' + id);
  }

  static updateEmployee(employee, id) {
    return axios.put(EMPLOYEE_API_BASE_URL + '/' + id, employee);
  }
}

export default EmployeeService;
