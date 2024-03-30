import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import tasksRoute from "./routes/tasksRoute.js";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-type"],
    })
)

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

