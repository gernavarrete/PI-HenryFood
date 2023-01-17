const axios = require('axios')
const { Recipe , Diet } = require('../db.js');
const { 
  SUCCESS, 
  CREATED, 
  SERVICE_UNAVAILABLE, 
  BAD_REQUEST, 
  NOT_FOUND,
  INTERNAL_SERVER_ERROR} = require('../utils/codigos-status.js');

  const dietsTest = [
    { 
    id: 1,
    name : "Gluten Free"
    },
    { 
    id: 2,
    name: "Ketogenic"
    },
    { 
    id: 3,
    name : "Lacto-Vegetarian"
    },
    { 
    id: 4,
    name : "Ovo-Vegetarian"
    },
    { 
    id: 5,
    name : "Vegan"
    },
    { 
    id: 6,
    name: "Pescetarian"
    },
    { 
    id: 7,
    name : "Paleo"
    },
    { 
    id: 8,
    name : "Primal"
    },
    { 
    id: 9,
    name : "Low FODMAP"
    },
    { 
    id: 10,
    name : "Whole30"
    }
  ]
  const getApiDataDiets = async () => {
    
    const dbDataDiets = await Diet.findAll();

    

    if(dbDataDiets.length > 0) return dbDataDiets;

    /* const {API_KEY, RECIPES_ENDPOINT} = process.env;
    const apiDataDiets = await axios.get(`${RECIPES_ENDPOINT}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`, { headers: { "Accept-Encoding": "gzip,compress,deflate"}}) //Realiza la peticion de la informacion a la API
    .then(response => response.data.results.map(el => el.diets)) //por cada receta devuelve las diets
    .then(data => [...new Set(data.flat())]) // crea un array de un nivel con todos los elementos de la respuesta
    .catch(function (error) {return error.toJSON()}); */

    //----crea todas entidades de diets en la base de datos a partir del Array obtenido desde la API----//
    //----ademas con el metodo findOrCreate eliminamos los duplicados de recetas que vienen en el array----//
    dietsTest.forEach( diet => {
      Diet.findOrCreate({
        where: { name: diet.name }
      })
    })

    return await Diet.findAll();
}

module.exports = {
  getApiDataDiets,
}