import { useEffect } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";

import useUI from "@hooks/useUI";
import useProject from "@hooks/useProject";

import Load from "@components/ui/Load";
import Modal from "@components/ui/Modal";
import Dialog from "@components/ui/Dialog";

import Form from "@components/projects/Form";
import Menu from "@components/projects/Menu";
import Preview from "@components/projects/Preview";

const Projects = () => {
    const { loading, modal, setModal, dialog, setDialog } = useUI();
    const { setProject, projects, setValues, readProjects } = useProject();

    useEffect(() => {
        readProjects();
    }, []);

    const handleOpenModal = () => {
        setProject(null);
        setValues({
            name: "",
            description: "",
            deliveryDate: null,
            customer: "",
        });

        setModal({
            open: true,
            title: "Nuevo proyecto",
            content: <Form />,
            form: "project-form",
            action: "Guardar",
        });
    };

    if (loading) {
        return <Load />;
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: 1,
                    padding: 4,
                    backgroundColor: "white",
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        fontWeight: 900,
                        color: "text.primary.main",
                    }}
                >
                    Proyectos
                </Typography>

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
                    onClick={handleOpenModal}
                >
                    Añadir proyecto
                </Button>
            </Box>

            <Divider />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto",
                    flexGrow: 1,
                }}
            >
                {projects.map((project) => (
                    <Preview key={project._id} project={project} />
                ))}
            </Box>

            <Modal modal={modal} setModal={setModal} />
            <Menu />
            <Dialog dialog={dialog} setDialog={setDialog} />
        </>
    );
};

export default Projects;
