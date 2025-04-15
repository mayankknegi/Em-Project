package org.codingwallah.em_project;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class EmployeeServiceImp1 implements EmployeeService{

    @Autowired
     private EmployeeRepository employeeRepository;



    @Override
    public String createEmployee(Employee employee) {
        EmployeeEntity employeeEntity = new EmployeeEntity();
        BeanUtils.copyProperties(employee, employeeEntity);

        employeeRepository.save(employeeEntity);
       // employees.add(employee);
        return "Saved Successfully";
    }

    @Override
    public Employee readEmployee(Long id) {
        EmployeeEntity emp = employeeRepository.findById(id).get();

        Employee employee = new Employee();
        BeanUtils.copyProperties(emp, employee);

        return employee;
    }

    @Override
    public List<Employee> readEmployees() {
        List<EmployeeEntity> employeeList = employeeRepository.findAll();
        List<Employee> employees = new ArrayList<>();
        
        for (EmployeeEntity employeeEntity: employeeList) {
           Employee emp = new Employee();
           emp.setId(employeeEntity.getId());
           emp.setName(employeeEntity.getName());
           emp.setEmail(employeeEntity.getEmail());
           emp.setPhone(employeeEntity.getPhone());
           
           employees.add(emp);
        }
        return employees;
        }

        @Override
        public boolean deleteEmployee(Long id) {
            if (employeeRepository.existsById(id)) { // Check if the employee exists
                employeeRepository.deleteById(id);  // Delete from the database
                return true; // Return true for successful deletion
            }
            return false; // Return false if the employee is not found
        }
        

    @DeleteMapping("/employees/{id}")
public ResponseEntity<String> deleteEmployeeById(@PathVariable Long id) {
    if (deleteEmployee(id)) {
        return ResponseEntity.ok("Employee deleted successfully");
    }
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
}


    @Override
    public String updateEmployee(Long id, Employee employee) {
        EmployeeEntity exestingEmployee = employeeRepository.findById(id).get();
      
        exestingEmployee.setEmail(employee.getEmail());
        exestingEmployee.setName(employee.getName());
        exestingEmployee.setPhone(employee.getPhone());
        
        employeeRepository.save(exestingEmployee);
      
        return "Update Successfully";
    }

   
     
}
