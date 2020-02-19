import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";

const Generos = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/api/genres").then(res => {
      setData(res.data.data);
    });
  }, []);

  const deleteGenero = id => {
    axios.delete("/api/genres/" + id).then(res => {
      const filtrado = data.filter(item => item.id !== id);
      setData(filtrado);
    });
  };

  const renderizaLinha = record => {
    return (
      <tr key={record.id}>
        <th scope="row">{record.id}</th>
        <td>{record.name}</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteGenero(record.id)}
          >
            Remover
          </button>
          <Link className="btn btn-warning" to={"/generos/" + record.id}>
            Editar
          </Link>
        </td>
      </tr>
    );
  };
  if (data.length === 0) {
    return (
      <div className="container">
        <h1>Genêros</h1>
        <Link className="btn btn-primary" to="/generos/novo">
          Novo genêro
        </Link>
        <div className="alert alert-warning" role="alert">
          Você não possui generos criados
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Genêros</h1>
      <Link className="btn btn-primary" to="/generos/novo">
        Novo genêro
      </Link>
      <Table className="table" dark>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{data.map(renderizaLinha)}</tbody>
      </Table>
    </div>
  );
};

export default Generos;
