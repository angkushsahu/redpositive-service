import { MouseEvent, useState } from "react";
import { AddDataForm, Table, UpdateDataForm } from "..";
import { AddIcon as Icon } from "../../assets";
import { showAlert, useAppDispatch, useSendEntryViaEmailMutation } from "../../store";
import { IResponseEntry } from "../../types";
import AlertComponent from "../alert";
import Loading from "../loading";
import { MainBox, AddIcon, SendEmailButton } from "./styles";

export default function Home() {
    const dispatch = useAppDispatch();
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [entries, setEntries] = useState<IResponseEntry[]>([]);
    const [sendEntry, { isLoading }] = useSendEntryViaEmailMutation();

    async function onEmail(e: MouseEvent<HTMLButtonElement>) {
        try {
            const response = await sendEntry({ entries }).unwrap();
            if (response.success) {
                dispatch(showAlert({ message: response.message, open: true, severity: "success" }));
                setEntries([]);
            } else {
                dispatch(showAlert({ message: response.message, open: true, severity: "error" }));
            }
        } catch (err: any) {
            dispatch(showAlert({ message: (err.data.message as string) || "Internal Server Error", open: true, severity: "error" }));
        }
    }

    if (isLoading) {
        return <Loading />;
    }
    return (
        <MainBox component="main">
            <AddDataForm open={openAddDialog} setOpen={setOpenAddDialog} />
            <UpdateDataForm open={openUpdateDialog} setOpen={setOpenUpdateDialog} />
            <Table open={openUpdateDialog} setOpen={setOpenUpdateDialog} setEntries={setEntries} />
            {entries.length ? (
                <SendEmailButton type="button" variant="contained" onClick={onEmail}>
                    Send E-mail
                </SendEmailButton>
            ) : null}
            <AddIcon color="info" size="medium" title="Add New Entry" onClick={() => setOpenAddDialog(true)}>
                <Icon />
            </AddIcon>
            <AlertComponent />
        </MainBox>
    );
}
