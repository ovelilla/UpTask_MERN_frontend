import useAuth from "@hooks/useAuth";
import useProject from "@hooks/useProject";

const useAdmin = () => {
    const { auth } = useAuth();
    const { project } = useProject();

    return project && auth._id === project.creator;
};

export default useAdmin;
