import {GET_RECIPES, GET_RECIPE_DETAIL, CREATE_RECIPE, GET_STEPS } from '../actions/index.js'

const initialState = {
  recipes: [],
  recipeDetail: {},
  steps: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return { 
        ...state,
        recipes: action.payload
    }
    case GET_RECIPE_DETAIL:
      return {
        ...state,
        recipeDetail: action.payload
    } 
    case CREATE_RECIPE:
      return {
        ...state,
        recipe: [...state.recipes, action.payload]
    }
    case GET_STEPS:
      return {
        ...state,
        STEPS: action.payload
    }
    default: return {...state}
  }
};

export default rootReducer;