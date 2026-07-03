import api from "./axios";

// ======================
// GET ALL TASKS
// ======================

export const getAllTasks = async (params = {}) => {

    const response = await api.get("/task", {
        params,
    });

    return response.data;

};

// ======================
// GET SINGLE TASK
// ======================

export const getSingleTask = async (taskId) => {

    const response = await api.get(`/task/${taskId}`);

    return response.data;

};

// ======================
// CREATE TASK
// ======================

export const createTask = async (taskData) => {

    const response = await api.post(
        "/task/create",
        taskData
    );

    return response.data;

};

// ======================
// UPDATE TASK
// ======================

export const updateTask = async (taskId, taskData) => {

    const response = await api.patch(
        `/task/${taskId}`,
        taskData
    );

    return response.data;

};

// ======================
// DELETE TASK
// ======================

export const deleteTask = async (taskId) => {

    const response = await api.delete(
        `/task/${taskId}`
    );

    return response.data;

};

// ======================
// UPDATE SUBTASK STATUS
// ======================

export const updateSubTaskStatus = async (
    taskId,
    subTaskId,
    isCompleted
) => {

    const response = await api.patch(

        `/task/${taskId}/subtask/${subTaskId}`,

        {
            isCompleted,
        }

    );

    return response.data;

};