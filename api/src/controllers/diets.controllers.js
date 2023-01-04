const axios = require('axios')
const { Recipe , DietType } = require('../db.js');
const { 
  SUCCESS, 
  CREATED, 
  SERVICE_UNAVAILABLE, 
  BAD_REQUEST, 
  NOT_FOUND,
  INTERNAL_SERVER_ERROR} = require('../utils/codigos-status.js');

  const getApiDataDiets = async () => {
    const {API_KEY, RECIPES_ENDPOINT} = process.env;
    const apiDataDiets = await axios.get(`${RECIPES_ENDPOINT}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`, { headers: { "Accept-Encoding": "gzip,compress,deflate"}
    }) //Realiza la peticion de la informacion a la API
    .then(response => response.data.results.map(el => el.diets))
    .then(data => data.flat())
    .catch(function (error) {return error.toJSON()});
      return apiDataDiets;
}

module.exports = {
  getApiDataDiets,
}