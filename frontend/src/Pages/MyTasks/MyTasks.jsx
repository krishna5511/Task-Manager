import "./MyTasks.css";

import { useEffect, useState } from "react";

import SearchBar from "../../components/SearchBar/SearchBar";
import TaskCard from "../../components/TaskCard/TaskCard";
import EmptyState from "../../components/EmptyState/EmptyState";
import Modal from "../../components/Modal/Modal";
import TaskForm from "../../components/TaskForm/TaskForm";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";

import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../services/task.api";

const MyTasks = () => {
  // ==========================
  // STATES
  // ==========================

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [editingTask, setEditingTask] = useState(null);

  const [search, setSearch] = useState("");

  const [priority, setPriority] = useState("");

  const [status, setStatus] = useState("");

  const [sort, setSort] = useState("latest");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  // ==========================
  // FETCH TASKS
  // ==========================

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await getAllTasks({
        search,
        priority,
        status,
        sort,
        page,
        limit: 6,
      });

      setTasks(response.tasks);

      setTotalPages(response.totalPages);
    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message ||
          "Unable to fetch tasks."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // LOAD TASKS
  // ==========================

  useEffect(() => {
    fetchTasks();
  }, [search, priority, status, sort, page]);

  // ==========================
  // CREATE / UPDATE TASK
  // ==========================

  const handleSubmit = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(
          editingTask._id,
          taskData
        );

        toast.success("Task Updated Successfully");
      } else {
        await createTask(taskData);

        toast.success("Task Created Successfully");
      }

      setOpenModal(false);

      setEditingTask(null);

      fetchTasks();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Something went wrong."
      );
    }
  };

  // ==========================
  // DELETE TASK
  // ==========================

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTask(taskId);

      toast.success("Task Deleted Successfully");

      fetchTasks();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to delete task."
      );
    }
  };

  // ==========================
  // EDIT TASK
  // ==========================

  const handleEdit = (task) => {
    setEditingTask(task);

    setOpenModal(true);
  };

  // ==========================
  // OPEN CREATE MODAL
  // ==========================

  const handleCreate = () => {
    setEditingTask(null);

    setOpenModal(true);
  };

  return (
    <div className="myTasks">

      {/* Header */}

      <div className="taskHeader">

        <h1>My Tasks</h1>

        <button onClick={handleCreate}>
          + Create Task
        </button>

      </div>

      {/* Toolbar */}

      <div className="taskToolbar">

        <SearchBar
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
        >
          <option value="">
            All Priority
          </option>

          <option value="HIGH">
            HIGH
          </option>

          <option value="MEDIUM">
            MEDIUM
          </option>

          <option value="LOW">
            LOW
          </option>

        </select>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option value="">
            All Status
          </option>

          <option value="PENDING">
            PENDING
          </option>

          <option value="COMPLETE">
            COMPLETE
          </option>

        </select>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="latest">
            Latest
          </option>

          <option value="oldest">
            Oldest
          </option>

          <option value="high">
            High Priority
          </option>

          <option value="low">
            Low Priority
          </option>

          <option value="dueDate">
            Due Date
          </option>

        </select>
              </div>

      {/* Task List */}

      {loading ? (

        <Loader />

      ) : tasks.length === 0 ? (

        <EmptyState />

      ) : (

        <div className="taskGrid">

          {tasks.map((task) => (

            <TaskCard
              key={task._id}
              {...task}
              onEdit={() => handleEdit(task)}
              onDelete={() => handleDelete(task._id)}
            />

          ))}

        </div>

      )}

      {/* Pagination */}

      {!loading && totalPages > 1 && (

        <div className="pagination">

          <button
            disabled={page === 1}
            onClick={() =>
              setPage((prev) => prev - 1)
            }
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (

            <button
              key={index}
              className={
                page === index + 1
                  ? "activePage"
                  : ""
              }
              onClick={() =>
                setPage(index + 1)
              }
            >
              {index + 1}
            </button>

          ))}

          <button
            disabled={page === totalPages}
            onClick={() =>
              setPage((prev) => prev + 1)
            }
          >
            Next
          </button>

        </div>

      )}

      {/* Modal */}

      <Modal
        isOpen={openModal}
        title={
          editingTask
            ? "Update Task"
            : "Create Task"
        }
        onClose={() => {

          setOpenModal(false);

          setEditingTask(null);

        }}
      >

        <TaskForm
          initialData={editingTask || {}}
          onSubmit={handleSubmit}
        />

      </Modal>

    </div>
  );
};

export default MyTasks;