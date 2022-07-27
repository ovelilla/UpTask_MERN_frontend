import { Link as RouterLink } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import { indigo } from "@mui/material/colors";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import useAuth from "@hooks/useAuth";
import useProject from "@hooks/useProject";

const Preview = ({ project }) => {
    const { auth } = useAuth();
    const { setProject, setMenu } = useProject();

    const handleMenu = (e) => {
        e.preventDefault();

        setProject(project);

        setMenu({
            anchorEl: e.currentTarget,
            open: true,
        });
    };

    return (
        <>
            <Box
                component={RouterLink}
                to={`/dashboard/proyecto/${project._id}`}
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 0.4,
                    py: {
                        xs: "10px",
                        sm: "12px",
                        md: "14px",
                        lg: "16px",
                    },
                    px: {
                        xs: "20px",
                        sm: "22px",
                        md: "24px",
                        lg: "26px",
                    },
                    backgroundColor: "white",
                    textDecoration: "none",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                    "&:hover": {
                        backgroundColor: indigo[50],
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.4,
                    }}
                >
                    <Typography
                        sx={{
                            color: "text.primary",
                        }}
                    >
                        {project.name}
                    </Typography>
                    <Typography
                        sx={{
                            color: "text.secondary",
                        }}
                    >
                        {project.customer}
                    </Typography>
                </Box>

                {auth._id !== project.creator && (
                    <Typography
                        sx={{
                            px: 1.5,
                            py: .5,
                            backgroundColor: "primary.main",
                            color: "white",
                            fontSize: 14,
                            borderRadius: 2
                        }}
                    >
                        Colaborador
                    </Typography>
                )}

                {auth._id === project.creator && (
                    <IconButton onClick={handleMenu} aria-label="project options">
                        <MoreVertIcon />
                    </IconButton>
                )}
            </Box>

            <Divider />
        </>
    );
};

export default Preview;
