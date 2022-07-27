import { Box, Typography } from "@mui/material";

const Home = () => {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
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
                    Home
                </Typography>
            </Box>
        </>
    );
};

export default Home;
