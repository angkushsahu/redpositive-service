import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { IconButton, Paper, Table, TableContainer, TablePagination } from "@mui/material";
import { DeleteIcon, EditIcon } from "../../assets";
import { Select, TBody, TCell, THead, TRow } from "./styles";
import { useAppDispatch, showUpdateEntry, useGetAllEntriesQuery, useDeleteEntryMutation, showAlert } from "../../store";
import { IDialogBox, IResponseEntry, IUpdateEntry } from "../../types";
import Loading from "../loading";

export interface TableComponentProps extends IDialogBox {
    setEntries: Dispatch<SetStateAction<IResponseEntry[]>>;
}

export default function TableComponent({ setOpen, setEntries }: TableComponentProps) {
    const dispatch = useAppDispatch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [deleteEntry] = useDeleteEntryMutation();
    const { isLoading, data, refetch } = useGetAllEntriesQuery({ query: `?rowsPerPage=${rowsPerPage}&page=${page + 1}` });

    useEffect(() => {
        refetch();
    }, [rowsPerPage, page]);

    async function handleChangePage(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) {
        if (page <= 0 && newPage <= page) return;
        setPage(newPage);
    }

    async function handleChangeRowsPerPage(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    }

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

    if (isLoading) {
        return <Loading />;
    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <THead>
                        <TRow>
                            <TCell>Select</TCell>
                            <TCell>ID</TCell>
                            <TCell>Name</TCell>
                            <TCell>Phone</TCell>
                            <TCell>Email</TCell>
                            <TCell>Hobbies</TCell>
                            <TCell>Actions</TCell>
                        </TRow>
                    </THead>
                    <TBody>
                        {data?.entries.map((data, idx) => {
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
                        })}
                    </TBody>
                </Table>
            </TableContainer>
            <TablePagination
                sx={{
                    "& > .MuiToolbar-root.MuiToolbar-gutters": {
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "center",
                    },
                }}
                component="div"
                rowsPerPageOptions={[5, 10, 15]}
                count={data?.totalEntries || 1}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}
