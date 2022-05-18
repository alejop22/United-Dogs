const express = require('express');
const { Op } = require('sequelize');
const { Raza,Temperamento } = require('../db.js');

const router = express.Router();

router.get('/',  async (req, res) => {
    const {name} = req.query;
    if (name) {
        try {
            const razas = await Raza.findAll({
                where: {
                    name: {
                        [Op.eq]: name
                    }
                },
                include: [
                    {
                        model: Temperamento
                    }
                ]
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
            const razas = await Raza.findAll({
                include: [
                    {
                        model: Temperamento
                    }
                ]
            });

            if (razas.length > 0) {

                for (const i of razas) {
                    const metric = i.weight;
                    i.weight = {metric};
                }
                
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
        const raza = await Raza.findAll({
            where: {
                id: {
                    [Op.eq]: idRaza
                }
            },
            include: [
                {
                    model: Temperamento
                }
            ]
        });

        const metric = raza[0].weight;
        const imperial = raza[0].height;

        raza[0].weight = {metric};
        raza[0].height = {imperial};
        
        if (raza[0]) {
            res.json(raza[0]);
        } else {
            throw {error: `No existe la raza con id ${idRaza}`};
        }

    } catch (e) {
        res.status(404).send(e);
    }
});

module.exports = router;