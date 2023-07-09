import express from "express";
import { User } from "../schemas/userSchema.js";


export const router = express.Router();

router.get("/:UID", async(req, res) => {
    const id = req.params.UID;
    const data = await User.findOne({_id: id});
    if(!data){
        return res.status(404).send("not found")
    }
    res.send(data);
});

router.post("/", async (req, res) => {
    try {
    const body = req.body;
    const data = await User.create(body)
        console.log(data);
        res.send(data);
    } catch (error) {
        res.send(error.message);
        console.log(error);
    }
});
router.get("/", async (req,res)=>{
    const data = await User.find();
    res.send(data);
})
router.delete("/:UID", async (req, res)=>{
    const data = await User.deleteOne({_id: req.params.UID});
    if(!data){
        return res.status(404).send("not found")
    }
    res.send(data);
})
router.patch("/:UID", async (req, res)=>{
    const body = req.body;
    const data = await User.updateOne({_id: req.params.UID}, {$set : {userName : body.userName , email : body.email, password : body.password}})
    if(!data){
        return res.status(404).send("not found")
    }
    res.send(data);
})
