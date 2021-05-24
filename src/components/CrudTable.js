import React from "react";
import CrudTableRow from "./CrudTableRow";

const CrudTable = ({ data, setDataToEdit, deleteData, toComplete }) => {
    return (
        <div className="style-table">
            <h3>Tabla de Datos</h3>
            <table>
                <thead>
                    <tr>
                        <th>Estudiante</th>
                        <th>Tarea</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((el) => (
                            <CrudTableRow
                                key={el.id}
                                el={el}
                                setDataToEdit={setDataToEdit}
                                deleteData={deleteData}
                                toComplete={toComplete}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Sin datos</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CrudTable;
