const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const authMiddleware = require("../middleware/auth.middleware")

//post /api/task/create
router.post("/create",authMiddleware.authMiddleware,taskController.taskCreateController);
router.get("",authMiddleware.authMiddleware,taskController.getAllTask);
router.get("/:id",authMiddleware.authMiddleware,taskController.GetSingleTask);
router.patch("/:id",authMiddleware.authMiddleware,taskController.updateTask);
router.delete("/:id",authMiddleware.authMiddleware,taskController.deleteTask);
router.patch( "/:taskId/subtask/:subTaskId", authMiddleware.authMiddleware, taskController.updateSubTaskStatus);



module.exports = router;