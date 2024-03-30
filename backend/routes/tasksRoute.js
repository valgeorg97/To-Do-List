import express from "express";
import { Task } from "../models/taskModel.js";

const router = express.Router();

//route to create a new task 
router.post("/", async (req, res) => {
    try {
        if (!req.body.title || !req.body.description || !req.body.status) {
            return res.status(400).send({
                message: "Send all required fields: title, description, status"
            }
            )
        }
        const newTask = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        }
        const task = await Task.create(newTask);
        return res.status(201).send(task);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

//route to get all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find({});
        return res.status(200).json({
            count: tasks.length,
            data: tasks
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }

});

//route to get one task
router.get("/:id", async (req, res) => {
    try {

        const { id } = req.params;

        const task = await Task.findById(id);

        return res.status(200).json(task);

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

//route to edit task
router.put("/:id", async (req, res) => {
    try {
        if (!req.body.title || !req.body.description || !req.body.status) {
            return res.status(400).send({
                message: "Send all required fields: title, description, status"
            }
            )
        }
        const { id } = req.params;
        const result = await Task.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(404).json({message: "Task not found"})
        }
    return res.status(200).send({message: "Task updated successfully!"});

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

//route to delete task
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = Task.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message: "Task not found"})
        }
        return res.status(200).send({message: "Task deleted successfully!"});

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

export default router;