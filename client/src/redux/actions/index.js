import axios from "axios";
// Aca deben declarar las variables donde tengan el action types.
export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const GET_DIETS = "GET_DIETS";
export const SET_ORDER_BY = "SET_ORDER_BY";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const SET_SEARCH_VALUE = "SET_SEARCH_VALUE";

export const getRecipes = () => async (dispatch) => {
  return await axios(`/recipes`)
    .then((response) => response.json())
    .then((json) => {
      dispatch({ type: GET_RECIPES, payload: json });
    });
};

export const getRecipeDetail = (idRecipe) => async (dispatch) => {
  if (idRecipe) {
    return await axios(`/recipes/${idRecipe}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_RECIPE_DETAIL, payload: json });
      });
  } else {
    dispatch({ type: GET_RECIPE_DETAIL, payload: {} });
  }
};

export const createRecipe = (payload) => async (dispatch) => {
  try {
    let data = await axios(`/recipes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        image: payload.image,
        summary: payload.summary,
        healthScore: payload.healthScore,
        stepByStep: payload.stepByStep,
        diets: payload.diets,
      }),
    }).then((res) => res.json());
    return data;
  } catch (error) {
    return error;
  }
};

export const getDiets = () => async (dispatch) => {
  let diets = await axios(`/diets`).then((response) => response.json());

  return dispatch({ type: GET_DIETS, payload: diets });
};

export const filterByDiet = (diet) => {
  return (dispatch) => dispatch({ type: "FILTER_BY_DIET", payload: diet });
};

export const setOrderBy = (order) => {
  return (dispatch) => dispatch({ type: "SET_ORDER_BY", payload: order });
};

export const setSearchValue = (searchValue) => {
  return (dispatch) =>
    dispatch({ type: "SET_SEARCH_VALUE", payload: searchValue });
};
