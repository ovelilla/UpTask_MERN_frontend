import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Typography,
  Box,
  TextField,
  Button,
  Link,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "../../config/axios";

const Recover = () => {
  const [values, setValues] = useState({ email: "" });
  const [errors, setErrors] = useState({ email: "" });
  const [alert, setAlert] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/user/recover", values);

      setAlert(data);
      setValues({ ...values, email: "" });
    } catch (error) {
      setErrors({ ...errors, ...error.response.data.errors });
    }
  };

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
          Recuperar contraseña
        </Typography>
      </Box>

      {alert.message && <Alert severity={alert.type}>{alert.message}</Alert>}

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: {
            xs: 1,
            md: 2,
          },
        }}
      >
        <TextField
          required
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          type="email"
          value={values.email}
          error={errors.email.length > 0}
          helperText={errors.email}
          onChange={handleChange}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          fullWidth
          sx={{ mt: 4 }}
        >
          Recuperar
        </Button>

        <Box
          component="nav"
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            mt: 2,
          }}
        >
          <Link component={RouterLink} to="/" variant="body2">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>

          <Link component={RouterLink} to="/registrar" variant="body2">
            ¿No tienes cuenta? Regístrate
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Recover;
