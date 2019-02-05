var consoleTable = require("console.table");
var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "William1",
    database: "bamazonDB"
}); 

connection.connect(function(err){
    if(err) {
        throw err;
    };
    console.log("connected as id" + connection.threadId)
});