import { useState, createContext } from "react";

import useAuth from "@hooks/useAuth";
import useUI from "@hooks/useUI";

import axios from "@config/axios";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [project, setProject] = useState(null);
    const [projects, setProjects] = useState([]);

    const [tasks, setTasks] = useState([]);
    const [partners, setPartners] = useState([]);

    const [menu, setMenu] = useState({
        anchorEl: null,
        open: false,
    });

    const [values, setValues] = useState({
        name: "",
        description: "",
        deliveryDate: null,
        customer: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        description: "",
        deliveryDate: "",
        customer: "",
    });

    const { auth } = useAuth();
    const { loading, setLoading, modal, setModal, dialog, setDialog, alert, setAlert } = useUI();

    const readProjects = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get("/project", {
                withCredentials: true,
            });
            setProjects(data);
        } catch (error) {
            setProjects([]);
        } finally {
            setLoading(false);
        }
    };

    const readProject = async (id) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/project/${id}`, {
                withCredentials: true,
            });

            setProject(data);
            setTasks(data.tasks);
            setPartners(data.partners);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const createProject = async () => {
        try {
            const { data } = await axios.post("/project", values, {
                withCredentials: true,
            });

            setProjects([...projects, data.project]);
            setAlert({ message: data.message });
            setValues({
                ...values,
                name: "",
                description: "",
                deliveryDate: null,
                customer: "",
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

    const updateProject = async () => {
        try {
            const { data } = await axios.put(`/project/${project._id}`, values, {
                withCredentials: true,
            });

            setProjects([
                ...projects.map((project) =>
                    project._id === data.project._id ? data.project : project
                ),
            ]);
            setAlert({ message: data.message });
            setValues({
                ...values,
                name: "",
                description: "",
                deliveryDate: null,
                customer: "",
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

    const deleteProject = async () => {
        try {
            await axios.delete(`/project/${project._id}`, {
                withCredentials: true,
            });

            setProjects(projects.filter((p) => p._id !== project._id));
            setProject(null);
            setDialog({ ...dialog, open: false });
        } catch (error) {
            console.log(error);
        }
    };

    const clear = () => {
        setProject(null);
        setProjects([]);
        setTasks([]);
        setPartners([]);
    };

    return (
        <ProjectContext.Provider
            value={{
                project,
                setProject,
                projects,
                setProjects,
                tasks,
                setTasks,
                partners,
                setPartners,
                menu,
                setMenu,
                values,
                setValues,
                errors,
                setErrors,
                readProjects,
                readProject,
                createProject,
                updateProject,
                deleteProject,
                clear,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};

export default ProjectContext;
