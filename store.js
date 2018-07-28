
//packages
var mysql = require("mysql");
var inquirer = require("inquirer");

//connection to my sql variable
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "my_store"
  });

   connection.connect(function(err) {
   if (err) throw err;
   console.log("connected as id " + connection.threadId + "\n");
  });

  

  connection.query('SELECT * FROM Products', function(err, res){
	// Error Handler
	if(err) throw err;
	// Show User message
	console.log('my music store...\n');
  console.log('  ID  |      Product Name      |  Department Name  |   Price  | In Stock');
  console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')
  // Loop through database and show all items
  for(var i = 0; i < res.length; i++){
    
    var itemID = res[i].item_id + ''; 

    var productName = res[i].product_name + ''; 

    var departmentName = res[i].department_name + ''; 

    var price = '$' + res[i].price + ''; 

    var quantity = res[i].Stock_quantity + ''; 
  
	console.log(itemID + '|' + productName + '|' + departmentName + '|' + price + '|    ' + quantity);
  };

  inquirer
	.prompt([
		{
	   name: "what",
	   type: "input",
		message: "enter the id of the item you wish to purchase",
		},
		{
		name:"howmany",
		type: "input",	
		message: "now, how many of this item do you wish to purchase?"
		}
	])
	.then(function(answer) {

		var id = answer.what;
			console.log("you chose " + id);
		var quantity = answer.howmany;
			console.log("and you want " +  quantity + " of this");

			connection.query("SELECT * FROM products WHERE ?", [{ item_id : answer.what }], function(err, res) {
				if (err) throw err;
				//console.log(res);

				var totalprice = res[0].price;

				var current_quantity = res[0].Stock_quantity;
				console.log("Current quantity in stock: " , current_quantity);

				var remaining_quantity = current_quantity - answer.howmany;
				console.log("Now the Remaining quantity in stock is: " , remaining_quantity);

				if(current_quantity >= answer.howmany) {

					
					console.log("Total Cost: " + (answer.howmany * totalprice) + "\n");
					console.log("thankyou for shopping!");
				}

				else{
					console.log("we are sorry, we only have " + current_quantity + " of these products available")
				}

				connection.query("UPDATE products SET ? WHERE ?",
			 [{
				stock_quantity: remaining_quantity
			}, 
			{
				item_id: answer.what
			}], 
			function(err, res) {
				console.log(res)
			});
			
			connection.end();
	});

			});

			

	//connection.end();
		
});
	




 



