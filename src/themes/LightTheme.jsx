import { createTheme } from "@mui/material/styles";
import { blueGrey, indigo, grey } from "@mui/material/colors";

const LightTheme = createTheme({
    palette: {
        primary: {
            main: indigo[500],
        },
        background: {
            default: "rgb(241, 245, 249)",
        },
        text: {
            primary: grey[900],
            secondary: grey[600],
        },
        divider: grey[200],
    },
    backDrop: {
        background: "rgba(255, 255, 255, 0.1)",
    },
});

export default LightTheme;
