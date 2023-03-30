import { FormEvent, useEffect, useState } from "react";
import { hideUpdateEntry, showAlert, useAppDispatch, useAppSelector, useUpdateEntryMutation } from "../../store";
import { IDialogBox } from "../../types";
import { validateEmail } from "../../utils";
import FormComponent from "../formComponent";

export default function UpdateForm({ open, setOpen }: IDialogBox) {
    const dispatch = useAppDispatch();
    const [updateEntry] = useUpdateEntryMutation();
    const ogValues = useAppSelector((state) => state.updateEntrySlice);
    const [formData, setFormData] = useState({
        name: ogValues.name,
        email: ogValues.email,
        phone: ogValues.phone,
        hobbies: ogValues.hobbies,
    });

    useEffect(() => {
        setFormData({
            name: ogValues.name,
            email: ogValues.email,
            phone: ogValues.phone,
            hobbies: ogValues.hobbies,
        });
    }, [ogValues, setFormData]);

    async function onEntryUpdate(e: FormEvent) {
        e.preventDefault();
        const { name, email, hobbies, phone } = formData;
        if (name === ogValues.name && email == ogValues.email && hobbies === ogValues.hobbies && phone === ogValues.phone) {
            dispatch(showAlert({ message: "No values are changed", open: true, severity: "warning" }));
            return;
        }
        if (!name || !email || !phone || !hobbies) {
            dispatch(showAlert({ message: "Please validate all the fields", open: true, severity: "warning" }));
            return;
        }

        if (!validateEmail(email)) {
            dispatch(showAlert({ message: "Please enter a valid email ID", open: true, severity: "warning" }));
            return;
        }
        try {
            const response = await updateEntry({ ...formData, id: ogValues.id }).unwrap();
            if (response.success) {
                dispatch(showAlert({ message: response.message, open: true, severity: "success" }));
                setOpen(false);
                dispatch(hideUpdateEntry());
                setFormData({ name: "", email: "", phone: "", hobbies: "" });
                setOpen(false);
            } else {
                dispatch(showAlert({ message: response.message, open: true, severity: "error" }));
            }
        } catch (err: any) {
            dispatch(showAlert({ message: err.data.message as string, open: true, severity: "error" }));
        }
    }

    return (
        <FormComponent
            formData={formData}
            formTitle="Update Entry"
            open={open}
            setFormData={setFormData}
            setOpen={setOpen}
            submitFunction={onEntryUpdate}
        />
    );
}
