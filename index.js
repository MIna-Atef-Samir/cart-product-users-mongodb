import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { router as productRouter } from './routes/products.js';
import { router as purchasedRouter } from './routes/purchased.js';
import { router as userRouter } from './routes/users.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_CONNECTION, {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Done!");
});

app.use("/user/", userRouter);
app.use("/product/", productRouter);
app.use("/user/pur/", purchasedRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Your Server is running on http://localhost:${port}/`);
});
