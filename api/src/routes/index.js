const { Router } = require('express');
const { getAllRecipes, getIdRecipe, createRecipe } = require('../controllers/recipes.controllers.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeRoutes = require('./recipe.route.js')
const dietRoutes = require('./diet.route.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/', async (req, res) => {
    res.send('Landing Page Cooming soon');
})
router.use('/recipes', recipeRoutes)
router.use('/diets', dietRoutes)


module.exports = router;