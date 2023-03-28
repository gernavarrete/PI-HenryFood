import React, { useState, useEffect } from "react";
import * as actions from "./../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import RecipeCard from "../RecipeCard/RecipeCard.jsx";
import { getDiets } from "./../../redux/actions/index";
import "./CreateRecipe.css";
import { useHistory } from "react-router-dom";
const imgDefault =
  "https://i0.wp.com/brochure3d.com/wp-content/plugins/elementor/assets/images/placeholder.png?w=750&ssl=1";

const CreateRecipe = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const [input, setInput] = useState({
    name: "",
    image: imgDefault,
    summary: "",
    healthScore: 0,
    stepByStep: [{ numberStep: 1, description: "" }],
    diets: [],
  });

  const [error, setError] = useState({ msg: "" });
  const dietsArray = useSelector((state) => state.diets);

  // MANEJO DE LAS DEMAS PROPIEDADES DE LA RECETA

  let handleChange = (e) => {
    e.preventDefault();

    if (e.target.name === "name" && !isNaN(e.target.value))
      setError({ ...error, msgName: "debe ser un string" });
    else if (e.target.name === "summary" && e.target.value.length > 200)
      setError({ ...error, msgSummary: "excedio el limite de caracteres" });
    else if (e.target.name === "healthScore" && isNaN(e.target.value))
      setError({ ...error, msgHealthscore: "deber ser un numero" });
    else if (
      e.target.name === "healthScore" &&
      (parseFloat(e.target.value) > 100 || parseFloat(e.target.value) < 0)
    )
      setError({
        ...error,
        msgHealthscore: "deber ser un numero entre 0 y 100",
      });
    else {
      setError({ msg: "" });
    }

    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // MANEJO DE DIETS

  let handleChangeDiets = (e, id) => {
    e.preventDefault();

    let diets = input.diets;

    if (e.target.checked === false)
      diets = diets.filter(
        (diet) => diet.name !== e.target.value.toLowerCase()
      );

    if (e.target.checked)
      diets.push({ id: id, name: e.target.value.toLowerCase() });

    setInput({ ...input, diets: diets });
  };

  // MANEJO DE STEPS

  let handleSteps = (e, numberStep) => {
    e.preventDefault();
    let steps = input.stepByStep;
    if (e.type === "click") {
      if (e.target.textContent === "Add Step") {
        if (numberStep === 0) return;
        steps = [...steps, { numberStep: numberStep + 1, description: "" }];
      } else if (e.target.textContent === "Delete last step")
        if (steps.length > 1) {
          // asegura que el primer objeto de los steps no sea borrado
          steps.pop();
        }
    }

    steps[numberStep - 1] = {
      ...steps[numberStep - 1],
      [e.target.name]: e.target.value,
    };

    setInput({ ...input, stepByStep: steps });
  };

  // ENVIO DEL FORMULARIO A LAS ACTIONS A TRAVES DEL DISPATCH

  let handleSubmit = async (e) => {
    e.preventDefault();

    const { name, image, summary, healthScore, stepByStep, diets } = input;
    if (
      name !== "" &&
      image !== imgDefault &&
      (summary !== "") & (healthScore !== 0) &&
      stepByStep !== [{ numberStep: 1, description: "" }] &&
      diets !== []
    ) {
      let data = await dispatch(actions.createRecipe(input));
      console.log(input);
      setInput({
        name: "",
        image: imgDefault,
        summary: "",
        healthScore: 0,
        stepByStep: [{ numberStep: 1, description: "" }],
        diets: [],
      });

      alert(data.message);
      history.push("/home");
    } else {
      alert(
        "You have to fill in all the data required to complete the prescription."
      );
    }
  };

  const handleClick = () => {
    history.push("/home");
  };

  useEffect(() => {
    dispatch(getDiets());
  }, []);

  return (
    <div className="container-main-create-recipe">
      <div className="container-button-home">
        <button
          className="buttons-create-recipe button-home"
          type="button"
          onClick={handleClick}
        >
          Go home
        </button>
      </div>
      <div className="container-form-prevcard">
        <div className="container-form">
          <h2 className="h2">You can create your new recipe here!</h2>

          <form onSubmit={handleSubmit}>
            <label for="name">Recipe name: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={input.name}
              onChange={handleChange}
            />
            <br></br>

            {error.msgName !== "" ? (
              <p className="pError">{error.msgName}</p>
            ) : null}

            <label for="image">Image:</label>
            <input
              type="url"
              id="image"
              name="image"
              value={input.image}
              onChange={handleChange}
              placeholder="Url Imagen"
            />
            <br></br>
            <label for="summary">Summary:</label>
            <br></br>
            <textarea
              type="text"
              id="summary"
              name="summary"
              cols="50"
              row="20"
              value={input.summary}
              onChange={handleChange}
            />
            <br></br>
            {error.msgSummary !== "" ? (
              <p className="pError">{error.msgSummary}</p>
            ) : null}
            <label for="healthScore">HealthScore:</label>
            <br></br>
            <input
              type="text"
              id="healthScore"
              name="healthScore"
              value={input.healthScore}
              onChange={handleChange}
            />
            <br></br>
            {error.msgHealthscore !== "" ? (
              <p className="pError">{error.msgHealthscore}</p>
            ) : null}
            <h4>In this part you will tell us how to make your recipe!</h4>

            {input.stepByStep &&
              input.stepByStep.map((step) => (
                <div key={step.numberStep}>
                  <label>numberStep {step.numberStep}:</label>
                  <br></br>

                  <textarea
                    id="step"
                    type="text"
                    value={step.description}
                    cols="50"
                    row="20"
                    name="description"
                    onChange={(e) => handleSteps(e, step.numberStep)}
                  />
                  <br></br>
                </div>
              ))}
            <button
              className="buttons-create-recipe"
              onClick={(e) =>
                handleSteps(
                  e,
                  input.stepByStep.findLastIndex(
                    (step) => step.description !== ""
                  ) + 1
                )
              }
            >
              Add Step
            </button>
            <button
              className="buttons-create-recipe"
              type="delete"
              onClick={handleSteps}
            >
              Delete last step
            </button>

            <br></br>
            <div className="divDiets">
              <h4>Choose the diets of your recipe!</h4>

              {dietsArray &&
                dietsArray.map(({ id, name }) => {
                  name = name[0].toUpperCase() + name.slice(1);
                  return (
                    <div>
                      <input
                        type="checkbox"
                        key={id}
                        name="diet"
                        value={name}
                        onChange={(e) => handleChangeDiets(e, id)}
                      />
                      <label for={id}>{name}</label>
                      <br></br>
                    </div>
                  );
                })}
            </div>
            <br></br>
            <button className="buttons-create-recipe" type="submit">
              Create Recipe
            </button>
          </form>
          <br></br>
        </div>
        <div className="PrevCard">
          <h2 className="h2">Preview Recipe</h2>
          <RecipeCard
            name={input.name}
            healthScore={input.healthScore}
            image={input.image}
            diets={input.diets.map((diet) => diet.name)}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
