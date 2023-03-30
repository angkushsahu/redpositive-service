import { Button, Dialog, FormControl } from "@mui/material";
import { styled } from "@mui/material/styles";

export const DialogBox = styled(Dialog)(() => ({
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    "& > .MuiDialog-container > .MuiDialog-paper": {
        margin: "0.75rem",
        maxWidth: "30rem",
        width: "100%",
    },
}));

export const InputContainer = styled(FormControl)(() => ({
    width: "100%",
    marginTop: "1rem",
}));

export const AddEntryButton = styled(Button)(() => ({
    marginTop: "1.5rem",
    width: "100%",
}));
