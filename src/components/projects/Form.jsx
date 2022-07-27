import { useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import useUI from "@hooks/useUI";
import useProject from "@hooks/useProject";

const Form = () => {
    const { alert, setAlert } = useUI();
    const { project, values, setValues, errors, setErrors, createProject, updateProject } =
        useProject();

    useEffect(() => {
        if (project) {
            setValues({
                name: project.name,
                description: project.description,
                deliveryDate: project.deliveryDate,
                customer: project.customer,
            });
        } else {
            setValues({
                name: "",
                description: "",
                deliveryDate: null,
                customer: "",
            });
        }

        setErrors({
            name: "",
            description: "",
            deliveryDate: "",
            customer: "",
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

        project ? updateProject() : createProject();
    };

    return (
        <>
            {alert.message && <Alert severity={alert.type}>{alert.message}</Alert>}

            <Box
                component="form"
                id="project-form"
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

                <TextField
                    required
                    id="customer"
                    label="Cliente"
                    name="customer"
                    type="text"
                    value={values.customer}
                    error={errors.customer.length > 0}
                    helperText={errors.customer}
                    onChange={handleChange}
                />
            </Box>
        </>
    );
};

export default Form;
