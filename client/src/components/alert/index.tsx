import { Alert, Snackbar } from "@mui/material";
import { hideAlert, useAppDispatch, useAppSelector } from "../../store";

export default function AlertComponent() {
    const snackbar = useAppSelector((state) => state.alertSlice);
    const dispatch = useAppDispatch();

    function handleSnackbarClose() {
        dispatch(hideAlert());
    }

    return (
        <Snackbar anchorOrigin={{ horizontal: "center", vertical: "top" }} open={snackbar.open} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
                {snackbar.message}
            </Alert>
        </Snackbar>
    );
}
