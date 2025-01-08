//create a queries object with key:value pairs for the SQL statements
//needed in the queries
const queries = {
    //retrieve department names and ids
    getAllDepartments: `SELECT * FROM department;`,
    
    //retrieve role data
    getAllRoles: `
    SELECT role.id, role.title, department.name AS department, role.salary
    FROM role JOIN department ON role.department_id = department.id`,

    //retrieve employee data
    
    getAllEmployees: `SELECT employee.id, employee.first_name, employee.last_name, role.title,
    department.name AS department, role.salary, CONCAT(manager.first_name,' ',manager.last_name) AS manager
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`,     
    //To get the manager who is also an empoyee:
    //Create an alias manager that is a copy of employee
    //searches each row of Manager for the manager_id and matches it to the 
    //employee_manager_id

    //insert new rows into tables
    addDepartment: `INSERT INTO department (name) VALUES ($1);`,

    addRole: `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3);`,

    addEmployee: `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`,

    //update the role of ann employee
    updateEmployee: `UPDATE employee SET role_id = $1 WHERE id = $2;`,
    
    //Join employee to role to department then group by department and get
    //sum of salary in each department
    getTotalDeptSalary: 
    `SELECT department.name AS department_name, SUM(role.salary) AS total_salary 
    FROM employee 
    JOIN role ON employee.role_id = role.id 
    JOIN department ON role.department_id = department.id 
    GROUP BY department.id`
 
};

//export the queries
export default queries;