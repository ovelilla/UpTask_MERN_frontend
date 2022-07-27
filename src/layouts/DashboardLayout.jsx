import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Header from "@components/ui/Header";
import Sidebar from "@components/ui/Sidebar";
import Main from "@components/ui/Main";

import useWindowDimensions from "@hooks/useWindowDimensions";

const DashboardLayout = () => {
    const [openDrawer, setOpenDrawer] = useState(true);

    const { width } = useWindowDimensions();

    useEffect(() => {
        if (width < 600) {
            setOpenDrawer(false);
        } else {
            setOpenDrawer(true);
        }
    }, [width]);

    return (
        <Box sx={{ display: "flex", height: "100%" }}>
            <Sidebar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    height: "100%",
                }}
            >
                <Header openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
                <Main openDrawer={openDrawer} />
            </Box>
        </Box>
    );
};

export default DashboardLayout;
