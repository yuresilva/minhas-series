import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const NovaSerie = () => {
  const [name, setName] = useState("");
  const [sucess, setSucess] = useState(false);
  const onChange = evt => {
    setName(evt.target.value);
  };

  const save = () => {
    axios
      .post("/api/series", {
        name
      })
      .then(res => {
        setSucess(true);
      });
  };

  if (sucess === true) {
    return <Redirect to="/series" />;
  }
  return (
    <div className="container">
      <h1> Nova Série </h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            value={name}
            type="text"
            onChange={onChange}
            placeholder="nome da série"
            className="form-control"
            id="name"
          />
        </div>
        <button type="button" onClick={save} className="btn btn-primary">
          Salvar série
        </button>
      </form>
    </div>
  );
};

export default NovaSerie;
