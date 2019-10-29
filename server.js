
// Dependencies
var start = require("./start")
var express = require("express");
var mysql = require("mysql");
var inquirer = require("inquirer");
// Create express app instance.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// MySQL DB Connection Information (remember to change this with our specific credentials)
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employee_db"
});

// Initiate MySQL Connection.
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);

  start();
  //setTimeout(function(){ again()}, 7000);

});
  function again() {
  
  inquirer.prompt([
    {
      type: "list",
      message: "Would you like to see the options again?",
      name: "decision",
      choices: ["yes", "no"]
    }
  ]).then(function(response){
    if(response.decision === "yes") {
      start();
      //setTimeout(function(){ again(); }, 15000);
    } else {
      console.log("program terminated...")
    }

  })
}




///////////////////////////////////
////////////INQUIRER///////////////
function getEmployeeData() {
  inquirer
    .prompt([
      {
        name: "departmentName",
        type: "input",
        message: "What is the department name?"
      }/*,
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
    }*/
    ]).then(function (response) {
      console.log(response.departmentName);
      var query = "INSERT INTO `department` (department_name) VALUES (" + response.departmentName + ")"
      //connection.query(query);

      addMore();
    });
}



// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});

function addMore() {
  inquirer.prompt([
    {
      name: "decision",
      type: "checklist",
      message: "Would you like to add more?",
      choices: ["yes", "no"]
    }
  ]).then(function (response) {
    if (response.decision === "yes") {
      getEmployeeData();
    }
  });
}

function viewTables() {
  connection.connect(function (err) {
    console.log("connected as id " + connection.threadId);
    connection.query("SELECT * FROM (roles, department, employee)", function (err, res) {
      if (err) throw err;
      console.table(res);
    });
  });

}
/*
// Routes
app.get("/", function (req, res) {

  // If the main route is hit, then we initiate a SQL query to grab all records.
  // All of the resulting records are stored in the variable "result."
  connection.query("SELECT * FROM (department, roles, employee)", function (err, result) {
    if (err) throw err;
    // We then begin building out HTML elements for the page.
    var html = "<h1> Employee Tracker </h1>";

    // Here we begin an unordered list.
    html += "<ul>";

    // We then use the retrieved records from the database to populate our HTML file.
    for (var i = 0; i < result.length; i++) {
      html += "<li><p> ID: " + result[i].id + "</p>";
      html += "<p>Name: " + result[i].first_name + " " + result[i].last_name + "</p></li>";
      html += "<p>Department: " + result[i].department_name + " </p></li>";
      html += "<p>Department ID: " + result[i].department_id + " </p></li>";
      html += "<p>Title: " + result[i].title + " </p></li>";
      html += "<p>Salary: " + result[i].salary + " </p></li>";
      html += "<p>Role ID: " + result[i].role_id + " </p></li>";
      html += "<p>Manager ID: " + result[i].manager_id + " </p></li>";
    }
    // We close our unordered list.
    html += "</ul>";
    // Finally we send the user the HTML file we dynamically created.
    res.send(html);
  });
});
*/