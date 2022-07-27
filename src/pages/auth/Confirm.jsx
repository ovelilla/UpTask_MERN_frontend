import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import axios from "../../config/axios";
import { Avatar, Typography, Box, Alert, Link } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Confirm = () => {
  const [confirm, setConfirm] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const confirm = async () => {
      try {
        const { data } = await axios.post("/user/confirm", { token });
        setConfirm(true);
        setAlert(data);
      } catch (error) {
        setAlert({
          message: error.response.data.message,
          type: "error",
        });
      }
    };
    confirm();
  }, []);

  return (
    <>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography variant="h5" component="h2">
          Confirmar cuenta
        </Typography>
      </Box>

      {alert.message && <Alert severity={alert.type}>{alert.message}</Alert>}

      {confirm && (
        <Link component={RouterLink} to="/" variant="body2" align="center">
          Inicia sesión
        </Link>
      )}
    </>
  );
};

export default Confirm;
