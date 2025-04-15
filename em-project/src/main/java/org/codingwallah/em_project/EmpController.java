package org.codingwallah.em_project;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin(origins = "http://localhost:3000")
 @RestController
public class EmpController {
    
    //EmployeeService employeeService = new EmployeeServiceImp1();
    //Dependency Injection
    @Autowired
    EmployeeService employeeService;

    
    @GetMapping("employees")
    public List<Employee> getAllEmployees() { 
        return employeeService.readEmployees();
    }


    @GetMapping("employees/ {id}")
    public Employee getAllEmployeesById(@PathVariable Long id) { 
        System.out.println("Yes mai aa rha hu");
        return employeeService.readEmployee(id);
    }

    @PostMapping("employees")
    public String createEmployee(@RequestBody Employee employee) {
        //employees.add(employee);
        return employeeService.createEmployee(employee);
        
    }

    @DeleteMapping("/employees/{id}")
    public String deleteEmployee(@PathVariable Long id){
        if(employeeService.deleteEmployee(id))
            return "Delete Succesfully";
        return "Not found";
    }

    @PutMapping("employees/{id}")
    public String putMethodName(@PathVariable Long id, @RequestBody Employee employee) {
        
        return employeeService.updateEmployee(id, employee);
    }
        
}
 