import React , { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as actions from "../../redux/actions/index";
import Loader from "../Loader/Loader";
import './RecipeDetail.css'

const RecipeDetail = () => {
  let { idrecipe } = useParams();
  let history = useHistory();
  let dispatch = useDispatch();
  let recipe = useSelector(state => state.recipeDetail)
  const [ loading, setLoading ]= useState(false);

  if(recipe.msg) alert(recipe.msg)
  const {name, image, summary, healthScore, stepByStep, diets} = recipe;
  
  const handleClick = () => {
    history.push('/home');
  }
  
  useEffect( () => {
    setLoading(true)
    dispatch(actions.getRecipeDetail(idrecipe))
    .then((data) => { setLoading(false); return data});
    
    return () => dispatch(actions.getRecipeDetail())
  },[idrecipe,dispatch]);

  return (
    <div className="container-main-detail">
      <div className="container-button-home">

          <button className="button-home" type="button" onClick={handleClick}>
              Go home
          </button>

      </div>
      {loading ? <Loader/> : 
      <fr>
      <h1>{name}</h1>

      
      <div className="container-img-summary">

      <div className="recipe-detail-img">
        <img src={image} alt={name}/>
        <h3 className="container-healthscore">healthScore: {healthScore}</h3>
      </div>
      <div className="recipe-detail-summary"><p>{summary}</p></div>

      </div>
      <h2 >STEPS</h2>
      <div className="container-steps">
      
      {stepByStep && stepByStep.map(({ numberStep, description}) => {
        return (
        <div className="container-numberstep-description">
        <div className="container-numberstep">{numberStep} -</div>
        <div className="container-description">{description}</div>
        </div>)
      
      })}
      
      </div>
      <h2>DIETS</h2>
      <div className="container-diets">
      {diets && diets.map(diet => {
        return (<div className="container-diet">{diet.toUpperCase()}</div>)
      
      })} 
      </div></fr>}
    </div>
  );
};


export default RecipeDetail;