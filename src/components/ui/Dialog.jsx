import Button from "@mui/material/Button";
import MuiDialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Dialog = ({ dialog, setDialog }) => {
    const handleClose = () => setDialog({ ...dialog, open: false });

    const handleAction = () => {
        dialog.action();
        setDialog({ ...dialog, open: false });
    };

    return (
        <MuiDialog
            open={dialog.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            BackdropProps={{
                style: {
                    backgroundColor: "rgba(0, 0, 0, 0.25)",
                },
            }}
            PaperProps={{
                style: {
                    boxShadow: "none",
                },
            }}
        >
            <DialogTitle id="alert-dialog-title">{dialog.title}</DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {dialog.description}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button size="large" onClick={handleClose}>
                    Cancelar
                </Button>

                <Button size="large" onClick={handleAction} autoFocus>
                    Aceptar
                </Button>
            </DialogActions>
        </MuiDialog>
    );
};

export default Dialog;
