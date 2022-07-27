import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
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

const Restore = () => {
  const [values, setValues] = useState({ password: "" });
  const [errors, setErrors] = useState({ password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [validToken, setValidToken] = useState(false);
  const [updated, setUpdated] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const checkToken = async () => {
      try {
        const { data } = await axios.post("/user/check-token", {
          token,
        });
        setValidToken(true);
      } catch (error) {
        setAlert({
          message: error.response.data.message,
          type: "error",
        });
      }
    };
    checkToken();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/user/restore", { ...values, token });

      setAlert(data);
      setValues({ ...values, password: "" });
      setUpdated(true);
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
          Restablecer password
        </Typography>
      </Box>

      {alert.message && <Alert severity={alert.type}>{alert.message}</Alert>}

      {validToken && !updated && (
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
            id="password"
            label="Nuevo Password"
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
            sx={{ mt: 1 }}
          >
            Restablecer
          </Button>
        </Box>
      )}

      {updated && (
        <Link component={RouterLink} to="/" variant="body2" align="center">
          Inicia sesión
        </Link>
      )}
    </>
  );
};

export default Restore;
