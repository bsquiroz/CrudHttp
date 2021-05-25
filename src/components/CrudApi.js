import React, { useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import Loader from "./Loader";
import Message from "./Message";
import Alert2 from "sweetalert2";

const CrudApi = () => {
    const [db, setDb] = useState(null);
    const [dataToEdit, setDataToEdit] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    let api = helpHttp();
    const url = "https://todos-go.herokuapp.com/api/todos";

    useEffect(() => {
        setLoading(true);
        helpHttp()
            .get(url)
            .then((res) => {
                if (!res.err) {
                    setDb(res.todos);
                    setError(null);
                } else {
                    setDb(null);
                    setError(res);
                }
                setLoading(false);
            });
    }, [url]);

    const createData = (data) => {
        let options = {
            body: data,
            headers: { "content-type": "application/json" },
        };

        api.post(url, options).then((res) => {
            if (!res.err) {
                setDb([res, ...db]);
                Alert2.fire(
                    "Una tarea mas 😄",
                    "La tarea se agrego correctamente",
                    "success"
                );
            } else {
                setError(res);
            }
        });
    };

    const toComplete = (data) => {
        let endpoint = `${url}/${data.id}`;
        data.isCompleted = !data.isCompleted;
        let options = {
            body: data,
            headers: { "content-type": "application/json" },
        };
        api.put(endpoint, options).then((res) => {
            if (!res.err) {
                let newData = db.map((el) => (el.id === res.id ? res : el));
                setDb(newData);
            } else {
                setError(res);
            }
        });
    };

    const updateData = (data) => {
        console.log(data);
        let endpoint = `${url}/${data.id}`;
        let options = {
            body: data,
            headers: { "content-type": "application/json" },
        };
        api.put(endpoint, options).then((res) => {
            if (!res.err) {
                let newData = db.map((el) => (el.id === res.id ? res : el));
                setDb(newData);
                Alert2.fire(
                    "😁",
                    "La tarea se modifico correctamente",
                    "success"
                );
            } else {
                setError(res);
            }
        });
    };

    const deleteData = async (id) => {
        let isDelete = false;

        await Alert2.fire({
            title: `¿Deseas eliminar la tarea con el id ${id}? 😔`,
            showCancelButton: true,
            confirmButtonText: `Eliminar`,
        }).then((result) => {
            if (result.isConfirmed) {
                Alert2.fire("Eliminado correctamente", "", "success").then(
                    (isDelete = true)
                );
            }
        });

        if (isDelete) {
            let endpoint = `${url}/${id}`;
            let options = {
                headers: { "content-type": "application/json" },
            };
            api.del(endpoint, options).then((res) => {
                if (!res.err) {
                    let newData = db.filter((el) => el.id !== id);
                    setDb(newData);
                } else {
                    setError(res);
                }
            });
        } else {
            return;
        }
    };

    return (
        <div>
            <h2>CRUD API</h2>
            <article className="grid-1-2">
                <CrudForm
                    createData={createData}
                    updateData={updateData}
                    dataToEdit={dataToEdit}
                    setDataToEdit={setDataToEdit}
                />
                {loading && <Loader />}
                {error && (
                    <Message
                        msg={`Error ${error.status}: ${error.statusText}`}
                        bgColor="#dc3545"
                    />
                )}
                {db && (
                    <CrudTable
                        data={db}
                        setDataToEdit={setDataToEdit}
                        deleteData={deleteData}
                        toComplete={toComplete}
                    />
                )}
            </article>
        </div>
    );
};

export default CrudApi;
