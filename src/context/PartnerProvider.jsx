import { useState, createContext } from "react";
import useUI from "@hooks/useUI";
import useProject from "@hooks/useProject";
import axios from "@config/axios";

const PartnerContext = createContext();

export const PartnerProvider = ({ children }) => {
    const [partner, setPartner] = useState(null);
    const [menu, setMenu] = useState({ anchorEl: null, open: false });
    const [values, setValues] = useState({ email: "", project: "" });
    const [errors, setErrors] = useState({ email: "" });

    const { loading, setLoading, modal, setModal, dialog, setDialog, alert, setAlert } = useUI();
    const { project, partners, setPartners } = useProject();

    const createPartner = async () => {
        try {
            const { data } = await axios.post("/project/partner", values, {
                withCredentials: true,
            });

            setPartners([...partners, data.partner]);
            setAlert({ message: data.message });
            setValues({ ...values, email: "", project: "" });
            setTimeout(() => {
                setAlert({ message: "", type: "" });
                setModal({ ...modal, open: false });
            }, 3000);
        } catch (error) {
            if (error.response.data.message) {
                setAlert({ message: error.response.data.message, type: "error" });
            } else {
                setErrors({ ...errors, ...error.response.data.errors });
            }
        }
    };
    const deletePartner = async () => {
        try {
            await axios.post(`/project/partner/${project._id}`, partner, {
                withCredentials: true,
            });

            setPartners(partners.filter((p) => p._id !== partner._id));
            setPartner(null);
            setDialog({ ...dialog, open: false });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PartnerContext.Provider
            value={{
                partner,
                setPartner,
                menu,
                setMenu,
                values,
                setValues,
                errors,
                setErrors,
                createPartner,
                deletePartner,
            }}
        >
            {children}
        </PartnerContext.Provider>
    );
};

export default PartnerContext;
