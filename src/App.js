import React from "react";

import Header from "./components/base/Header";
import Generos from "./Generos";
import Series from "./Series";
import NovoGeneros from "./services/NovoGeneros";
import EditarGenero from "./services/EditarGenero";
import NovaSerie from "./services/NovaSerie";
import InfoSerie from "./services/InfoSerie";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Home = () => {
  return <h1>Home</h1>;
};

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/generos" exact component={Generos} />
          <Route path="/generos/novo" exact component={NovoGeneros} />
          <Route path="/generos/:id" exact component={EditarGenero} />
          <Route path="/series" exact component={Series} />
          <Route path="/series/novo" exact component={NovaSerie} />
          <Route path="/series/:id" exact component={InfoSerie} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
