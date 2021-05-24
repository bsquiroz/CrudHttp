import React, { useState, useEffect } from "react";
import Alert2 from "sweetalert2";

const initailForm = {
    student: "",
    task: "",
    id: null,
};

const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
    const [form, setForm] = useState(initailForm);

    useEffect(() => {
        if (dataToEdit) {
            setForm(dataToEdit);
        } else {
            setForm(initailForm);
        }
    }, [dataToEdit]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.student || !form.task) {
            Alert2.fire("🤒", "Datos incompletos", "error");
            return;
        }

        if (form.id === null) {
            form.isCompleted = false;
            createData(form);
        } else {
            updateData(form);
        }

        handleReset();
    };

    const handleReset = (e) => {
        setForm(initailForm);
        setDataToEdit(null);
    };

    return (
        <div className="style-form">
            <h3>{dataToEdit ? "Editar" : "Agregar"}</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="student"
                    placeholder="Nombre estudiante"
                    onChange={handleChange}
                    value={form.student}
                />
                <input
                    type="text"
                    name="task"
                    placeholder="Descripciín de la tarea"
                    onChange={handleChange}
                    value={form.task}
                />
                <button type="submit" className="big-button">
                    Enviar
                </button>
                <button
                    type="reset"
                    onClick={handleReset}
                    className="big-button"
                >
                    Limpiar
                </button>
            </form>
        </div>
    );
};

export default CrudForm;
