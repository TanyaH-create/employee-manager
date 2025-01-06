//create a queries objects that has get statements to
//retrieve data wanted by the view programs in cli
const queries = {
    //show department names and ids
    getAllDepartments: `SELECT * FROM department;`,
    
    getAllRoles: `
    SELECT role.title, role.id, department.name AS department, role.salary
    FROM role JOIN department ON role.department_id = department.id`,

    getAllEmployees: `SELECT employee.id, employee.first_name, employee.lastname, role.title
    department.name AS department, roles.salary, CONCAT(manager.first_name,' ',manager.last_name) AS manager
    FROM employee
    JOIN role ON employee.id = role.id
    JOIN depatment ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`,     
    //manager is a copy of employee - searches for the manager_id in the copy of employee

    addDepartment: `INSERT INTO department (name) VALUES ($1);`,

    addRole: `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3);`,

    addEmployee: `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`,

    updateEmployee: `UPDATE employee SET role_id = $1 WHERE id = $2;`

};

//export the queries
module.exports = queries;