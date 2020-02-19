import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const EditarGenero = ({ match }) => {
  const [name, setName] = useState("");
  const [sucess, setSucess] = useState(false);

  useEffect(() => {
    axios.get("/api/genres/" + match.params.id).then(res => {
      setName(res.data.name);
    });
  }, [match.params.id]);

  const onChange = evt => {
    setName(evt.target.value);
  };

  const save = () => {
    axios
      .put("/api/genres/" + match.params.id, {
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
      <h1> Editar Genêros </h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            value={name}
            type="text"
            onChange={onChange}
            className="form-control"
            id="name"
          />
        </div>
        <button type="button" onClick={save} className="btn btn-primary">
          Editar genêro
        </button>
      </form>
    </div>
  );
};

export default EditarGenero;
