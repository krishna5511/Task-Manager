const taskModel = require("../models/task.model");

async function getDashboard(req, res) {
  try {

    // Total Tasks
    const totalTasks = await taskModel.countDocuments({
      user: req.user._id,
    });

    // Completed Tasks
    const completedTasks = await taskModel.countDocuments({
      user: req.user._id,
      status: "COMPLETE",
    });

    // Pending Tasks
    const pendingTasks = await taskModel.countDocuments({
      user: req.user._id,
      status: "PENDING",
    });

    // High Priority Tasks
    const highPriorityTasks = await taskModel.countDocuments({
      user: req.user._id,
      priority: "HIGH",
    });

    // Recent 5 Tasks
    const recentTasks = await taskModel
      .find({
        user: req.user._id,
      })
      .sort({
        createdAt: -1,
      })
      .limit(5);

    return res.status(200).json({
      success: true,
      message: "Dashboard fetched successfully",

      stats: {
        totalTasks,
        completedTasks,
        pendingTasks,
        highPriorityTasks,
      },

      recentTasks,
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });

  }
}

module.exports = {
  getDashboard,
};