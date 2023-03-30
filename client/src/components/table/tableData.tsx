import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { IconButton } from "@mui/material";
import { useAppDispatch, showUpdateEntry, useDeleteEntryMutation, showAlert } from "../../store";
import { IResponseEntry, IUpdateEntry } from "../../types";
import { DeleteIcon, EditIcon } from "../../assets";
import { Select, TCell, TRow } from "./styles";

export interface TableDataProps {
    page: number;
    rowsPerPage: number;
    idx: number;
    data: IResponseEntry;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setEntries: Dispatch<SetStateAction<IResponseEntry[]>>;
}

export default function TableData({ data, idx, page, rowsPerPage, setEntries, setOpen }: TableDataProps) {
    const dispatch = useAppDispatch();
    const [deleteEntry] = useDeleteEntryMutation();

    function createEntry(e: ChangeEvent<HTMLInputElement>, data: IResponseEntry) {
        if (e.target.checked) {
            setEntries((entries) => [...entries, data]);
        } else {
            setEntries((entries) => entries.filter((entry) => entry._id !== data._id));
        }
    }

    async function onUpdate(updateList: IUpdateEntry) {
        dispatch(showUpdateEntry(updateList));
        setOpen(true);
    }

    async function onDelete(id: string) {
        const confirmation = window.confirm("Are you sure you want to delete this entry");
        if (!confirmation) return;

        try {
            const response = await deleteEntry({ id }).unwrap();
            if (response.success) {
                dispatch(showAlert({ message: response.message, open: true, severity: "success" }));
            } else {
                dispatch(showAlert({ message: response.message, open: true, severity: "error" }));
            }
        } catch (err: any) {
            dispatch(showAlert({ message: (err.data.message as string) || "Internal Server Error", open: true, severity: "error" }));
        }
    }

    return (
        <TRow key={page * rowsPerPage + idx + 1}>
            <TCell sx={{ padding: 0 }}>
                <Select color="warning" title="Select" onChange={(e) => createEntry(e, data)} />
            </TCell>
            <TCell title="ID">{page * rowsPerPage + idx + 1}</TCell>
            <TCell title="Name">{data.name}</TCell>
            <TCell title="Phone">{data.phone}</TCell>
            <TCell title="Email">{data.email}</TCell>
            <TCell title="Hobbies">{data.hobbies}</TCell>
            <TCell title="Actions">
                <IconButton
                    aria-label="Edit Data"
                    title="Edit Data"
                    color="success"
                    onClick={() =>
                        onUpdate({
                            name: data.name,
                            phone: data.phone,
                            email: data.email,
                            hobbies: data.hobbies,
                            id: data._id,
                        })
                    }
                >
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="Delete Data" title="Delete Data" color="error" onClick={() => onDelete(data._id)}>
                    <DeleteIcon />
                </IconButton>
            </TCell>
        </TRow>
    );
}
