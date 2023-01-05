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
    const dbDataDiets = await DietType.findAll();

    if(dbDataDiets.length > 0) return dbDataDiets;

    const {API_KEY, RECIPES_ENDPOINT} = process.env;
    const apiDataDiets = await axios.get(`${RECIPES_ENDPOINT}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`, { headers: { "Accept-Encoding": "gzip,compress,deflate"}
    }) //Realiza la peticion de la informacion a la API
    .then(response => response.data.results.map(el => el.diets))
    .then(data => data.flat())
    .catch(function (error) {return error.toJSON()});

    //----crea todas entidades de diets en la base de datos a partir del Array obtenido desde la API----//
    //----ademas con el metodo findOrCreate eliminamos los duplicados de recetas que vienen en el array----//
    apiDataDiets.forEach( diet => {
      DietType.findOrCreate({
        where: { name: diet }
      })
    })

    return await DietType.findAll();
}

module.exports = {
  getApiDataDiets,
}