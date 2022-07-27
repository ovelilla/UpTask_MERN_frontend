import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DeleteIcon from "@mui/icons-material/Delete";

import useUI from "@hooks/useUI";
import usePartner from "@hooks/usePartner";

const Menu = () => {
    const { setDialog } = useUI();
    const { setPartner, menu, setMenu, deletePartner } = usePartner();

    const handleClose = (e) => {
        e.preventDefault();
        
        setPartner(null);

        setMenu({ ...menu, open: false });
    };

    const handleOpenDialog = () => {
        setDialog({
            open: true,
            title: "Eliminar colaborador",
            description: "¿Está seguro de eliminar esta colaborador?",
            action: deletePartner,
        });
    };

    return (
        <MuiMenu
            anchorEl={menu.anchorEl}
            id="partner-menu"
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
