const { Router } = require('express');
const { getIdRecipe, createRecipe, getRecipes} = require('../controllers/recipes.controllers.js')


const router = Router();

router.get('/', getRecipes);
router.get('/:idrecipe', getIdRecipe)
router.post('/', createRecipe)

module.exports = router;