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
    const {name} = req.body;
    try {
        if (!name) {
            throw 'error en la peticion';
        }
        const nombreTemp = await Temperamento.create({name});
        res.json(nombreTemp);
    } catch (e) {
        res.status(400).send(name);
    }
});

module.exports = router;