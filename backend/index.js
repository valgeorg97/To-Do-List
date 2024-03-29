import express from "express";

const app = express();

//middleware for parsing data

app.use(express.json());

app.get("/", (req, res) =>{
    console.log(req);
    return res.status(200).send("test");
});


