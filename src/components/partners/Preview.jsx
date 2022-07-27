import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import { indigo } from "@mui/material/colors";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import usePartner from "@hooks/usePartner";
import useAdmin from "@hooks/useAdmin";

const Preview = ({ partner }) => {
    const { setPartner, setMenu } = usePartner();
    const admin = useAdmin();

    const handleMenu = (e) => {
        e.preventDefault();

        setPartner(partner);

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
                        {partner.name}
                    </Typography>
                    <Typography
                        sx={{
                            color: "text.secondary",
                        }}
                    >
                        {partner.email}
                    </Typography>
                </Box>

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
