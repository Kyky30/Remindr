// routes/deleteRappel.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

router.delete('/:rappelId', async (req, res) => {
    const rappelId = parseInt(req.params.rappelId, 10);

    try {
        // Ajoutez ici la logique pour supprimer le rappel avec l'ID rappelId
        await prisma.rappel.delete({
            where: {
                id: rappelId,
            },
        });

        res.status(204).send(); // Envoyez une réponse indiquant que la suppression a réussi
    } catch (error) {
        console.error('Error deleting rappel:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
