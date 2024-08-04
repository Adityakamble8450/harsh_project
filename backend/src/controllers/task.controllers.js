import { TaskModel } from "../models/task.models.js";

export const createTaskController = async (req, res) => {
    try {
        const { title, description, status, priority, deadline } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        if (!description) {
            return res.status(400).json({ message: "Description is required" });
        }
        if (!priority) {
            return res.status(400).json({ message: "Priority is required" });
        }
        if (!deadline) {
            return res.status(400).json({ message: "Deadline is required" });
        }

        const task =  new TaskModel({
            title,
            description,
            status,
            priority,
            deadline,
            userId: req.user._id,
        });
        await task.save();

        return res.status(200).json({
            success: true,
            message: "Task Created Successfully",
            task: {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                deadline: task.deadline,
                userId: req.user._id,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};
export const getTask = async (req, res) => {
    try {
        // Check if the user is authenticated and the user object exists
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access",
            });
        }

        // Fetch tasks for the authenticated user
        const tasks = await TaskModel.find({ userId: req.user._id });

        // Return the tasks in the response
        return res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            tasks,
        });
    } catch (error) {
        console.error("Error fetching tasks:", error.message);

        // Return a server error response
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

export const deleteTaskController = async (req,res)=>{
    try {
          const deletetask = await TaskModel.findByIdAndDelete(req.params.id)
          res.status(200).send({
            success: true,
            message: "Task Deleted Successfully",
            deletetask
          })
    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            message: error.message,
        })
    }
}
export const updateTaskController = async (req,res)=>{
    try {
        const { title, description, status, priority, deadline } = req.body;
        if(!title){ return res.status(400).send({success: false, message: "title is required"})}
        if(!description){ return res.status(400).send({success: false, message: "description is required"})}
        if(!status){ return res.status(400).send({success: false, message: "status is required"})}
        if(!priority){ return res.status(400).send({success: false, message: "priority is required"})}
        if(!deadline){ return res.status(400).send({success: false, message: "deadline is required"})}

        const updateded  = {title,description,status,priority,deadline}

        const taskupdate  = await TaskModel.findByIdAndUpdate(req.params.id,updateded, {new:true})
        if(!taskupdate){
            return res.status(404).send({success: false, message: "Task Not found", error: error.message})
        }

        return res.status(200).send({
            success: true,
            message: "Task Updated Successfully",
            taskupdate
        })
    } catch (error) {
        console.log(error);
        res.status(402).send({
            success: false,
            message: error.message,
        })
    }
}

