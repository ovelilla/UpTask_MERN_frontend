import { Link as RouterLink } from "react-router-dom";

import { styled } from "@mui/material/styles";

import MuiList from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MuiListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import useProject from "@hooks/useProject";

const Wrapper = styled("div")({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    backgroundColor: "transparent",
});

const List = styled(MuiList)(({ theme }) => ({
    padding: 0,
    backgroundColor: "white",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    [theme.breakpoints.up("xs")]: {
        margin: "56px 0 0 0",
    },
    [theme.breakpoints.up("sm")]: {
        margin: "64px 0 0 240px",
    },
    [theme.breakpoints.up("md")]: {
        marginLeft: "240px",
    },
}));

const ListItemButton = styled(MuiListItemButton)({
    padding: "10px 24px",
});

const SearchResult = ({ setSearch, setOpenSearchBar, setOpenSearchResult, searchResult }) => {
    const { setProject } = useProject();

    const handleClose = () => {
        setSearch("");
        setOpenSearchBar(false);
        setOpenSearchResult(false);
    };

    return (
        <Wrapper onClick={handleClose}>
            <List>
                {searchResult.map((item) => (
                    <ListItem key={item._id} disablePadding>
                        <ListItemButton
                            component={RouterLink}
                            to={`/dashboard/proyecto/${item._id}`}
                            onClick={() => {
                                setProject(item);
                            }}
                        >
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Wrapper>
    );
};

export default SearchResult;
