import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import tasksRoute from "./routes/tasksRoute.js"

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    console.log(req);
    return res.status(200).send("test");
});

app.use("/tasks", tasksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to MongoDB")
        app.listen(PORT, () => {
            console.log(`Port: ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err);
    });

