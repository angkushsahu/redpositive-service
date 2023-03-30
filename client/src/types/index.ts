import { AlertColor } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export interface IEntryValues {
    name: string;
    email: string;
    hobbies: string;
    phone: string;
}

export interface IResponseEntry extends IEntryValues {
    _id: string;
}

export interface IUpdateEntry extends IEntryValues {
    id: string;
}

export interface IDialogBox {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface IAlert {
    message: string;
    open: boolean;
    severity: AlertColor | undefined;
}

export interface IRequest {
    success: boolean;
    message: string;
}

export interface IId {
    id: string;
}
