import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Avatar,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useAuth from "../../hooks/useAuth";
import axios from "../../config/axios";

const Login = () => {
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
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/user/login", values, {
        withCredentials: true,
      });

      setValues({ ...values, email: "", password: "" });
      setAuth(data);
      navigate("/dashboard");
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
          Iniciar Sesión
        </Typography>
      </Box>

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
          autoFocus
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

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Recuérdame"
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          fullWidth
          sx={{ mt: 1 }}
        >
          Iniciar sesión
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
          <Link component={RouterLink} to="/registrar" variant="body2">
            ¿No tienes cuenta? Regístrate
          </Link>

          <Link component={RouterLink} to="/recuperar" variant="body2">
            ¿Olvidaste la contraseaña?
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Login;
