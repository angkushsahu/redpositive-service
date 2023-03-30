import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUpdateEntry } from "../../types";

const initialState: IUpdateEntry = {
    email: "",
    hobbies: "",
    name: "",
    phone: "",
    id: "",
};

const updateEntrySlice = createSlice({
    initialState,
    name: "updateEntry",
    reducers: {
        showUpdateEntry: (state, action: PayloadAction<IUpdateEntry | undefined>) => {
            state.email = action.payload?.email || "";
            state.hobbies = action.payload?.hobbies || "";
            state.name = action.payload?.name || "";
            state.phone = action.payload?.phone || "";
            state.id = action.payload?.id || "";
        },
        hideUpdateEntry: (state) => {
            state.email = "";
            state.hobbies = "";
            state.name = "";
            state.phone = "";
            state.id = "";
        },
    },
});

export const { hideUpdateEntry, showUpdateEntry } = updateEntrySlice.actions;
export default updateEntrySlice.reducer;
