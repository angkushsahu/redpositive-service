import { CssBaseline, ThemeProvider } from "@mui/material";
import { Home } from "./components";
import theme from "./theming";

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Home />
        </ThemeProvider>
    );
}
