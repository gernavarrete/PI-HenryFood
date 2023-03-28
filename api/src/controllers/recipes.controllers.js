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

const getApiData = async (data) => {
  const { API_KEY, API_KEY1, API_KEY2, RECIPES_ENDPOINT } = process.env;
  const apiData = await axios
    .get(
      `${RECIPES_ENDPOINT}complexSearch?apiKey=${API_KEY2}&addRecipeInformation=true&number=100`,
      { headers: { "Accept-Encoding": "gzip,compress,deflate" } }
    ) //Realiza la peticion de la informacion a la API
    .then((response) =>
      response.data.results.map((el) =>
        Object(
          // Se crea una array con los objetos que contienen las propiedades
          {
            id: el.id, // que especificamos dentro la clase
            name: el.title,
            image: el.image,
            summary: el.summary,
            diets: el.diets,
            healthScore: el.healthScore,
            stepByStep: el.analyzedInstructions[0]?.steps.map((step) => {
              return {
                numberStep: step.number,
                description: step.step,
              };
            }),
          }
        )
      )
    )
    .catch(function (error) {
      return error.toJSON();
    });
  return apiData;
};

const getDbRecipes = async () => {
  // Se hace la solicitud a la informacion cargada en nuestra base de datos
  const dbRecipes = await Recipe.findAll({
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
  );
  return dbRecipes;
};

// A traves de las funciones anteriormente creadas se realiza la consulta de la informacion
// de ambas fuentes tanto de la DB como de la API.

const getAllRecipes = async () => {
  const apiData = await getApiData();
  const dbData = await getDbRecipes();
  return [...apiData, ...dbData];
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
