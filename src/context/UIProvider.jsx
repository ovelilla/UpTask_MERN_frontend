import { useState, createContext } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState({
        open: false,
        title: "",
        content: "",
        form: "",
        action: "",
    });
    const [dialog, setDialog] = useState({
        open: false,
        title: "",
        description: "",
        action: null,
    });
    const [alert, setAlert] = useState({ message: "", type: "" });

    return (
        <UIContext.Provider
            value={{
                loading,
                setLoading,
                modal,
                setModal,
                dialog,
                setDialog,
                alert,
                setAlert,
            }}
        >
            {children}
        </UIContext.Provider>
    );
};

export default UIContext;
