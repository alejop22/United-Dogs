const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogs = require('./dogs.js');
const temperamento = require('./temperament.js');
const {Raza} = require('../db.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogs);
router.use('/temperament', temperamento);

router.post('/dog', async (req, res) => {
    const { name, minHeight, maxHeight, minWeight, maxWeight, life_span, temperaments } = req.body;
    const id = new Date().getTime();

    try {

        if (!name || !minHeight || !maxHeight || !minWeight || !maxWeight) {
            throw {error: 'Datos faltantes'};
        }

        const height = `${minHeight} - ${maxHeight}`;
        const weight = `${minWeight} - ${maxWeight}`;   

        const nuevaRaza = await Raza.create({id, name, height, weight, life_span});

        for (const i of temperaments) {
            await nuevaRaza.addTemperamento((i*1))
        }

        res.json(nuevaRaza);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
