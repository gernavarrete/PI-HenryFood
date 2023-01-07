// Aca deben declarar las variables donde tengan el action types.
export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL';
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const GET_STEPS = 'GET_STEPS'


export const getRecipes = () => dispatch => {
    return fetch(`http://localhost:3001/recipes`)
      .then(response => response.json())
      .then(json => { 
        dispatch({ type: GET_RECIPES , payload: json });
      });
  };

export const getRecipeDetail = (idRecipe) => dispatch => {
    return fetch(`http://localhost:3001/Recipe/${idRecipe}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_RECIPE_DETAIL , payload: json });
        });
};

export const createRecipe = (payload) => {return { type: CREATE_RECIPE, payload: {...payload} } };



export const getstepByStep = () => dispatch => {
    return fetch(`http://localhost:3001/recipes`)
      .then(response => response.json())
      .then(json => json.map(recipe => recipe.stepByStep))
      .then(steps => {
        dispatch({ type: GET_STEPS , payload: steps });
      });
  };