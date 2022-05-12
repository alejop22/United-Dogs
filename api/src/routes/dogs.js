const express = require('express');
const { Op } = require('sequelize');
const { Raza } = require('../db.js');

const router = express.Router();

router.get('/',  async (req, res) => {
    const {name} = req.query;
    if (name) {
        try {
            const razas = await Raza.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                }
            });

            if (razas.length > 0) {
                const metric = razas[0].weight;
                razas[0].weight = {metric};
                res.json(razas[0]);
            } else {
                throw {error: `No se encontró la raza ${name} en la base de datos`};
            }

        } catch (e) {
            res.status(404).send(e);
        }
    } else {
        try {
            const razas = await Raza.findAll();

            if (razas.length > 0) {
                res.json(razas);
            } else {
                throw {error: `No hay razas en la bd`};
            }
        } catch (e) {
            res.status(404).send(e);
        }
    }
});

router.get('/:idRaza', async (req, res) => {
    const {idRaza} = req.params;

    try {
        const raza = await Raza.findByPk(idRaza);

        if (raza) {
            res.json(raza);
        } else {
            throw {error: `No existe la raza con id ${idRaza}`};
        }

    } catch (e) {
        res.status(404).send(e);
    }
});

module.exports = router;