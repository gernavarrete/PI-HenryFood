import React, { useState }from "react";
import * as actions from "./../../redux/actions/index"
import { useDispatch } from "react-redux";
import RecipeCard from '../RecipeDetail/RecipeDetail.jsx';

const CreateRecipe = () => {
  const [input, setInput] = useState({name: '', image: '', summary:'', healthScore:'', stepByStep:{numberStep: '', description : ''}})
    let dispatch = useDispatch();
    let handleChange = (e) => {
     e.preventDefault();
     if(e.target.name === 'stepByStep') {
      setInput({...input, [e.target.name] : {name : e.target.value}});
    } else {
      setInput({...input, [e.target.name]: e.target.value});
    }
    }
    
    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.createRecipe(input))
    }
  return (
    <div>
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input type='text' name='name' value={input.name} onChange={handleChange}/>
                <label>image: </label>
                <input type='text' name='image' value={input.image} onChange={handleChange}/>
                <label>summary: </label>
                <input type='text' name='summary' value={input.summary} onChange={handleChange}/>
                <label>healthScore: </label>
                <input type='text' name='healthScore' value={input.healthScore} onChange={handleChange}/>
                <label>stepByStep: </label>
                <input type='text' name='stepByStep' value={input.stepByStep} onChange={handleChange}/>
                <button type='submit'>Create Recipe</button>
    </form>
    <RecipeCard/>
    </div>
  );
};


export default CreateRecipe;