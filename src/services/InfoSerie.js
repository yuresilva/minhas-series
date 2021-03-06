import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import { Badge } from "reactstrap";

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({
    name: "",
    comments: ""
  });

  const [sucess, setSucess] = useState(false);
  const [mode, setMode] = useState("INFO");
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState("");

  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("/api/series/" + match.params.id).then(res => {
      setData(res.data);
      setForm(res.data);
    });
  }, [match.params, match.params.id]);

  useEffect(() => {
    axios.get("/api/genres").then(res => {
      setGenres(res.data.data);
      const genres = res.data.data;
      const encontrado = genres.find(value => data.genre === value.name);
      if (encontrado) {
        setGenreId(encontrado.id);
      }
    });
  }, [data]);

  // custom header

  const masterHeader = {
    height: "50vh",
    minHeight: "500px",
    backgroundImage: `url("${data.background}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  };

  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    });
  };

  const onChangeGenre = evt => {
    setGenreId(evt.target.value);
  };

  const seleciona = value => () => {
    setForm({
      ...form,
      status: value
    });
  };

  const save = () => {
    axios
      .put("/api/series/" + match.params.id, {
        ...form,
        genre_id: genreId
      })
      .then(res => {
        setSucess(true);
      });
  };

  if (sucess === true) {
    return <Redirect to="/series" />;
  }

  return (
    <div>
      <header style={masterHeader}>
        <div className="h-100  " style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="h-100 container">
            <div className="row h-100 align-items-center">
              <div className="col-3">
                <img
                  className="img-fluid img-thumbnail"
                  alt={data.name}
                  src={data.poster}
                />
              </div>
              <div className="col-8">
                <h1 className="font-weight-light text-white"> {data.name}</h1>
                <div className="lead text-white">
                  {data.status === "ASSISTIDO" && (
                    <Badge color="success">Assistido</Badge>
                  )}
                  {data.status === "PARA_ASSISTIR" && (
                    <Badge color="warning">Para assistir</Badge>
                  )}
                  Gênero: {data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <button className="btn btn-primary" onClick={() => setMode("EDIT")}>
          Editar
        </button>
      </div>
      {mode === "EDIT" && (
        <div className="container">
          <h1> Editar Série </h1>
          <p>{JSON.stringify(form.name)}</p>

          <button className="btn btn-primary" onClick={() => setMode("INFO")}>
            Cancelar edição
          </button>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                onChange={onChange("name")}
                placeholder="Nome da série"
                className="form-control"
                value={form.name}
                id="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="comments">Comentarios</label>
              <input
                value={form.comments}
                type="text"
                onChange={onChange("comments")}
                placeholder="Comentar série"
                className="form-control"
                id="comments"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Gênero</label>
              <select
                className="form-control"
                onChange={onChangeGenre}
                value={genreId}
              >
                {genres.map(genre => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="status"
                id="assistido"
                value="ASSISTIDO"
                onChange={seleciona("ASSISTIDO")}
                checked={form.status === "ASSISTIDO"}
              />
              <label className="form-check-label" htmlFor="assistido">
                Assistido
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="status"
                id="paraAssistir"
                value="PARA_ASSISTIR"
                onChange={seleciona("PARA_ASSISTIR")}
                checked={form.status === "PARA_ASSISTIR"}
              />
              <label className="form-check-label" htmlFor="paraAssistir">
                Para assistir
              </label>
            </div>
            <button type="button" onClick={save} className="btn btn-primary">
              Salvar série
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default InfoSerie;
