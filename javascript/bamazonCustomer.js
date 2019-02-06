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

connection.connect(function (err) {
    if (err) {
        throw err;
    };
    console.log("connected as id" + connection.threadId)
});

function purchaseProduct() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log('Item ID:' + res[i].item_id + ' Product Name: ' + res[i].product_name + ' Price: ' + '$' + res[i].price)
        };
        inquirer
            .prompt([
                {
                    name: "itemId",
                    type: "input",
                    message: "What product id would like to purchase?"
                },
                {
                    name: "Quantity",
                    type: "input",
                    message: "How many units of this product would you like? ",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function (answer) {
                // console.log(answer);
                var chosenId = answer.itemId - 1;
                var chosenQuantity = answer.Quantity;
                if (chosenQuantity < res[chosenId].stock_quantity) {
                    console.log("Your total for " + "(" + answer.Quantity + ")" + " - " + res[chosenId].product_name + " is: $" + res[chosenId].price * chosenQuantity);
                    connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: res[chosenId].stock_quantity - chosenQuantity
                    }, {
                        item_id: res[chosenId].item_id
                    }], function (err, res) {
                        purchaseProduct();
                    });

                } else {
                    console.log("Sorry, insufficient stock at this time. All we have is " + res[chosenId].stock_quantity + " in stock.");
                    purchaseProduct();
                }
            })})};

            purchaseProduct();