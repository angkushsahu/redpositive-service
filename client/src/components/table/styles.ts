import { Checkbox, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";

export const TRow = styled(TableRow)(() => ({
    borderBlockEndColor: "transparent",
    borderBlockStartColor: "transparent",
}));

export const TCell = styled(TableCell)(() => ({
    padding: "0.5rem 1rem",
    width: "fit-content",
    border: 0,
    whiteSpace: "nowrap",
}));

export const THead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.common.black,
    "& .MuiTableCell-root.MuiTableCell-head": {
        fontWeight: "600",
        fontSize: "1rem",
        padding: "0.6rem",
    },
}));

export const TBody = styled(TableBody)(({ theme }) => ({
    "& .MuiTableRow-root": {
        "&:nth-of-type(2n + 1)": {
            background: theme.palette.secondary.main,
        },
        "&:nth-of-type(2n)": {
            background: theme.palette.secondary.dark,
        },
    },
}));

export const Select = styled(Checkbox)(({ theme }) => ({
    color: theme.palette.grey["500"],
}));
