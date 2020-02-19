import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "./components/base/Header";
import Generos from "./generos";
import NovoGeneros from "./services/NovoGeneros";
import EditarGenero from "./services/EditarGenero";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Home = () => {
  return <h1>Home</h1>;
};

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("/api").then(res => {
      setData(res.data);
    });
  }, []);
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/generos" exact component={Generos} />
          <Route path="/generos/novo" exact component={NovoGeneros} />
          <Route path="/generos/:id" exact component={EditarGenero} />
        </Switch>
        <p>{JSON.stringify(data)}</p>
      </div>
    </Router>
  );
}

export default App;
