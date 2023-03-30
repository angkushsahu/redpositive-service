import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { DialogContent, DialogContentText, DialogTitle, InputLabel, FilledInput } from "@mui/material";
import { AddEntryButton, DialogBox, InputContainer } from "./styles";
import { IDialogBox, IEntryValues } from "../../types";

export interface FormComponentProps extends IDialogBox {
    formTitle: string;
    formData: IEntryValues;
    setFormData: Dispatch<SetStateAction<IEntryValues>>;
    submitFunction?: (e: FormEvent) => Promise<void>;
}

export default function FormComponent({ open, setOpen, formData, setFormData, submitFunction, formTitle }: FormComponentProps) {
    async function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setFormData((ogData) => ({ ...ogData, [name]: value }));
    }

    return (
        <DialogBox open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{formTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>All fields are mandatory</DialogContentText>
                <form onSubmit={submitFunction}>
                    <InputContainer variant="filled">
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <FilledInput
                            type="text"
                            id="name"
                            name="name"
                            placeholder="e.g., John Doe"
                            title="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </InputContainer>
                    <InputContainer variant="filled">
                        <InputLabel htmlFor="phone">Contact Number</InputLabel>
                        <FilledInput
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="e.g., +91 98765 43201"
                            title="Enter your contact number"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </InputContainer>
                    <InputContainer variant="filled">
                        <InputLabel htmlFor="email">E-mail</InputLabel>
                        <FilledInput
                            type="email"
                            id="email"
                            name="email"
                            placeholder="e.g., johndoe@gmail.com"
                            title="Enter your e-mail"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </InputContainer>
                    <InputContainer variant="filled">
                        <InputLabel htmlFor="hobbies">Hobbies (comma separated)</InputLabel>
                        <FilledInput
                            type="text"
                            id="hobbies"
                            name="hobbies"
                            placeholder="e.g., cycling, coding"
                            title="Enter your hobbies"
                            value={formData.hobbies}
                            onChange={handleChange}
                        />
                    </InputContainer>
                    <AddEntryButton type="submit" title="Create New Entry" variant="contained">
                        Create New Entry
                    </AddEntryButton>
                </form>
            </DialogContent>
        </DialogBox>
    );
}
