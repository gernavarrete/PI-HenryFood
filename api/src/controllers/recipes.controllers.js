const axios = require('axios')
const { Recipe , DietType } = require('../db.js');
const { 
  SUCCESS, 
  CREATED, 
  SERVICE_UNAVAILABLE, 
  BAD_REQUEST, 
  NOT_FOUND,
  INTERNAL_SERVER_ERROR} = require('../utils/codigos-status.js');

const getApiData = async (data) => {
        const {API_KEY, RECIPES_ENDPOINT} = process.env;
        const apiData = await axios.get(`${RECIPES_ENDPOINT}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`, { headers: { "Accept-Encoding": "gzip,compress,deflate"}
        }) //Realiza la peticion de la informacion a la API
        .then(response => response.data.results.map(el => 
          Object(               // Se crea una array con los objetos que contienen las propiedades
            { id: el.id,        // que especificamos dentro la clase
            name: el.title,
            image: el.image,
            summary : el.summary,
            diets: el.diets,
            healthScore: el.healthScore,
            stepByStep: el.analyzedInstructions[0]?.steps.map( step => { return {
              numberStep : step.number,
              description: step.step
            }})}
            )
          ))
          .catch(function (error) {return error.toJSON()});
          return apiData;
}


const getDbRecipes = async () => {
      // Se hace la solicitud a la informacion cargada en nuestra base de datos
      const dbRecipes = await Recipe.findAll({
        include: {
          model: DietType,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      })
      .then((result) => result.map( element => {
        return {
          ...element.dataValues,
          dietTypes: element.dataValues.dietTypes.map((diet) => diet.name),
        };
      })
      );
      return dbRecipes;
}

// A traves de las funciones anteriormente creadas se realiza la consulta de la informacion
// de ambas fuentes tanto de la DB como de la API.

const getAllRecipes = async () => {
  //const apiData = await getApiData();
  const dbData = await getDbRecipes();
  return [/* ...apiData, */...dbData];
}

const getRecipes = async (req,res) => {
  const { name } = req.query;
  if(!name) res.status(SUCCESS).json(await getAllRecipes())
  else {
    const parameter = new RegExp(name,'ig') // creamos la expresion regular con el value de name
    const recipes = await getAllRecipes() //asignamos a recipes todas las recipes 
    //por cada receta buscamos que en la prop name contenga al menos una vez la palabra proveniente de req.query
    const recipeByParameter = recipes.filter(recipe => parameter.test(recipe.name))
    recipeByParameter.length > 0 ? 
    res.status(SUCCESS).json(recipeByParameter) : 
    res.status(NOT_FOUND).json({msg : 'No se encuentra ninguna receta con el parametro indicado'})
  }
}

const getIdRecipe = async (req, res) => {
  try {
    const { idRecipe } = req.params;
    const allRecipes = await getAllRecipes();
    const recipe = allRecipes.find(recipe => (recipe.id).toString() === idRecipe)
    recipe ? res.status(SUCCESS).json(recipe) 
    : res.status(NOT_FOUND).json({msg : 'La receta que esta solicitando no se encuentra'});
  } catch(err) {
    res.status(SERVICE_UNAVAILABLE).json(err)
  }
}

const createRecipe = async (req, res) => {
  try {
    const { 
    name, 
    image, 
    summary, 
    healthScore,
    diets,
    stepByStep,
     } = req.body
    const recipe = {
      name,
      image,
      summary,
      healthScore : healthScore || 0,
      stepByStep : stepByStep || [],
    }
    const newDiets = await DietType.findAll({
        where : {
          name : diets
        }
      })
    const newRecipe = await Recipe.create(recipe);
    await newRecipe.addDietType(newDiets)

    res.status(CREATED).json({message: 'Su Receta se creo de manera exitosa', newRecipe});
  } catch (err) {
    res.status(BAD_REQUEST).json(err)
  }
}

module.exports = {
    getIdRecipe,
    createRecipe,
    getRecipes
}