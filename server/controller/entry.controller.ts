import { NextFunction, Request, Response } from "express";
import { Workbook } from "exceljs";
import { resolve } from "path";
import { writeFile } from "fs";
import { catchAsyncErrors } from "../middlewares";
import { Entry } from "../models";
import { IEntry } from "../types";
import { ErrorHandler, isNumericString, sendEmail, validateEmail } from "../utils";

export const getEntry = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const entry = await Entry.findById(id);
    if (!entry) {
        return next(new ErrorHandler("Entry not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Entry found successfully",
        entry,
    });
});

export const getAllEntries = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const totalEntries = await Entry.countDocuments();
    if (!totalEntries) {
        return next(new ErrorHandler("No entries found", 404));
    }

    const { page, rowsPerPage } = req.query;
    const currentPage = Number(page) || 1;
    const skip = Number(rowsPerPage) * (currentPage - 1);
    if (skip >= totalEntries) {
        return next(new ErrorHandler("Page does not exist", 400));
    }

    const entries = await Entry.find().skip(skip).limit(Number(rowsPerPage));

    res.status(200).json({
        success: true,
        message: "Entries found successfully",
        totalEntries,
        entries,
    });
});

export const createEntry = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { email, hobbies, name, phone }: IEntry = req.body;
    if (!email || !hobbies || !name || !phone) {
        return next(new ErrorHandler("Please enter all the required fields", 400));
    }
    if (!validateEmail(email)) {
        return next(new ErrorHandler("Please enter a valid email ID", 400));
    }
    if (!isNumericString(phone)) {
        return next(new ErrorHandler("Please enter a valid phone number", 400));
    }

    const entry = await Entry.create({ email, hobbies, name, phone });
    if (!entry) {
        return next(new ErrorHandler("Unable to create entry", 500));
    }

    res.status(201).json({
        success: true,
        message: "Entry created successfully",
        entry,
    });
});

export const updateEntry = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { email, phone }: { email: string; phone: string } = req.body;
    if (email && !validateEmail(email)) {
        return next(new ErrorHandler("Please enter a valid email ID", 400));
    }
    if (phone && !isNumericString(phone)) {
        return next(new ErrorHandler("Please enter a valid phone number", 400));
    }

    const entry = await Entry.findByIdAndUpdate(id, req.body, { new: true });
    if (!entry) {
        return next(new ErrorHandler("Entry not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Entry updated successfully",
        entry,
    });
});

export const deleteEntry = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const entry = await Entry.findByIdAndDelete(id);
    if (!entry) {
        return next(new ErrorHandler("Entry not found", 404));
    }

    res.status(200).json({ success: true, message: "Entry deleted successfully", id });
});

export const sendUsersThroughEmail = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { entries }: { entries: IEntry[] } = req.body;
    if (!entries.length) {
        return next(new ErrorHandler("Select at least one user", 400));
    }

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Entries");
    worksheet.columns = [
        { header: "ID", key: "id", width: 5 },
        { header: "Name", key: "name", width: 30 },
        { header: "E-mail", key: "email", width: 40 },
        { header: "Phone", key: "phone", width: 20 },
        { header: "Hobbies", key: "hobbies", width: 40 },
    ];
    entries.forEach((entry, idx) => {
        const newEntry: typeof entry & { id: number } = { ...entry, id: idx + 1 };
        worksheet.addRow(newEntry);
    });

    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
    });
    const pathToFile = resolve(__dirname, "../excel/entries.xlsx");
    writeFile(pathToFile, "", function (error) {
        if (error) {
            return next(new ErrorHandler("Unable to clear previous file", 500));
        }
    });
    await workbook.xlsx.writeFile(pathToFile);

    const { message, success } = await sendEmail();
    if (!success) {
        return next(new ErrorHandler(message, 500));
    }
    res.status(200).json({ success: true, message });
});
