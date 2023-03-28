import {GET_RECIPES, GET_RECIPE_DETAIL, GET_DIETS, FILTER_BY_DIET, SET_ORDER_BY, SET_SEARCH_VALUE } from '../actions/index.js'

const initialState = {
  recipes: [], 
  recipeDetail: {},
  diets: [], 

  filterByDiet: "All Diets",

  orderBy: {
    order: "",
    type: undefined,
  },

  searchValue: ""
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
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload
    }
    case FILTER_BY_DIET:
      return { ...state, filterByDiet: action.payload };

    case SET_ORDER_BY:
      return { ...state, orderBy: action.payload };

    case SET_SEARCH_VALUE:
      return { ...state, searchValue: action.payload };
    default: return {...state}
  }
};

export default rootReducer;