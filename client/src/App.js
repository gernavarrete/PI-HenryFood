import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import  NavBar  from './components/Nav/NavBar.jsx';
import Home from './components/Home/Home.jsx';
import CreateRecipe from './components/CreateRecipe/CreateRecipe.jsx';



function App() {
  return (
    <div className="App bg_image">
      <NavBar/>
      <Route exact path={'/home'} component={Home}/>
      <Route exact path={'/createRecipe'} component={CreateRecipe}/>
    </div>
  );
}

export default App;
