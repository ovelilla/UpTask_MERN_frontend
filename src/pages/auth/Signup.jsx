import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Typography,
  Box,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "../../config/axios";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/user/signup", values);

      setAlert(data);
      setValues({ ...values, name: "", email: "", password: "" });
    } catch (error) {
      setErrors({ ...errors, ...error.response.data.errors });
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
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
          Crear cuenta
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
          id="name"
          label="Nombre"
          name="name"
          value={values.name}
          error={errors.name.length > 0}
          helperText={errors.name}
          onChange={handleChange}
          autoFocus
        />

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

        <TextField
          required
          id="password"
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={values.password}
          error={errors.password.length > 0}
          helperText={errors.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          fullWidth
          sx={{ mt: 4 }}
        >
          Registrarse
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

          <Link component={RouterLink} to="/recuperar" variant="body2">
            ¿Olvidaste la contraseaña?
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Signup;
