import inquirer from "inquirer";
import {pool} from './connection.js';


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
            //process.exit();
    }
    //go back to main menu
    await mainMenu();
}

//case statement functions
async function viewAllDepartments() {
   //call query 
}