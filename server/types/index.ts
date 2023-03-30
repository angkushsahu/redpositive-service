import { Document } from "mongoose";

export interface IEntry {
    name: string;
    email: string;
    hobbies: string;
    phone: string;
}

export interface EntryDoc extends IEntry, Document {}
