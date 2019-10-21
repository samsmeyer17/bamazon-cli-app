var inquirer = require("inquirer");
var confirm = require('inquirer-confirm')
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "mey24875",
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  showproducts();
});

function showproducts() {

  connection.query("select * from products", function (error, res) {

    //console.log(res)
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id, res[i].product, res[i].price)
    }
    asking()
  })
}

function asking() {

  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "Which product do you want?"
      },
      {
        type: "input",
        name: "quantity",
        message: "how many do you want?"
      }
    ])
    .then(function (answers) {
      console.log(answers)
      const { id, quantity } = answers;
      connection.query("SELECT * FROM products WHERE item_id =" + id, function (error, res) {
        console.log(res)
        if (res[0].stock_quantity > parseInt(quantity)) {
          console.log("product on your way, total price ", res[0].price * parseInt(quantity));
          let newStock = res[0].stock_quantity - parseInt(quantity);
          console.log(newStock)
          connection.query("UPDATE products SET ? WHERE ?", [{
            stock_quantity: newStock
          },
          {
            item_id: id
          }
          ], function (error, res) {
            //console.log("response from update:", error, res)
            // ask if the user want more
            // if ues call showproduct if not 
            quitormore()
            //showproducts() 
          })
          // update db
          // tell user total price
        }else{
          console.log("Insufficient Quantity! Pick a new One");
          close()
          return;

        }
        // verify the stock 
        // if if enough then sell it
        // then update the db


      })


      function quitormore() {
        inquirer.prompt([
          {
            type: "confirm",
            message: "would you like to buy more?",
            name: "confirm",
            default: true
          }
        ]).then(function(response) {
          console.log(response);
          if (response.confirm) {
            asking()
            
          }else{
            close()
          }
        })};
        //inquerer
        // showproducts or close
      function close() {
        console.log("see you soon")
        connection.end()
        process.exit
      }
    })};