import { TableCell, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";

export const TRow = TableRow;

export const Heading = styled(TableCell)(() => ({
    padding: "2rem",
    textAlign: "center",
    width: "100%",
    fontSize: "2rem",
}));
