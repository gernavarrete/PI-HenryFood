const axios = require('axios')
const {  Diet } = require('../db.js');

const dietsTest = [{id: 1, name: 'gluten free'}];

 
  const getApiDataDiets = async () => {
    
    const dbDataDiets = await Diet.findAll();

    

    if(dbDataDiets.length > 0) return dbDataDiets;

    const {API_KEY, API_KEY1, API_KEY2, RECIPES_ENDPOINT} = process.env;

    const apiDataDiets = await axios.get(`${RECIPES_ENDPOINT}complexSearch?apiKey=${API_KEY2}&addRecipeInformation=true&number=100`, { headers: { "Accept-Encoding": "gzip,compress,deflate"}}) //Realiza la peticion de la informacion a la API
      .then(response => response.data.results.map(el => el.diets)) //por cada receta devuelve las diets
      .then(data => [...new Set(data.flat())]) // crea un array de un nivel con todos los elementos de la respuesta
      .catch(function (error) {return error.toJSON()});

    //----crea todas entidades de diets en la base de datos a partir del Array obtenido desde la API----//
    //----ademas con el metodo findOrCreate eliminamos los duplicados de recetas que vienen en el array----//
    apiDataDiets.forEach( diet => {
      Diet.findOrCreate({
        where: { name: diet }
      })
    })

    return await Diet.findAll();
}

module.exports = {
  getApiDataDiets,
}