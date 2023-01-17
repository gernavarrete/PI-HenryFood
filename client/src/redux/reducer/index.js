import {GET_RECIPES, GET_RECIPE_DETAIL, GET_DIETS, FILTER_BY_DIET, SET_ORDER_BY, SET_SEARCH_VALUE } from '../actions/index.js'

const datosApi = Array.from({length: 100}, (value, index)=> { 
  return {
    id:index, 
    name: `item ${index}`, 
    healthScore: (Math.floor(Math.random() * 10)),
    image: 'https://static01.nyt.com/images/2022/10/11/dining/kc-manicotti-copy/merlin_213609927_74f33018-9f07-4186-9697-869772a5cfbd-jumbo.jpg?quality=75&auto=webp',
    diets: ['vegan', 'paleo', 'gluten','asdasd','asdasdsa','asdasdds','asdasadds'],
}})
const initialState = {
  recipes: datosApi, //cambiar aca en reducer
  recipeDetail: {},
  diets: [], //cambiar cunado este disponible la api

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