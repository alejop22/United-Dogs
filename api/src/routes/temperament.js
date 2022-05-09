const express = require('express');
const { Temperamento } = require('../db.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const temperamentos = await Temperamento.findAll();

        if (temperamentos.length > 0) {
            res.json(temperamentos);
        } else {
            throw {error: 'No se encontraron los temperamentos de las razas'}
        }

    } catch (e) {
        res.status(404).send(e);
    }
});

router.post('/', async (req, res) => {
    const {nombre} = req.body;

    try {
        if (!nombre) {
            throw 'error en la peticion';
        }

        const nombreTemp = await Temperamento.create({nombre});
        res.json(nombreTemp);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;