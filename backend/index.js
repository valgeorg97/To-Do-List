import express from "express";
import { PORT } from "./config.js";

const app = express();

app.get("/", (req, res) =>{
    console.log(req);
    return res.status(200).send("test");
});

app.listen(PORT, () =>{
    console.log(`Port: ${PORT}`)
})