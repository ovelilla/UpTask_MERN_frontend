import { useContext } from "react";
import ProjectContext from "../context/ProjectProvider";

const useProject = () => {
    return useContext(ProjectContext);
};

export default useProject;
