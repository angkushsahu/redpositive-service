import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAlert } from "../../types";

const initialState: IAlert = {
    message: "",
    open: false,
    severity: undefined,
};

const alertSlice = createSlice({
    initialState,
    name: "alert",
    reducers: {
        showAlert: (state, action: PayloadAction<IAlert | undefined>) => {
            state.message = action.payload?.message || "Some error occurred";
            state.open = action.payload?.open || false;
            state.severity = action.payload?.severity || undefined;
        },
        hideAlert: (state) => {
            state.message = "";
            state.open = false;
            state.severity = undefined;
        },
    },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
