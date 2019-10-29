const mysql = require("mysql");
const inquirer = require("inquirer")
var start = require("./start")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employee_db"
});

function viewTables() {
    connection.connect(function (err) {
        console.log("connected as id " + connection.threadId);
        connection.query("SELECT * FROM (roles)", function (err, res) {
            if (err) throw err;
            console.table(res);
        });
        connection.query("SELECT * FROM (department)", function (err, res) {
            if (err) throw err;
            console.table(res);
        });
        connection.query("SELECT * FROM (employee)", function (err, res) {
            if (err) throw err;
            console.table(res);
        });
    });
   // setTimeout(function(){ start()}, 3000);    
}
function viewEmployees() {
    connection.connect(function (err) {
        console.log("connected as id " + connection.threadId);
        connection.query("SELECT * FROM employee", function (err, res) {
            if (err) throw err;
            console.log("Employees: ")
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].first_name + " " + res[i].last_name);
            }
        });
    });
}

function viewEmpByDep() {
    inquirer.prompt([
        {
            name: "department",
            type: "list",
            message: "Enter department by exact name.",
            choices: ["Marketing", "Sales", "Communications"]
        }
    ]).then(function (response) {
        connection.connect(function (err) {
            console.log("connected as id " + connection.threadId);
            //        connection.query(`SELECT id, department_name FROM department INNER JOIN department ON employee.first_name = employee_firstname;`, function (err, res) {
            connection.query(`
            SELECT employee.first_name,employee.last_name
                    FROM employee
                    INNER JOIN department ON employee.dep_id=department.id
                    WHERE department.department_name = '${response.department}';
            
            `, function (err, res) {
                if (err) throw err;
                console.table(res);
            });
        });
    });
}
function viewEmpByMan() {
    inquirer.prompt([
        {
            name: "manager",
            type: "input",
            message: "Enter manager by exact id."
        }
    ]).then(function (response) {
        connection.connect(function (err) {
            console.log("connected as id " + connection.threadId);
            connection.query(`
            SELECT employee.first_name,employee.last_name
                    FROM employee WHERE employee.manager_id = '${response.manager}';
            
            `, function (err, res) {
                if (err) throw err;
                console.table(res);
            });
        });
    });
}



function getEmployeeData() {
    inquirer
        .prompt([
            {
                name: "departmentName",
                type: "input",
                message: "What is the department name?"
            },
            {
                name: "roleTitle",
                type: "input",
                message: "What is the role title?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary?"
            },
            {
                name: "departmentID",
                type: "input",
                message: "What is the department ID?"
            },
            {
                name: "firstName",
                type: "input",
                message: "What is the first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the last name?"
            },
            {
                name: "roleId",
                type: "input",
                message: "What is the role ID?"
            },
            {
                name: "managerID",
                type: "input",
                message: "What is the manager ID?"
            }
        ]).then(function (response) {
            connection.query(`INSERT INTO department (department_name) VALUES ("${response.departmentName}")`, function (err, res) {
                if (err) throw err;
                //console.table();
                connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id, dep_id) VALUES ("${response.firstName}", "${response.lastName}", "${response.roleId}", "${response.managerID}",  "${response.departmentID}")`, function (err, res) {
                    if (err) throw err;
                    connection.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${response.roleTitle}", "${response.salary}", "${response.departmentID}")`, function (err, res) {
                        if (err) throw err;
                        console.log("New employee added!")
                    })
                })
            });
        })
}
function removeEmployee() {
    inquirer.prompt([
        {
            name: "employee",
            type: "input",
            message: "Enter the index of employee to remove: "
        }
    ]).then(function (response) {
        connection.connect(function (err) {
            console.log("connected as id " + connection.threadId);
            connection.query(`DELETE FROM roles WHERE id = '${response.employee}'`, function (err, res) {
                if (err) throw err;
            });
        });
        connection.connect(function (err) {
            console.log("connected as id " + connection.threadId);
            connection.query(`DELETE FROM employee WHERE id = '${response.employee}'`, function (err, res) {
                if (err) throw err;
            });
        });
        console.log("Emplyee removed from roles and employee table.")
    });
}
function updateEmployee() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Enter the id of employee to update: "
        },/*
        {
            name: "firstname",
            type: "input",
            message: "Enter the employee's first name: " 
        },
        {
            name: "lastname",
            type: "input",
            message: "Enter the employee's last name: " 
        },*/
        {
            name: "roleid",
            type: "input",
            message: "Enter the employee's new role: "
        }
    ]).then(function (response) {
        connection.connect(function (err) {
            console.log("connected as id " + connection.threadId);
            connection.query(`UPDATE roles SET title = '${response.roleid}' WHERE id = '${response.id}'`, function (err, res) {
                if (err) throw err;
            });
        });

        console.log("Employee updated.")
    });
}
function updateManager() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Enter the id of employee to update: "
        },/*
        {
            name: "firstname",
            type: "input",
            message: "Enter the employee's first name: " 
        },
        {
            name: "lastname",
            type: "input",
            message: "Enter the employee's last name: " 
        },*/
        {
            name: "roleid",
            type: "input",
            message: "Enter the employee's new role: "
        }
    ]).then(function (response) {
        connection.connect(function (err) {
            console.log("connected as id " + connection.threadId);
            connection.query(`UPDATE roles SET title = '${response.roleid}' WHERE id = '${response.id}'`, function (err, res) {
                if (err) throw err;
            });
        });

        console.log("Employee updated.")
    });
}

module.exports = { viewEmployees, viewTables, viewEmpByDep, viewEmpByMan, getEmployeeData, removeEmployee, updateEmployee }