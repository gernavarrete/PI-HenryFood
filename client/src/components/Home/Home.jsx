import React, { useEffect } from "react";
import RecipeCard from '../RecipeCard/RecipeCard.jsx';
import * as actions from "./../../redux/actions/index"
import {useDispatch, useSelector} from "react-redux";


export default function Home() {
    let dispatch = useDispatch();
    let recipes = useSelector(state => state.recipes);

    useEffect(() =>{
     dispatch(actions.getRecipes());
    },[])

    return (
        <div className="container-createRecipe">
            {recipes && recipes.map((recipe) =>
                (<div key={recipe.id}>
                <RecipeCard
                id={recipe.id}
                name={recipe.name}
                healthScore={recipe.healthScore}
                image={recipe.image}/>
                </div>))}
        </div>
    );
}