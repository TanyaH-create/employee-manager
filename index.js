import inquirer from "inquirer";
import {pool} from './connection.js';
import queries from './queries.js';


// create main menu function - anonymous, will run right away
async function mainMenu() {
    //execute main menue
    const {action} = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'Exit',
            ]
        }

    ]);
    // execute secondary menu based on action choice  
    switch (action) {
        case 'View All Departments':
            await viewAllDepartments();
            break;
        case 'View All Roles':
            await viewAllRoles();
            break;
        case 'View All Employees':
            await viewAllEmployees();
            break;
        case 'Add Department':
            await addDepartment();
            break;
        case 'Add Role':
            await addRole();
            break;
        case 'Add Employee':
            await addEmployee();
            break;
        case 'Update Employee Role':
            await updateEmployeeRole();
            break;
        default:
            console.log('Exiting Menu')
            //close the connection pool
            pool.end()
            process.exit();
    }
    //go back to main menu
    await mainMenu();
}

//case statement functions
//call query using the get statement set up in queries and
//copy ingto response variable then output to the console
async function viewAllDepartments() {
   const res = await pool.query(queries.getAllDepartments);
   //write row array of results to console in table form
   console.table(res.rows);
}

async function viewAllRoles() {
    const res = await pool.query(queries.getAllRoles);
    console.table(res.rows);
}

async function viewAllEmployees() {
    const res = await pool.query(queries.getAllEmployees);
    console.table(res.rows);
}
async function addDepartment() {
    const {name} = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the new department:',
        },
    ]);
    //add data from prompt in the placeholder
    await pool.query(queries.addDepartment,[name]);
    console.log(`Added ${name} to departments.`)
}

async function addRole() {
    const {title, salary, departmentId} = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the new role title:'
        },
        {
            type: 'input',
            name: 'salary',
            message: "Enter the new role's salary",
        },
        {
            type: 'input',
            name: 'departmentId',
            message: "Enter the new role's department ID",
        },    
    ]);
    await pool.query(queries.addRole, [title, salary, departmentId]);
    console.log(`Added ${title} role`);
}
async function addEmployee() {
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        { 
            type: 'input', 
            name: 'firstName', 
            message: "Enter the employee's first name:" 
        },
        { 
            type: 'input', 
            name: 'lastName', 
            message: "Enter the employee's last name:" 
        },
        { 
            type: 'input', 
            name: 'roleId', 
            message: "Enter the employee's role ID:" },
        { 
            type: 'input', 
            name: 'managerId', 
            message: "Enter the manager's ID (if any):" },
      ]);
      await pool.query(queries.addEmployee, [firstName, lastName, roleId, managerId || null]);
      console.log(`Added ${firstName} ${lastName}.`);
}
async function updateEmployeeRole() {
    const { employeeId, roleId } = await inquirer.prompt([
      { 
        type: 'input', 
        name: 'employeeId',
         message: "Enter the employee's ID:" 
      },
      { 
        type: 'input', 
        name: 'roleId', 
        message: "Enter the new role ID:" 
      },
    ]);
    await pool.query(queries.updateEmployee, [roleId, employeeId]);
    console.log('Updated employee role.');
  }

  //run main menu function
  mainMenu();