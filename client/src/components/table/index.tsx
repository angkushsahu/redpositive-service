import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { Paper, Table, TableContainer, TablePagination } from "@mui/material";
import { TBody, TCell, THead, TRow } from "./styles";
import { useGetAllEntriesQuery } from "../../store";
import { IDialogBox, IResponseEntry } from "../../types";
import Loading from "../loading";
import NoEntries from "../noEntries";
import TableData from "./tableData";

export interface TableComponentProps extends IDialogBox {
    setEntries: Dispatch<SetStateAction<IResponseEntry[]>>;
}

export default function TableComponent({ setOpen, setEntries }: TableComponentProps) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
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
                        {data?.entries.length ? (
                            data?.entries.map((data, idx) => (
                                <TableData data={data} idx={idx} page={page} rowsPerPage={rowsPerPage} setEntries={setEntries} setOpen={setOpen} />
                            ))
                        ) : (
                            <NoEntries />
                        )}
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
