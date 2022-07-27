import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";

const MainEl = styled("main")(({ theme, open }) => ({
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    [theme.breakpoints.up("xs")]: {
        height: "calc(100% - 56px)",
    },
    [theme.breakpoints.up("sm")]: {
        height: "calc(100% - 64px)",
        marginLeft: `-${240}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: 0,
            transition: theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    },
}));

const Main = ({ openDrawer }) => {
    return (
        <MainEl open={openDrawer}>
            <Outlet />
        </MainEl>
    );
};

export default Main;
