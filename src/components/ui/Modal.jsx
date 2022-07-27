import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import MuiModal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import CloseIcon from "@mui/icons-material/Close";

import { grey } from "@mui/material/colors";

const container = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    maxWidth: 600,
    bgcolor: "background.paper",
    borderRadius: 2,
};

const header = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: { xs: "55px", sm: "60px", md: "65px", lg: "70px" },
    padding: { xs: "0 14px", sm: "0 16px", md: "0 18px", lg: "0 22px" },
    borderBottom: `1px solid ${grey[200]}`,
};

const body = {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    padding: { xs: "14px", sm: "16px", md: "18px", lg: "22px" },
};

const footer = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 2,
    height: { xs: "65px", sm: "70px", md: "75px", lg: "80px" },
    padding: { xs: "0 14px", sm: "0 16px", md: "0 18px", lg: "0 22px" },
    borderTop: `1px solid ${grey[200]}`,
};

const Modal = ({ modal, setModal }) => {
    const handleClose = () => setModal({ ...modal, open: false });

    return (
        <MuiModal
            open={modal.open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
                style: {
                    backgroundColor: "rgba(0, 0, 0, 0.25)",
                },
            }}
        >
            <Fade in={modal.open}>
                <Box sx={container}>
                    <Box sx={header}>
                        <Typography
                            sx={{
                                fontSize: { xs: 16, sm: 18, md: 20 },
                                fontWeight: 300,
                            }}
                        >
                            {modal.title}
                        </Typography>

                        <IconButton onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Box sx={body}>{modal.content}</Box>

                    <Box sx={footer}>
                        <Button
                            variant="outlined"
                            size="large"
                            color="primary"
                            onClick={handleClose}
                        >
                            Cerrar
                        </Button>
                        <Button
                            type="submit"
                            form={modal.form}
                            variant="contained"
                            size="large"
                            color="primary"
                            disableElevation
                        >
                            {modal.action}
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </MuiModal>
    );
};

export default Modal;
