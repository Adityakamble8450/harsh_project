import { Router } from "express";
import { loginController, registerController } from "../controllers/auth.controllers.js";
import { requireSign } from "../middlewares/auth.middlewares.js";
import { createTaskController, deleteTaskController, getTask, updateTaskController } from "../controllers/task.controllers.js";
import { getEnumValues } from "../helper/utility.helper.js";
import { TaskModel } from "../models/task.models.js";

const router = Router();

router.route('/register').post(registerController)
router.route('/login').post(loginController)
router.route('/create-task').post(requireSign, createTaskController)
router.route('/get-task').get(requireSign , getTask)
router.route('/status-options').get((req,res)=>{
    const statusoption = getEnumValues(TaskModel.schema, 'status');
    res.status(200).send({
        success: true,
        statusoption
    })
})
router.route('/priority-options').get((req,res)=>{
    const priorityoption = ["Medium", 'Low',"Urgent"]
    res.json({success: true, priorityoption})
})
router.route('/delete-task/:id').delete(requireSign, deleteTaskController)
router.route('/update-task/:id').put(requireSign, updateTaskController)

export default router;