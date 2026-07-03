const taskModel = require("../models/task.model");

async function taskCreateController(req, res) {
  try {
    const { title, description, priority, status, dueDate, subTask } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const task = await taskModel.create({
      title,
      description,
      priority,
      status,
      dueDate,
      subTask,
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
      user: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
async function getAllTask(req, res) {
  try {
    const {
      search,
      priority,
      status,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    // Base Query
    const query = {
      user: req.user._id,
    };

    // Search by Title
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by Priority
    if (priority) {
      query.priority = priority;
    }

    // Filter by Status
    if (status) {
      query.status = status;
    }

    // Sorting
    let sortOption = {};

    switch (sort) {
      case "latest":
        sortOption = { createdAt: -1 };
        break;

      case "oldest":
        sortOption = { createdAt: 1 };
        break;

      case "high":
        sortOption = { priority: -1 };
        break;

      case "low":
        sortOption = { priority: 1 };
        break;

      case "dueDate":
        sortOption = { dueDate: 1 };
        break;

      default:
        sortOption = { createdAt: -1 };
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    const tasks = await taskModel
      .find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const totalTasks = await taskModel.countDocuments(query);

    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",

      totalTasks,
      currentPage: Number(page),
      totalPages: Math.ceil(totalTasks / Number(limit)),

      tasks,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
async function GetSingleTask(req, res) {
  try {
    const task = await taskModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    res.status(200).json({
      message: "task fetched successfully",
      task,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
async function updateTask(req, res) {
  try {
    const { id } = req.params;

    const { title, description, priority, status, dueDate, subTask } = req.body;

    const updatedTask = await taskModel.findOneAndUpdate(
      {
        _id: id,
        user: req.user._id,
      },
      {
        title,
        description,
        priority,
        status,
        dueDate,
        subTask,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
async function deleteTask(req, res) {
  try {
    const { id } = req.params;

    const deletedTask = await taskModel.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
async function updateSubTaskStatus(req, res) {
  try {
    const { taskId, subTaskId } = req.params;
    const { title } = req.body;
    const { isCompleted } = req.body;

    const task = await taskModel.findOne({
      _id: taskId,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const subTask = task.subTask.id(subTaskId);

    if (!subTask) {
      return res.status(404).json({
        success: false,
        message: "SubTask not found",
      });
    }

    subTask.isCompleted = isCompleted;
    subTask.title = title;

    await task.save();

    return res.status(200).json({
      success: true,
      message: "SubTask updated successfully",
      task,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
module.exports = {
  taskCreateController,
  getAllTask,
  GetSingleTask,
  updateTask,
  deleteTask,
  updateSubTaskStatus,
};
