import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Form from "@components/tasks/Form";

import useUI from "@hooks/useUI";
import useTask from "@hooks/useTask";

const Menu = () => {
    const { setModal, setDialog } = useUI();
    const { menu, setMenu, deleteTask } = useTask();

    const handleClose = (e) => {
        e.preventDefault();

        setMenu({ ...menu, open: false });
    };

    const handleOpenModal = () => {
        setModal({
            open: true,
            title: "Actualizar tarea",
            content: <Form />,
            form: "task-form",
            action: "Actualizar",
        });
    };

    const handleOpenDialog = () => {
        setDialog({
            open: true,
            title: "Eliminar tarea",
            description: "¿Está seguro de eliminar esta tarea?",
            action: deleteTask,
        });
    };

    return (
        <MuiMenu
            anchorEl={menu.anchorEl}
            id="task-menu"
            open={menu.open}
            onClose={handleClose}
            onClick={handleClose}
            variant="menu"
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: "visible",
                    width: "100%",
                    maxWidth: 180,
                    filter: "drop-shadow(0px 2px 6px rgba(0,0,0,0.1))",
                    borderRadius: 2,
                    "& .MuiMenuItem-root": {
                        height: 50,
                        px: 2,
                    },
                },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
            <MenuItem onClick={handleOpenModal}>
                <ListItemIcon>
                    <EditIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Editar" />
            </MenuItem>

            <MenuItem onClick={handleOpenDialog}>
                <ListItemIcon>
                    <DeleteIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Eliminar" />
            </MenuItem>
        </MuiMenu>
    );
};

export default Menu;
