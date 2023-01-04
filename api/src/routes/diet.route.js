const { Router } = require('express');
const { getApiDataDiets } = require('../controllers/diets.controllers');
const { SUCCESS } = require('../utils/codigos-status');

const router = Router();

router.get('/', async (req, res) => {
    const dietAll = await getApiDataDiets()
    res.status(SUCCESS).json(dietAll)
})

module.exports = router;