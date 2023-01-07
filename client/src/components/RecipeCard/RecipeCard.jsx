import "./RecipeCard.css";
import React from "react";
import { Link } from "react-router-dom";
import * as actions from "./../../redux/actions/index"
import { useDispatch } from "react-redux";

const RecipeCard = (props) => {
  let dispatch = useDispatch();
  
  return (
    <div className="cardRecipe">
      {/* <button onClick={() => dispatch(actions.deleteRecipe(props.id))}>X</button> */}
      <Link to={`/recipe/${props.id}`}><h3>{props.name}</h3></Link>
      <img src={props.image} alt={props.name}/>
      <p>{props.healthScore}</p>
    </div>
  );
};

export default RecipeCard;