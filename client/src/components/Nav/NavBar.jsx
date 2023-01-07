import React from "react";
import { NavLink } from "react-router-dom";
import './NavBar.css';


export default function NavBar() {
    return (
      <div className="nav">
        <NavLink to={'/home'} className="btn-home"><h1>The House of Recipes</h1></NavLink>
      </div>
    );
}