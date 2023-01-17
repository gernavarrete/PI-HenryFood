import React, { useState, useEffect }from "react";
import * as actions from "./../../redux/actions/index"
import { useDispatch, useSelector } from "react-redux";
import RecipeCard from '../RecipeCard/RecipeCard.jsx';
import { getDiets } from "./../../redux/actions/index";
import './CreateRecipe.css'
import { useHistory } from "react-router-dom";
const imgDefault = 'https://i0.wp.com/brochure3d.com/wp-content/plugins/elementor/assets/images/placeholder.png?w=750&ssl=1'

const CreateRecipe = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const [input, setInput] = useState({
    name: '', 
    image: imgDefault , 
    summary:'', 
    healthScore: 0, 
    stepByStep:[{numberStep: 1, description: ''}],
    diets:[]});

  const [error, setError] = useState({msg: ''})
  const dietsArray = useSelector(state => state.diets);

    // MANEJO DE LAS DEMAS PROPIEDADES DE LA RECETA

    let handleChange = (e) => {
      e.preventDefault();
      
      if(e.target.name === 'name' && !(/\D/g.test(input.name)))  setError({msg : 'debe ser un string'})
      else {
        setError({msg:''})
      }

      setInput({...input, [e.target.name]: e.target.value});
    }

    // MANEJO DE DIETS 

    let handleChangeDiets = (e,id) => {
      e.preventDefault();
      
      let diets = input.diets;
      
      if(e.target.checked === false) diets = diets.filter(diet => diet.name !== e.target.value);
      
      if(e.target.checked) diets.push({id : id, name : e.target.value})
      
      setInput({...input, diets : diets})
    }

    // MANEJO DE STEPS

    let handleSteps = (e, numberStep) => {
      e.preventDefault();
      let steps = input.stepByStep;

      if(e.type === 'click') {
        if(e.target.textContent === 'Add Step')  // agrega el siguiente paso para la receta
          steps = [...steps, {numberStep : numberStep + 1 , description: ''}] 
        else if(steps[steps.length - 1].numberStep > 1){      // asegura que el primer objeto de los steps no sea borrado
          steps.pop()
        }
      }

      steps[numberStep - 1] = {...steps[numberStep - 1], [e.target.name] : e.target.value }

      setInput({...input, stepByStep : steps})
      }

    // ENVIO DEL FORMULARIO A LAS ACTIONS A TRAVES DEL DISPATCH


    let handleSubmit = (e) => {
        e.preventDefault();

        const {name, image , summary, healthScore, stepByStep, diets} = input
        if(name !== '' && image !== imgDefault && summary !== '' & healthScore !== 0 && stepByStep !== [{numberStep: 1, description: ''}] && diets !== [])
          { 
            let response = dispatch(actions.createRecipe(input))
            setInput({
              name: '', 
              image: imgDefault , 
              summary:'', 
              healthScore: 0, 
              stepByStep:[{numberStep: 1, description: ''}],
              diets:[]})
            console.log(response);
          }
        else {
          alert('You have to fill in all the data required to complete the prescription.')
        }
    }
    
    const handleClick = () => {
      history.push('/home');
    }

    useEffect(() => {
      dispatch(getDiets())
    }, [])

  return (
    <div className="container-main-create-recipe">
      <div className="container-button-home">

        <button type="button" onClick={handleClick}>
              Go home
        </button>

      </div>
      <div className="container-form-prevcard">
          <div className="container-form">
            <h2 className="h2">
          
              You can create your new recipe here!
          
            </h2>
      
            <form onSubmit={handleSubmit}>
                    <label for='name'>Recipe name: </label>
                    <input type='text' id="name" name='name' value={input.name} onChange={handleChange}/><br></br>

                    {(error.msg !== '') ? (<p className="pError">{error.msg}</p>) : null }

                    
                    <label for='image'>image: </label>
                    <input type='url' id="image" name='image' value={input.image} onChange={handleChange}/><br></br>
                    <label for='summary'>summary: </label>
                    <input type='text' id="summary" name='summary' value={input.summary} onChange={handleChange}/><br></br>
                    <label for='healthScore'>healthScore: </label>
                    <input type='range' id="healthScore" name='healthScore' value={input.healthScore} onChange={handleChange}/><br></br>
                

                    <h5>
                      In this part you will tell us how to make your recipe!
                    </h5>

                      {input.stepByStep && input.stepByStep.map(step => (

                      <div key={step.numberStep}>

                      <label>numberStep {step.numberStep}:</label><br></br>
                      <textarea id="step" type="text" value={step.description} cols='50' row='20' name="description" onChange={(e)=>handleSteps(e, step.numberStep)}/><br></br>
                      </div>
                      ))}
                      <button 
                      className="buttons-create-recipe" 
                      onClick={(e) => handleSteps(e, input.stepByStep.findLastIndex(step => step.description !== '') + 1)}>
                        Add Step
                      </button>
                      <button 
                      className="buttons-create-recipe" 
                      type='delete' 
                      onClick={handleSteps}>
                        Delete last step
                      </button>
                  
              
                    <br></br>
                    <div className="divDiets">
                    <h4>
                      Choose the diets of your recipe!
                    </h4>

                      {dietsArray && dietsArray.map(({id ,name}) => {
                        name = name[0].toUpperCase() + name.slice(1);
                        return (<div><input type='checkbox' key={id} name='diet' value={name} onChange={(e)=> handleChangeDiets(e,id)}/>
                        <label for={id}>{name}</label><br></br></div>)}
                      )}
    
                    </div><br></br>
                      <button className="buttons-create-recipe" type='submit'>Create Recipe</button>
            </form><br></br>
          </div>
        <div className="PrevCard">
        <h2 className="h2">
          Preview Recipe
        </h2>
        <RecipeCard 
          name={input.name}
          healthScore={input.healthScore}
          image={input.image}
          diets={input.diets.map(diet => diet.name)}/>
        </div>
      </div>


    </div>
  );
};


export default CreateRecipe;