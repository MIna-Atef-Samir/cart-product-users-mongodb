import express from "express";
import {Product} from "../schemas/productSchema.js";
import {User} from "../schemas/userSchema.js"

export const router = express.Router();

router.get("/:UID/product/:PID", async (req, res) => {
    const uid = req.params.UID;
    const pid = req.params.PID;
    
    try {
        const product = await Product.findOne({_id: pid });
        const user = await User.findOne({_id: uid});
        
        if (!user) {
            return res.status(404).send("User not found");
        }
        
        let corr = []
        const purchasedProduct = user.purchasedProducts.find(
            (product) => JSON.stringify(product._id) === JSON.stringify(pid)
          );
  
      if (!purchasedProduct) {
        return res.status(404).send("Product not found");
      }
  
      res.send(purchasedProduct);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  router.post("/:UID/product/:PID", async (req, res) => {
    const uid = req.params.UID;
    const pid = req.params.PID;
  
    try {
      const user = await User.findOne({ _id: uid });
      const product = await Product.findOne({ _id: pid });
  
      if (!user) {
        return res.status(404).send("User not found");
      }
      if (!product) {
        return res.status(404).send("product not found");
      }
  
      if (user.purchasedProducts.find(p => p._id == pid)) {
        return res.status(300).send("Product already in cart!");
      }
  
      user.purchasedProducts.push(product);
      await user.save();
  
      res.send(user.purchasedProducts);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  router.get("/:UID/product", async (req, res) => {
    try {
      const productspur = await User.find({_id : req.params.UID});
      console.log("send");
      res.send(productspur.find(p => p.purchasedProducts));
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  router.delete("/:UID/product/:PID", async (req, res) => {
    const uid = req.params.UID;
    const pid = req.params.PID;
  
    try {
      const user = await User.findOne({ _id: uid });
      const product = await Product.findOne({ _id: pid });
  
      if (!user) {
        return res.status(404).send("User not found");
      }
      if (!product) {
        return res.status(404).send("Product not found");
      }

      const index = user.purchasedProducts.findIndex(
        (product) => JSON.stringify(product._id) === JSON.stringify(pid)
      );

    console.log(index);
      if(index > -1 ){
        console.log(index);
          user.purchasedProducts.splice(index,1)
          await user.save();
          res.send(user.purchasedProducts);
      }else{
        
          res.status(404).end("Product not found")
      }

  
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  });
