import { Link as RouterLink } from "react-router-dom";

import { styled } from "@mui/material/styles";

import Drawer from "@mui/material/Drawer";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HomeIcon from "@mui/icons-material/Home";

import useWindowDimensions from "@hooks/useWindowDimensions";

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

const Sidebar = ({ openDrawer, setOpenDrawer }) => {
    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    const toggleDrawer = (open) => () => {
        setOpenDrawer(open);
    };

    const { height, width } = useWindowDimensions();

    const drawer = (
        <>
            <DrawerHeader>
                <IconButton
                    onClick={handleDrawerClose}
                    sx={{
                        color: "rgba(255, 255, 255, 0.7)",
                        "&:hover *": {
                            color: "white",
                        },
                    }}
                >
                    <ChevronLeftIcon />
                </IconButton>
            </DrawerHeader>

            <List
                sx={{
                    px: 1.5,
                    "& *": {
                        color: "rgba(255, 255, 255, 0.7)",
                    },
                    "& li": {
                        borderRadius: 1,
                    },
                    "& li:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                    },
                    "& li:hover *": {
                        color: "white",
                    },
                }}
            >
                <ListItem disablePadding>
                    <ListItemButton component={RouterLink} to="/dashboard">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={RouterLink} to="/dashboard/proyectos">
                        <ListItemIcon>
                            <TaskAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Proyectos" />
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    );

    return (
        <>
            {width < 600 ? (
                <SwipeableDrawer
                    anchor="left"
                    open={openDrawer}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        width: 240,
                        flexShrink: 0,
                        zIndex: 1,
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: 240,
                            backgroundColor: "rgb(17, 24, 39)",
                            boxShadow:
                                "rgb(0 0 0 / 20%) 0px 8px 10px -5px, rgb(0 0 0 / 14%) 0px 16px 24px 2px, rgb(0 0 0 / 12%) 0px 6px 30px 5px",
                        },
                    }}
                >
                    {drawer}
                </SwipeableDrawer>
            ) : (
                <Drawer
                    anchor="left"
                    variant="persistent"
                    open={openDrawer}
                    sx={{
                        display: { xs: "none", sm: "block" },
                        width: 240,
                        flexShrink: 0,
                        zIndex: 1,
                        "& .MuiDrawer-paper": {
                            width: 240,
                            boxSizing: "border-box",
                            backgroundColor: "rgb(17, 24, 39)",
                            boxShadow:
                                "rgb(0 0 0 / 20%) 0px 8px 10px -5px, rgb(0 0 0 / 14%) 0px 16px 24px 2px, rgb(0 0 0 / 12%) 0px 6px 30px 5px",
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            )}
        </>
    );
};

export default Sidebar;
