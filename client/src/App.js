import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe.jsx";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail";
import axios from "axios";

const { REACT_APP_BACK_URL } = process.env;

axios.defaults.baseURL = `${REACT_APP_BACK_URL}`;

function App() {
  return (
    <div className="App bg_image">
      <Switch>
        <Route exact path={"/"} component={LandingPage} />
        <Route exact path={"/home"} component={Home} />
        <Route exact path={"/recipes/:idrecipe"} component={RecipeDetail} />
        <Route exact path={"/createrecipe"} component={CreateRecipe} />
        <Route exact path="*" component={LandingPage} />
      </Switch>
    </div>
  );
}

export default App;
