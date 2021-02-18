const inquirer = require('inquirer');
const mysql = require('mysql');

const connectionConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    passwoord: "12345",
    database: "employees_db"
};

const connection = mysql.createConnection(connectionConfig);

inquirer
    .prompt([
        {
            type: "list",
            name: "initialChoice",
            choices: [
                "Add Employee",
                "Add Department",
                "Add Role",
                "View Employees",
                "View Departments",
                "View Roles",
                "Update Employee Roles"
            ],
        }
    ]).then((response) => {
        console.log(`You selected to ${response.initialChoice}`);

        if(response.initialChoice === "Add Employee") {
            console.log(1);

        }
        else if(response.initialChoice === "Add Department") {
            console.log(2);

        }
        else if(response.initialChoice === "Add Role") {
            console.log(3);

        }
        else if(response.initialChoice === "View Employees") {
            console.log(4);

        }
        else if(response.initialChoice === "View Departments") {
            console.log(5);

        }
        else if(response.initialChoice === "View Roles") {
            console.log(6);

        }
        else if(response.initialChoice === "Update Employee Roles") {
            console.log(7);

        }

    });