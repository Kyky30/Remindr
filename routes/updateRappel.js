const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();
router.use(bodyParser.json());

router.put('/:rappelId', async (req, res) => {
    try {
        const { rappelId } = req.params;
        const { name, description, dateecheance } = req.body;

        // Ajoutez ici la logique pour mettre à jour le rappel avec les nouvelles valeurs
        const updatedRappel = await prisma.rappel.update({
            where: { id: parseInt(rappelId) },
            data: { name, description, dateecheance: new Date(dateecheance) },
        });

        res.status(200).json(updatedRappel);
    } catch (error) {
        console.error('Error updating rappel:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
