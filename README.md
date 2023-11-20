# Remindr
# NodeJS project

### **Sujet d'évaluation : Application de gestion de rappels - Remindr**

Le projet s’effectue par groupe de deux.

### Contexte :

Vous êtes en charge du développement d'une application de gestion de rappels appelée "Remindr". L'objectif est de permettre aux utilisateurs de créer des groupes, d'inviter d'autres utilisateurs, et de collaborer sur des rappels au sein de ces groupes. Chaque rappel doit comporter des détails spécifiques tels que la date d'échéance, la couleur, le nom et la description.

**Technologies à utiliser :** 

- Express.js
- Prisma.Js
- Handlebars

### Fonctionnalités du Projet :

1. **Authentification et Comptes Utilisateurs :**
    - Les utilisateurs doivent pouvoir créer un compte et se connecter.
    - Un utilisateur doit avoir un tableau de bord (dashboard) après la connexion.
2. **Gestion des Groupes :**
    - Les utilisateurs peuvent créer un ou plusieurs groupes.
    - Chaque groupe doit avoir un nom unique.
    - Les utilisateurs peuvent ajouter d'autres utilisateurs inscrits sur la plateforme dans leurs groupes.
3. **Création et Gestion des Rappels :**
    - Dans un groupe, les utilisateurs peuvent ajouter des rappels.
    - Chaque rappel doit avoir un nom, une description, une date et une heure d'échéance.
    - Les rappels peuvent être différenciés par couleur.
    - Les rappels doivent être ordonnés sur le tableau de bord en fonction de leur date d'échéance.
4. **Affichage sur le Tableau de Bord :**
    - Sur le tableau de bord, les utilisateurs doivent d'abord voir les rappels qui arrivent à échéance rapidement, indépendamment du groupe.
    - Ensuite, affichez la liste des groupes auxquels l'utilisateur appartient.
5. **Modification et Suppression des Rappels :**
    - Les utilisateurs peuvent modifier et supprimer les rappels dans les groupes auxquels ils appartiennent.
6. **Affichage des Rappels dans un Groupe :**
    - Lorsqu'un utilisateur accède à un groupe, les rappels doivent être affichés dans l'ordre de la date d'échéance, de la plus proche à la plus éloignée.
    - Ajoutez une option pour afficher les rappels dépassés, avec un style différent pour indiquer qu'ils sont passés.

### Aller Plus Loin (bonus) :

1. **Validation des Tâches :**
    - Ajoutez la possibilité pour chaque utilisateur du groupe de valider une tâche.
    - Affichez les icônes ou indicateurs pour montrer qui a validé chaque tâche.
2. **Affichage des Rappels Dépassés et Non Réalisés sur le Tableau de Bord :**
    - Sur le tableau de bord, ajoutez une section pour afficher à la fois les rappels dépassés et les rappels non réalisés.
3. **Utilisation de Quill.js pour la Description des Rappels :**
    - Intégrez l'éditeur WYSIWYG Quill.js pour améliorer la saisie des descriptions de rappels.

### Livrables Attendus :

1. **Code Source :**
    - Fournissez le code source de l'application, bien organisé et commenté **via un repository github**.
    - Assurez-vous que le code respecte les bonnes pratiques de développement.
2. **Documentation Technique :**
    - Rédigez une documentation technique expliquant les choix technologiques, la structure du projet et les détails de mise en œuvre.

### Critères de Performances :

1. **Authentification :**
    - Mise en place d'un système sécurisé.
    - Gestion appropriée des sessions utilisateur.
    - Vos utilisateurs doivent accéder seulement à leur propres informations.
2. ****Code :**** 
    - Votre code doit être bien organisé, ne mettez pas tout dans le fichier index.js pensez à découper vos fichiers et réfléchir en architecture.
    - Votre code doit être documenté pour permettre de bien comprendre celui ci.
3. Base de données
    - Votre base de données doit être conçue selon les norme et standards que vous connaissez

**Note :** Assurez-vous que l'interface utilisateur est intuitive et réactive, et testez l'application pour garantir son bon fonctionnement.

**Date Limite de Soumission :** 22/12/2023

Bonne chance !