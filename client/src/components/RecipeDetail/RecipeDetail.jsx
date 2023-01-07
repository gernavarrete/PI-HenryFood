import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";

const RecipeDetail = (props) => {
  let params = props.match.params.id;
  let dispatch = useDispatch();
  let recipe = useSelector(state => state.recipeDetail);
  const {name, image, summary, healthScore, stepByStep} = recipe

  React.useEffect( () => {
    dispatch(actions.getRecipeDetail(params));

  },[params,dispatch]);
  return (
    <div>
      <h3>{name}</h3>
      <img src={image} alt={name}/>
      <h3>{summary}</h3>  
      <h3>{healthScore}</h3>
    </div>
  );
};


export default RecipeDetail;