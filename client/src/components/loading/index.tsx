import { CircularProgress } from "@mui/material";
import { LoadingPage } from "./styles";

export default function Loading() {
    return (
        <LoadingPage>
            <CircularProgress style={{ width: "5rem", height: "5rem" }} />
        </LoadingPage>
    );
}
