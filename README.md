# cart-product-users-mongodb

## To add a new product use POST method => http//:localhost:8080/product
## To get all the products use GET method => http//:localhost:8080/product
## To get single product use GET method => http//:localhost:8080/product/:productId
## To Update the product use PATCH method => http//:localhost:8080/product/:productId
## To Delete the product use DELETE method => http//:localhost:8080/product/:productId
# Product Schema : 
{
  "title" : "String",
  "image" : "String",
  "price" : Number,
  "rating" : Number
}
### THE SAME WITH THE USER USE => http//:localhost:8080/user
# User Schema :
{
  "userName" : "String",
  "email" : "String",
  "password" "String"
}
__________________________________________________________________

### To add to cart use POST method => http//:localhost:8080/user/pur/:UID/product/:PID
### To remove from the cart use DELETE method => http//:localhost:8080/user/pur/:UID/product/:PID
### To get specific product from the cart use GET method => http//:localhost:8080/user/pur/:UID/product/:PID
### To get all the products in a specific cart for specific user use GET method => http//:localhost:8080/user/pur/:UID/product

