import React from "react";
import { NavLink } from "react-router-dom";
import './LandingPage.css';


export default function NavBar() {

    return (
      <div className="nav">
        <div className="divLandingPage">
        <h2 className="h2LandingPage">Welcome to &nbsp;</h2>
        <NavLink to={'/home'} className="btn-home"><h1>The House of Recipes</h1></NavLink>
        </div>
        <div className="divSpanLandingPage">
          
          <span className="spanLandingPage">A space where you can consult and create recipes...</span>
          <span className="spanLandingPage">I hope you like it!!</span>

        </div>
      </div>
    );
}