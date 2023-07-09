import express from "express";
import {Product} from "../schemas/productSchema.js";

export const router = express.Router();

router.get("/:PID", async(req, res) => {
        const id = req.params.PID;
        const product = await Product.findOne({_id : id});
        if(!product){
            return res.status(404).send("not found")
        }
        res.send(product)
});
router.post("/", async(req, res)=>{
    try{
        const body = req.body;
        const data = await Product.create(body);
        res.send(data);
    }catch(err){
        console.log(err);
        res.send(err.message);
    }
})
router.get("/", async(req, res)=>{
    const product = await Product.find();
    res.send(product);
})
router.delete("/:PID", async(req, res)=>{
    try {
        const product = await Product.deleteOne({_id :req.params.PID});
        if(!product){
            return res.status(404).send("not found")
        }
        res.send(product)
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
})
router.patch("/:PID", async(req, res)=>{
    const body = req.body;
    const product = await Product.updateOne({_id :req.params.PID}, {title : body.title, image : body.image, price: body.price, rating: body.rating});
    if(!product){
        return res.status(404).send("not found")
    }
    res.send(product)
})