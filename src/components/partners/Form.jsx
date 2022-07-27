import { useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

import useUI from "@hooks/useUI";
import useProject from "@hooks/useProject";
import usePartner from "@hooks/usePartner";

const Form = () => {
    const { alert, setAlert } = useUI();
    const { project } = useProject();
    const { partner, values, setValues, errors, setErrors, createPartner, updatePartner } =
        usePartner();

    useEffect(() => {
        if (partner) {
            setValues({
                email: partner.email,
            });
        } else {
            setValues({
                email: "",
            });
        }

        setErrors({
            email: "",
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

        partner ? updatePartner() : createPartner();
    };

    return (
        <>
            {alert.message && <Alert severity={alert.type}>{alert.message}</Alert>}

            <Box
                component="form"
                id="partner-form"
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
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    error={errors.email.length > 0}
                    helperText={errors.email}
                    onChange={handleChange}
                />
            </Box>
        </>
    );
};

export default Form;
