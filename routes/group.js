// routes/group.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Route pour récupérer tous les utilisateurs sauf l'utilisateur actuel
router.get('/all-users-except-current/:currentUserId', async (req, res) => {
    const currentUserId = parseInt(req.params.currentUserId);

    try {
        // Ajoutez ici la logique pour récupérer tous les utilisateurs sauf l'utilisateur actuel
        const users = await prisma.user.findMany({
            where: {
                id: {
                    not: currentUserId,
                },
            },
        });

        res.status(200).json(users);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
