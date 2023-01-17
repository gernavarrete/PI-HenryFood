// Aca deben declarar las variables donde tengan el action types.
export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL';
export const GET_DIETS = 'GET_DIETS';
export const SET_ORDER_BY = "SET_ORDER_BY";
export const FILTER_BY_DIET = 'FILTER_BY_DIET';
export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';


export const getRecipes = () => async dispatch => {
    return await fetch(`http://localhost:3001/recipes`)
      .then(response => response.json())
      .then(json => { 
        dispatch({ type: GET_RECIPES , payload: json });
      });
  };


export const getRecipeDetail = (idRecipe) => async  dispatch => {
    return await fetch(`http://localhost:3001/recipes/${idRecipe}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_RECIPE_DETAIL , payload: json });
        });
};

export const createRecipe = (newRecipe) => async dispatch => {
  let data =  await fetch(`http://localhost:3001/recipes`,{
          method: 'POST',
          headers : {'Content-Type' : 'application/json'},
          body: JSON.stringify(newRecipe)
        }).then(res => res)
  console.log(data)
  return data;
};

export const getDiets = () => async dispatch => {
    let diets = await fetch(`http://localhost:3001/diets`).then(response => response.json())
    
    return dispatch({ type: GET_DIETS , payload: diets });
     
  };

  export const filterByDiet = (diet) => {
    return (dispatch) => dispatch({ type: "FILTER_BY_DIET", payload: diet });
  };

  export const setOrderBy = (order) => {
    return (dispatch) => dispatch({ type: "SET_ORDER_BY", payload: order });
  };

  export const setSearchValue = (searchValue) => {
    return (dispatch) => dispatch({ type: "SET_SEARCH_VALUE", payload: searchValue });
  };