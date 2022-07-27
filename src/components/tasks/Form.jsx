import { useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import useUI from "@hooks/useUI";
import useProject from "@hooks/useProject";
import useTask from "@hooks/useTask";

const Form = () => {
    const { alert, setAlert } = useUI();
    const { task, values, setValues, errors, setErrors, createTask, updateTask } = useTask();
    const { project } = useProject();

    useEffect(() => {
        if (task) {
            setValues({
                name: task.name,
                description: task.description,
                deliveryDate: task.deliveryDate,
                priority: task.priority,
            });
        } else {
            setValues({
                name: "",
                description: "",
                deliveryDate: null,
                priority: "",
            });
        }

        setErrors({
            name: "",
            description: "",
            deliveryDate: "",
            priority: "",
        });

        setAlert({ message: "", type: "" });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        values.project = project._id;

        task ? updateTask() : createTask();
    };

    return (
        <>
            {alert.message && <Alert severity={alert.type}>{alert.message}</Alert>}

            <Box
                component="form"
                id="task-form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
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
                    type="text"
                    value={values.name}
                    error={errors.name.length > 0}
                    helperText={errors.name}
                    onChange={handleChange}
                />

                <TextField
                    required
                    id="description"
                    label="Descripción"
                    name="description"
                    type="text"
                    value={values.description}
                    error={errors.description.length > 0}
                    helperText={errors.description}
                    onChange={handleChange}
                />

                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                        label="Fecha"
                        inputFormat="DD/MM/YYYY"
                        value={values.deliveryDate}
                        onChange={(date) => {
                            setValues({ ...values, deliveryDate: date });
                            setErrors({ ...errors, deliveryDate: "" });
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                required
                                id="deliveryDate"
                                name="deliveryDate"
                                value={values.deliveryDate}
                                error={errors.deliveryDate.length > 0}
                                helperText={errors.deliveryDate}
                            />
                        )}
                    />
                </LocalizationProvider>

                <FormControl fullWidth error={errors.priority.length > 0}>
                    <InputLabel id="priority-label">Prioridad</InputLabel>
                    <Select
                        labelId="priority-label"
                        id="priority-select"
                        label="Prioridad"
                        name="priority"
                        value={values.priority}
                        onChange={handleChange}
                    >
                        <MenuItem
                            sx={{
                                px: {
                                    xs: 2,
                                    md: 3,
                                },
                                py: {
                                    xs: 1,
                                    md: 2,
                                },
                            }}
                            value={"Low"}
                        >
                            Baja
                        </MenuItem>
                        <MenuItem
                            sx={{
                                px: {
                                    xs: 2,
                                    md: 3,
                                },
                                py: {
                                    xs: 1,
                                    md: 2,
                                },
                            }}
                            value={"Medium"}
                        >
                            Media
                        </MenuItem>
                        <MenuItem
                            sx={{
                                px: {
                                    xs: 2,
                                    md: 3,
                                },
                                py: {
                                    xs: 1,
                                    md: 2,
                                },
                            }}
                            value={"High"}
                        >
                            Alta
                        </MenuItem>
                    </Select>
                    <FormHelperText>{errors.priority}</FormHelperText>
                </FormControl>
            </Box>
        </>
    );
};

export default Form;
