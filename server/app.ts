import express from "express";
const app = express();

import { Locals } from "./express";
app.use(function (req, res, next) {
    res.typedLocals = res.locals as Locals;
    next();
});

const limit = "1000mb";
app.use(express.urlencoded({ extended: true, limit }));
app.use(express.json({ limit }));

import cors from "cors";
app.use(cors({ origin: true, credentials: true }));

import { entryRouter } from "./routes";
app.use("/api/entry", entryRouter);

// ------------------ production deployment ------------------
import { join } from "path";
if (process.env.NODE_ENV === "production") {
    app.use(express.static(join(__dirname, "../client", "dist")));
    app.get("*", (req, res) => {
        res.sendFile(join(__dirname, "../client", "dist", "index.html"));
    });
}
// ------------------ production deployment ------------------

import { error } from "./middlewares";
app.use(error.invalidUrl);
app.use(error.errors);

export default app;
