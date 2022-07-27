import { useEffect } from "react";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";

import useUI from "@hooks/useUI";
import useProject from "@hooks/useProject";
import useTask from "@hooks/useTask";
import usePartner from "@hooks/usePartner";
import useAdmin from "@hooks/useAdmin";

import Load from "@components/ui/Load";
import Modal from "@components/ui/Modal";
import Dialog from "@components/ui/Dialog";

import TaskForm from "@components/tasks/Form";
import TaskMenu from "@components/tasks/Menu";
import TaskPreview from "@components/tasks/Preview";

import PartnerForm from "@components/partners/Form";
import PartnerMenu from "@components/partners/Menu";
import PartnerPreview from "@components/partners/Preview";

import io from "socket.io-client";

let socket;

const Project = () => {
    const { id } = useParams();

    const { loading, modal, setModal, dialog, setDialog } = useUI();
    const { project, tasks, setTasks, partners, readProject } = useProject();
    const { setTask, setValues: setTaskValues } = useTask();
    const { setPartner, setValues: setPartnerValues } = usePartner();
    const admin = useAdmin();

    useEffect(() => {
        readProject(id);

        socket = io(import.meta.env.VITE_BACKEND_URL);
        socket.emit("open-project", id);
    }, []);

    useEffect(() => {
        socket.on("task-created", (data) => {
            if (project && data.project === project._id) {
                setTasks([...tasks, data]);
                setTask(null);
            }
        });

        socket.on("task-updated", (data) => {
            if (project && data.project._id === project._id) {
                setTasks(tasks.map((task) => (task._id === data._id ? data : task)));
                setTask(null);
            }
        });

        socket.on("task-deleted", (data) => {
            if (project && data.project._id && data.project._id === project._id) {
                setTasks(tasks.filter((task) => task._id !== data._id));
                setTask(null);
                return;
            }

            if (project && data.project === project._id) {
                setTasks(tasks.filter((task) => task._id !== data._id));
                setTask(null);
            }
        });

        socket.on("status-changed", (data) => {
            if (project && data.project._id === project._id) {
                setTasks(tasks.map((task) => (task._id === data._id ? data : task)));
                setTask(null);
            }
        });
    });

    const handleOpenModalTask = () => {
        setTask(null);
        setTaskValues({
            name: "",
            description: "",
            deliveryDate: null,
            priority: "",
            project: "",
        });
        setModal({
            open: true,
            title: "Nueva tarea",
            content: <TaskForm />,
            form: "task-form",
            action: "Guardar",
        });
    };

    const handleOpenModalPartner = () => {
        setPartner(null);
        setPartnerValues({
            email: "",
        });
        setModal({
            open: true,
            title: "Nuevo colaborador",
            content: <PartnerForm />,
            form: "partner-form",
            action: "Guardar",
        });
    };

    if (loading) {
        return <Load />;
    }

    if (!project) {
        return (
            <>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                        padding: 4,
                        backgroundColor: "white",
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 900,
                            color: "text.primary.main",
                        }}
                    >
                        Proyecto no encontrado
                    </Typography>
                </Box>
            </>
        );
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    padding: 4,
                    backgroundColor: "white",
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 900,
                        color: "text.primary.main",
                    }}
                >
                    {project && project.name}
                </Typography>

                {admin && (
                    <>
                        <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            startIcon={<AddIcon />}
                            disableElevation
                            sx={{
                                textTransform: "none",
                                borderRadius: 10,
                            }}
                            onClick={handleOpenModalTask}
                        >
                            Añadir tarea
                        </Button>

                        <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            startIcon={<AddIcon />}
                            disableElevation
                            sx={{
                                textTransform: "none",
                                borderRadius: 10,
                            }}
                            onClick={handleOpenModalPartner}
                        >
                            Añadir colaborador
                        </Button>
                    </>
                )}
            </Box>

            <Divider />

            <Box>
                <Typography
                    sx={{
                        px: 4,
                        py: 2,
                        fontWeight: 500,
                        fontSize: "1.2rem",
                    }}
                >
                    Tareas
                </Typography>
            </Box>

            <Divider />

            {tasks.map((task) => (
                <TaskPreview key={task._id} task={task} />
            ))}

            <Box>
                <Typography
                    sx={{
                        px: 4,
                        py: 2,
                        fontWeight: 500,
                        fontSize: "1.2rem",
                    }}
                >
                    Colaboradores
                </Typography>
            </Box>

            <Divider />

            {partners.map((partner) => (
                <PartnerPreview key={partner._id} partner={partner} />
            ))}

            <Modal modal={modal} setModal={setModal} />

            <TaskMenu />
            <PartnerMenu />

            <Dialog dialog={dialog} setDialog={setDialog} />
        </>
    );
};

export default Project;
