import { useContext } from "react";
import PartnerContext from "../context/PartnerProvider";

const usePartner = () => {
    return useContext(PartnerContext);
};

export default usePartner;
