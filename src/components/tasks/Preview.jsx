import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import { indigo, red, green, grey } from "@mui/material/colors";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";

import useTask from "@hooks/useTask";
import useAdmin from "@hooks/useAdmin";

const Preview = ({ task }) => {
    const { setTask, setMenu, changeStatus } = useTask();
    const admin = useAdmin();

    const handleStatus = () => {
        setTask(task);
        changeStatus(task);
    };

    const handleMenu = (e) => {
        e.preventDefault();

        setTask(task);

        setMenu({
            anchorEl: e.currentTarget,
            open: true,
        });
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
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
                    transition: "background-color 0.2s ease",
                    "&:hover": {
                        backgroundColor: indigo[50],
                    },
                }}
            >
                <IconButton onClick={handleStatus} aria-label="status">
                    <CheckCircleOutlineIcon
                        sx={{
                            color: grey[400],
                            ...(task.status && {
                                color: "primary.main",
                            }),
                        }}
                    />
                </IconButton>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        gap: 0.4,
                    }}
                >
                    <Typography
                        sx={{
                            color: "text.primary",
                        }}
                    >
                        {task.name}
                    </Typography>
                    {task.status && (
                        <Typography
                            sx={{
                                color: "text.secondary",
                            }}
                        >
                            Completada por {task.completed.name}
                        </Typography>
                    )}
                </Box>

                {task.priority === "High" && <NorthIcon sx={{ color: green[200] }} />}

                {task.priority === "Low" && <SouthIcon sx={{ color: red[200] }} />}

                {admin && (
                    <IconButton onClick={handleMenu} aria-label="task options">
                        <MoreVertIcon />
                    </IconButton>
                )}
            </Box>

            <Divider />
        </>
    );
};

export default Preview;
