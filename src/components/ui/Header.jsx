import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { styled } from "@mui/material/styles";

import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import useAuth from "@hooks/useAuth";
import useProject from "@hooks/useProject";
import useTask from "@hooks/useTask";
import usePartner from "@hooks/usePartner";

import SearchResult from "@components/ui/SearchResult";

const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
    [theme.breakpoints.up("sm")]: {
        width: `calc(100% + ${240}px)`,
        marginLeft: `${-240}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: "100%",
            marginLeft: 0,
            transition: theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    },
}));

const Search = styled("div")({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    paddingRight: "20px",
});

const SearchIconWrapper = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    padding: "0px 20px",
});

const StyledInputBase = styled(InputBase)({
    flex: 1,
    zIndex: 2,
});

const Header = ({ openDrawer, setOpenDrawer }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [openSearchBar, setOpenSearchBar] = useState(false);
    const [openSearchResult, setOpenSearchResult] = useState(false);

    const { logout } = useAuth();
    const { projects, clearProject } = useProject();
    const { clearTask } = useTask();
    const { clearPartner } = usePartner();

    const handleMenu = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleDrawerOpen = () => {
        setOpenDrawer(!openDrawer);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenSearchBar = (e) => {
        setSearch("");
        setOpenSearchBar(!openSearchBar);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setOpenSearchResult(true);

        setSearchResult(
            projects.filter((project) => {
                return project.name.toLowerCase().includes(e.target.value.toLowerCase());
            })
        );
    };

    return (
        <AppBar
            position="static"
            open={openDrawer}
            sx={{
                zIndex: 1,
                backgroundColor: "white",
                color: "rgba(0, 0, 0, 0.54)",
                boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            }}
        >
            <Toolbar sx={{ gap: 1 }}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ ...(openDrawer && { display: "none" }) }}
                    onClick={handleDrawerOpen}
                >
                    <MenuIcon fontSize="inherit" />
                </IconButton>

                <Typography
                    variant="h6"
                    component="div"
                    sx={{ display: { xs: "none", sm: "block" }, flexGrow: 1 }}
                >
                    UpTask
                </Typography>

                <IconButton
                    size="large"
                    aria-label="search"
                    color="inherit"
                    sx={{
                        marginLeft: "auto",
                    }}
                    onClick={handleOpenSearchBar}
                >
                    <SearchIcon />
                </IconButton>

                {openSearchBar && (
                    <Search onInput={handleSearch}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Buscar..."
                            inputProps={{ "aria-label": "search" }}
                            value={search}
                            autoFocus
                        />
                        <IconButton
                            aria-label="close"
                            size="large"
                            sx={{
                                zIndex: 2,
                            }}
                            onClick={handleOpenSearchBar}
                        >
                            <CloseIcon />
                        </IconButton>

                        {openSearchResult && (
                            <SearchResult
                                setSearch={setSearch}
                                setOpenSearchBar={setOpenSearchBar}
                                setOpenSearchResult={setOpenSearchResult}
                                searchResult={searchResult}
                            />
                        )}
                    </Search>
                )}

                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleMenu}
                >
                    <AccountCircle fontSize="inherit" />
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={openMenu}
                    onClose={handleClose}
                    onClick={handleClose}
                    variant="menu"
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            width: "100%",
                            maxWidth: 240,
                            mt: 1.5,
                            filter: "drop-shadow(0px 2px 6px rgba(0,0,0,0.1))",
                            borderRadius: 2,
                            "& .MuiMenuItem-root": {
                                height: 50,
                                px: 2,
                            },
                            "&:before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 20,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                    <li>
                        <MenuItem component={RouterLink} to="/dashboard/perfil">
                            <ListItemIcon>
                                <AccountCircle fontSize="medium" />
                            </ListItemIcon>
                            <ListItemText primary="Perfil" />
                        </MenuItem>
                    </li>

                    <Divider />

                    <li>
                        <MenuItem component={RouterLink} to="/dashboard/perfil">
                            <ListItemIcon>
                                <Settings fontSize="medium" />
                            </ListItemIcon>
                            <ListItemText primary="Ajustes" />
                        </MenuItem>
                    </li>

                    <MenuItem
                        onClick={() => {
                            logout();
                            clearProject();
                            clearTask();
                            clearPartner();
                        }}
                    >
                        <ListItemIcon>
                            <Logout fontSize="medium" />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
