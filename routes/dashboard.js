// dashboard.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { checkAuth } = require('./auth'); // Adjust the path accordingly

const router = express.Router();

router.get('/', checkAuth, async (req, res) => {
    try {
        // Ensure that req.user is defined and has an id property
        if (!req.user || !req.user.id) {
            return res.status(401).send('Unauthorized');
        }

        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            include: {
                GroupeMember: {
                    include: {
                        groupe: {
                            include: {
                                Rappel: true, // Include Rappel for each Groupe
                            },
                        },
                    },
                },
            },
        });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const userGroups = user.GroupeMember.map((member) => {
            const groupWithRappels = { ...member.groupe, rappels: member.groupe.Rappel };
            return groupWithRappels;
        });

        res.render('dashboard', { user: req.user.username, groups: userGroups });
    } catch (error) {
        console.error('Error fetching user groups:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/add-user-to-group', checkAuth, async (req, res) => {
    try {
        // Assurez-vous que l'utilisateur est authentifié
        if (!req.user || !req.user.id) {
            return res.status(401).send('Unauthorized');
        }

        const { selectGroup, userPseudo } = req.body;

        // Récupérez l'ID de l'utilisateur actuel
        const userId = req.user.id;

        // Recherchez l'utilisateur à ajouter par son pseudo
        const userToAdd = await prisma.user.findUnique({
            where: { username: userPseudo },
        });

        // Vérifiez si l'utilisateur à ajouter existe
        if (!userToAdd) {
            return res.status(404).send('Utilisateur non trouvé');
        }

        // Ajoutez l'utilisateur au groupe
        const addedUserToGroup = await prisma.groupeMember.create({
            data: {
                userId: userToAdd.id,
                groupeId: Number(selectGroup),
            },
        });

        // Redirigez ou envoyez une réponse selon les besoins
        res.redirect('/dashboard'); // Remplacez avec la route appropriée
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur au groupe :', error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;
