import "./RecipeCard.css";
import React from "react";
import { NavLink } from "react-router-dom";
import * as actions from "./../../redux/actions/index"
import { useDispatch ,useSelector } from "react-redux";

const RecipeCard = (props) => {
  let dispatch = useDispatch();
  const {id, name, healthScore , image, diets} = props
  
  
  
  return (
    <div className="cardRecipe">
      <div className="pHealthScore">HealthScore: {healthScore} pts</div>
      <NavLink to={`/recipes/${id}`}><img src={image} alt={name} className="img"/></NavLink>
      <div className="container-name">{name}</div>
      <div className="dietsList">
      {diets && diets.map((diet) => (
        <button className='divDietIcon'>{diet.toUpperCase()}</button>))
      }
      </div>
      
    </div>
  );
};

export default RecipeCard;