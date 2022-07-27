import { Box, CircularProgress } from "@mui/material";

const Load = () => {
    return (
        <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%) !important",
            }}
        >
            <CircularProgress color="primary" size={100} thickness={1} />
        </Box>
    );
};

export default Load;
