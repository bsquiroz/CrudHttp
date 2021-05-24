import React from "react";

const CrudTableRow = ({ el, setDataToEdit, deleteData, toComplete }) => {
    let { task, student, isCompleted, id } = el;

    return (
        <tr>
            <td>{student}</td>
            <td>{task}</td>
            <td onClick={() => toComplete(el)}>
                {isCompleted ? (
                    <p className="completed">Terminado</p>
                ) : (
                    <p className="noCompleted">Sin terminar</p>
                )}
            </td>
            <td>
                <button
                    className="big-button"
                    onClick={() => setDataToEdit(el)}
                >
                    Editar
                </button>
                <button className="big-button" onClick={() => deleteData(id)}>
                    Eliminar
                </button>
            </td>
        </tr>
    );
};

export default CrudTableRow;
