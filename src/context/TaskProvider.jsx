import { useState, useEffect, createContext } from "react";

import useUI from "@hooks/useUI";
import useProject from "@hooks/useProject";

import axios from "@config/axios";

import io from "socket.io-client";

let socket;

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [task, setTask] = useState(null);
    const [menu, setMenu] = useState({
        anchorEl: null,
        open: false,
    });
    const [values, setValues] = useState({
        name: "",
        description: "",
        deliveryDate: null,
        priority: "",
        project: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        description: "",
        deliveryDate: "",
        priority: "",
    });

    const { loading, setLoading, modal, setModal, dialog, setDialog, alert, setAlert } = useUI();
    const { tasks, setTasks } = useProject();

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL);
    }, []);

    const createTask = async () => {
        try {
            const { data } = await axios.post("/task", values, {
                withCredentials: true,
            });

            socket.emit("create-task", data.task);

            setAlert({ message: data.message });
            setValues({
                ...values,
                name: "",
                description: "",
                deliveryDate: null,
                priority: "",
                project: "",
            });
            setTimeout(() => {
                setAlert({ message: "", type: "" });
                setModal({ ...modal, open: false });
            }, 3000);
        } catch (error) {
            if (error.response.data.message) {
                setAlert({ message: error.response.data.message, type: "error" });
            } else {
                setErrors({ ...errors, ...error.response.data.errors });
            }
        }
    };

    const updateTask = async () => {
        try {
            const { data } = await axios.put(`/task/${task._id}`, values, {
                withCredentials: true,
            });

            socket.emit("update-task", data.task);

            setAlert({ message: data.message });
            setValues({
                ...values,
                name: "",
                description: "",
                deliveryDate: null,
                priority: "",
                project: "",
            });
            setTimeout(() => {
                setAlert({ message: "", type: "" });
                setModal({ ...modal, open: false });
            }, 3000);
        } catch (error) {
            if (error.response.data.message) {
                setAlert({ message: error.response.data.message, type: "error" });
            } else {
                setErrors({ ...errors, ...error.response.data.errors });
            }
        }
    };

    const deleteTask = async () => {
        try {
            await axios.delete(`/task/${task._id}`, {
                withCredentials: true,
            });

            socket.emit("delete-task", task);

            setDialog({ ...dialog, open: false });
        } catch (error) {
            console.log(error);
        }
    };

    const changeStatus = async (task) => {
        try {
            const { data } = await axios.post("/task/status", task, {
                withCredentials: true,
            });

            socket.emit("change-status", data.task);
        } catch (error) {
            console.log(error);
        }
    };

    const clearTask = () => {
        setTask(null);
    };

    return (
        <TaskContext.Provider
            value={{
                task,
                setTask,
                menu,
                setMenu,
                values,
                setValues,
                errors,
                setErrors,
                createTask,
                updateTask,
                deleteTask,
                changeStatus,
                clearTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;
