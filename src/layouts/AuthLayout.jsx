import { Outlet } from "react-router-dom";
import { Container, Box, Typography } from "@mui/material";

const AuthLayout = () => {
    return (
        <>
            <Container
                component="main"
                maxWidth="sm"
                sx={{
                    mt: {
                        xs: 4,
                        md: 8,
                    },
                }}
            >
                <Typography
                    variant="h3"
                    component="h1"
                    align="center"
                    sx={{
                        fontWeight: 900,
                        color: "primary.main",
                    }}
                >
                    UpTask
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: {
                            xs: 2,
                            sm: 3,
                            md: 4,
                        },
                        mt: {
                            xs: 2,
                            md: 4,
                        },
                        p: {
                            xs: 3,
                            sm: 4,
                            md: 5,
                            lg: 6,
                        },
                        backgroundColor: "white",
                        boxShadow: 4,
                        borderRadius: 2,
                    }}
                >
                    <Outlet />
                </Box>
            </Container>
        </>
    );
};

export default AuthLayout;
