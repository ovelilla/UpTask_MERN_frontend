import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import LightTheme from "@themes/LightTheme";

import { AuthProvider } from "@context/AuthProvider";
import { UIProvider } from "@context/UIProvider";
import { ProjectProvider } from "@context/ProjectProvider";
import { TaskProvider } from "@context/TaskProvider";
import { PartnerProvider } from "@context/PartnerProvider";

import AuthLayout from "@layouts/AuthLayout";
import PrivateRoute from "@layouts/PrivateRoute";

import Login from "@pages/auth/Login";
import Signup from "@pages/auth/Signup";
import Confirm from "@pages/auth/Confirm";
import Recover from "@pages/auth/Recover";
import Restore from "@pages/auth/Restore";

import Home from "@pages/Home";
import Projects from "@pages/Projects";
import Project from "@pages/Project";
import Profile from "@pages/Profile";

function App() {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <BrowserRouter>
                <AuthProvider>
                    <UIProvider>
                        <ProjectProvider>
                            <TaskProvider>
                                <PartnerProvider>
                                    <Routes>
                                        <Route path="/" element={<AuthLayout />}>
                                            <Route index element={<Login />} />
                                            <Route path="registrar" element={<Signup />} />
                                            <Route path="confirmar/:token" element={<Confirm />} />
                                            <Route path="recuperar" element={<Recover />} />
                                            <Route path="restaurar/:token" element={<Restore />} />
                                        </Route>

                                        <Route path="/dashboard" element={<PrivateRoute />}>
                                            <Route index element={<Home />} />
                                            <Route path="proyectos" element={<Projects />} />
                                            <Route path="proyecto/:id" element={<Project />} />
                                            <Route path="perfil" element={<Profile />} />
                                        </Route>
                                    </Routes>
                                </PartnerProvider>
                            </TaskProvider>
                        </ProjectProvider>
                    </UIProvider>
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
