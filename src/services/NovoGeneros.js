import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const NovoGeneros = () => {
  const [name, setName] = useState("");
  const [sucess, setSucess] = useState(false);
  const onChange = evt => {
    setName(evt.target.value);
  };

  const save = () => {
    axios
      .post("/api/genres", {
        name
      })
      .then(res => {
        setSucess(true);
      });
  };

  if (sucess === true) {
    return <Redirect to="/generos" />;
  }
  return (
    <div className="container">
      <h1> Novo Genêros </h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            value={name}
            type="text"
            onChange={onChange}
            placeholder="nome do genêro"
            className="form-control"
            id="name"
          />
        </div>
        <button type="button" onClick={save} className="btn btn-primary">
          Salvar genêro
        </button>
      </form>
    </div>
  );
};

export default NovoGeneros;
