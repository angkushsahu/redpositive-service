import { Box, Button, Fab } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MainBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    minHeight: "100vh",
}));

export const AddIcon = styled(Fab)(({ theme }) => ({
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    [theme.breakpoints.down("sm")]: {
        bottom: "1rem",
        right: "1rem",
    },
}));

export const SendEmailButton = styled(Button)(() => ({
    display: "block",
    margin: "1.5rem auto 0",
    maxWidth: "20rem",
    width: "100%",
}));
