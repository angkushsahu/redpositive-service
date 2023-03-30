import { FormEvent, useState } from "react";
import { showAlert, useAppDispatch, useCreateEntryMutation } from "../../store";
import { IDialogBox } from "../../types";
import { validateEmail } from "../../utils";
import FormComponent from "../formComponent";

export default function AddForm({ open, setOpen }: IDialogBox) {
    const dispatch = useAppDispatch();
    const [createEntry] = useCreateEntryMutation();
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", hobbies: "" });

    async function onNewEntry(e: FormEvent) {
        e.preventDefault();
        const { name, email, hobbies, phone } = formData;
        if (!name || !email || !phone || !hobbies) {
            dispatch(showAlert({ message: "Please validate all the fields", open: true, severity: "warning" }));
            return;
        }

        if (!validateEmail(email)) {
            dispatch(showAlert({ message: "Please enter a valid email ID", open: true, severity: "warning" }));
            return;
        }
        try {
            const response = await createEntry(formData).unwrap();
            if (response.success) {
                dispatch(showAlert({ message: response.message, open: true, severity: "success" }));
                setOpen(false);
                setFormData({ name: "", email: "", phone: "", hobbies: "" });
            } else {
                dispatch(showAlert({ message: response.message, open: true, severity: "error" }));
            }
        } catch (err: any) {
            dispatch(showAlert({ message: (err.data.message as string) || "Internal Server Error", open: true, severity: "error" }));
        }
    }

    return (
        <FormComponent
            formData={formData}
            formTitle="Add New Entry"
            open={open}
            setFormData={setFormData}
            setOpen={setOpen}
            submitFunction={onNewEntry}
        />
    );
}
