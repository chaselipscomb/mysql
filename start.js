const inquirer = require("inquirer");
const view = require("./functions");

function start() {
    inquirer
        .prompt([
            {
                name: "todo",
                type: "list",
                message: "Would you like to do?",
                choices: ["View Tables", "View all Employees", "View all Employees by Department", "View all Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role"]
            }
        ]).then(function (response) {
            switch (response.todo) {
                case "View Tables":
                    view.viewTables();
                    setTimeout(function(){ start()}, 5000);
                    break;
                case "View all Employees":
                    view.viewEmployees();
                    setTimeout(function(){ start()}, 5000);
                    break;
                case "View all Employees by Department":
                    view.viewEmpByDep()
                    setTimeout(function(){ start()}, 8000);
                    break;
                case "View all Employees by Manager":
                    view.viewEmpByMan();
                    setTimeout(function(){ start()}, 8000);
                    break;
                case "Add Employee":
                    view.getEmployeeData();
                    setTimeout(function(){ start()}, 10000);
                    break;
                case "Remove Employee":
                    view.removeEmployee();
                    setTimeout(function(){ start()}, 15000);
                    break;
                case "Update Employee Role":
                    view.updateEmployee();
                    setTimeout(function(){ start()}, 20000);
                    break;
                case "Update Employee Manager":
                    // code block
                    setTimeout(function(){ start()}, 3000);
                    break;
                default:
                console.log("Something isn't right... restart")
            }
        
             
        });
       
        
}
module.exports = start
