const axios = require("axios");
const { Recipe, Diet } = require("../db.js");
const {
  SUCCESS,
  CREATED,
  SERVICE_UNAVAILABLE,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/codigos-status.js");

/* const getApi = async () => {
  try {
    let countries = (await axios.get(`${RECIPES_ENDPOINT}complexSearch?apiKey=${API_KEY2}&addRecipeInformation=true&number=100`)).data;
      countries = await Promise.all(      //Llamo a todas las promesas juntas
      countries.map((c) => {              //Mapeo countries
        Country.findOrCreate({            // Busca o crea lo que le paso en where
          where: {
            id: c.cca3,
            name: c.name.common,
            flags: c.flags[1],
            continent: c.continents[0],
            capital: c.capital ? c.capital[0] : "Capital no encontrada",
            subregion: c.subregion ? c.subregion : "Subregion no encontrada",
            area: c.area,
            population: c.population,
          },
        });
      })
    ); */

const getApiData = async () => {
  const { API_KEY, API_KEY1, API_KEY2, RECIPES_ENDPOINT } = process.env;
  const apiData = await axios
    .get(
      `${RECIPES_ENDPOINT}complexSearch?apiKey=${API_KEY1}&addRecipeInformation=true&number=100`,
      { headers: { "Accept-Encoding": "gzip,compress,deflate" } }
    ) //Realiza la peticion de la informacion a la API
    .then((response) =>
      response.data.results.map((el) => ({
        // que especificamos dentro la clase
        name: el.title,
        image: el.image,
        summary: el.summary,
        // arrDietas = [{name: 'vegan', id: 1}]
        diets: el.diets, // el.diets.map(diet => arrDietas.find(el => el.name === diet).id)
        healthScore: el.healthScore,
        stepByStep: el.analyzedInstructions[0]?.steps.map((step) => ({
          numberStep: step.number,
          description: step.step,
        })),
      }))
    )
    .catch(function (error) {
      return error.toJSON();
    });

  await Recipe.bulkCreate(
    apiData.map(({ name, image, summary, healthScore, stepByStep }) => ({
      name,
      image,
      summary,
      healthScore,
      stepByStep,
    }))
  );

  /* apiData.map((el) =>
    Recipe.findOrCreate({
      // Se crea una array con los objetos que contienen las propiedades
      where: {
        // que especificamos dentro la clase
        name: el.title,
        image: el.image,
        summary: el.summary,
        diets: el.diets,
        healthScore: el.healthScore,
        stepByStep: el.stepByStep,
      },
    })
  ); */
  return apiData;
};

const getDbRecipes = async () => {
  const dbRecipes = await Recipe.findAll({
    attributes: ["id", "name", "image", "summary", "healthScore", "stepByStep"],
    include: Diet,
  });
  // Se hace la solicitud a la informacion cargada en nuestra base de datos
  /* const dbRecipes = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  }).then((result) =>
    result.map((element) => {
      return {
        ...element.dataValues,
        diets: element.dataValues.diets.map((diet) => diet.name),
      };
    })
  ); */
  console.log(dbRecipes);
  return dbRecipes;
};

// A traves de las funciones anteriormente creadas se realiza la consulta de la informacion
// de ambas fuentes tanto de la DB como de la API.

const getAllRecipes = async () => {
  await getApiData();
  const dbData = await getDbRecipes();
  return [...dbData];
};

const getRecipes = async (req, res) => {
  const { name } = req.query;
  if (!name) res.status(SUCCESS).json(await getAllRecipes());
  else {
    const parameter = new RegExp(name, "ig"); // creamos la expresion regular con el value de name
    const recipes = await getAllRecipes(); //asignamos a recipes todas las recipes
    //por cada receta buscamos que en la prop name contenga al menos una vez la palabra proveniente de req.query
    const recipeByParameter = recipes.filter((recipe) =>
      parameter.test(recipe.name)
    );
    recipeByParameter.length > 0
      ? res.status(SUCCESS).json(recipeByParameter)
      : res.status(NOT_FOUND).json({
          msg: "No recipe can be found with the indicated parameter.",
        });
  }
};

const getIdRecipe = async (req, res) => {
  try {
    const { idrecipe } = req.params;
    const allRecipes = await getAllRecipes();
    const recipe = allRecipes.find(
      (recipe) => recipe.id.toString() === idrecipe
    );
    recipe
      ? res.status(SUCCESS).json(recipe)
      : res
          .status(NOT_FOUND)
          .json({ msg: "The recipe you are requesting is not found." });
  } catch (err) {
    res.status(SERVICE_UNAVAILABLE).json(err);
  }
};

const createRecipe = async (req, res) => {
  try {
    const { name, image, summary, healthScore, diets, stepByStep } = req.body;
    const recipe = {
      name,
      image,
      summary,
      healthScore: healthScore || 0,
      stepByStep: stepByStep || [],
    };

    const newRecipe = await Recipe.create(recipe);

    console.log(diets);

    diets?.forEach(async (diet) => {
      const dietRecipe = await Diet.findOne({
        where: {
          name: diet.name.toLowerCase(),
        },
      });

      await newRecipe.addDiet(dietRecipe);
    });

    res
      .status(CREATED)
      .json({ message: "Your Recipe was successfully created.", newRecipe });
  } catch (err) {
    res.status(BAD_REQUEST).json(err);
  }
};

module.exports = {
  getIdRecipe,
  createRecipe,
  getRecipes,
};
