// routes/newRappel.js

const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', async (req, res) => {
    try {
        const { name, description, dateheureecheance, groupe } = req.body;

        // Vous devriez probablement vérifier que les données nécessaires sont présentes
        if (!name || !dateheureecheance || !groupe) {
            return res.status(400).send('Bad Request - missing fields');
        }



        // Récupérez l'ID de l'utilisateur à partir de la session
        const userId = req.user.id;

        // Créez le rappel
        const createdRappel = await prisma.rappel.create({
            data: {
                name,
                description,
                dateecheance: new Date(dateheureecheance),
                groupe: { connect: { id: Number(groupe) } },
            },
        });

        // Redirigez ou envoyez une réponse selon les besoins
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error creating rappel:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
