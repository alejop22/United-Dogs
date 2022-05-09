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
    const {nombre, altura, peso, anios_vida } = req.body;
    try {
        if (!nombre || !altura || !peso) {
            throw {error: 'Datos faltantes'};
        }
        const nuevaRaza = await Raza.create({nombre, altura, peso, anios_vida});
        res.json(nuevaRaza);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
