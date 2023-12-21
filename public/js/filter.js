document.addEventListener('DOMContentLoaded', function () {
    const viewAllRow = document.getElementById('viewAllRow');
    const groupRows = document.querySelectorAll('.groupRow');
    const rappelsTable = document.getElementById('rappelsTable');

    // Fonction pour trier les rappels par date d'échéance
    function sortRappelsByDate(rappelGroup) {
        const rappels = Array.from(rappelGroup.children).sort((b, a) => {
            const dateA = Date(a.dataset.dateecheance);
            const dateB = Date(b.dataset.dateecheance);
            console.log(dateA, dateB);
            return dateA - dateB;
        });

        rappelGroup.innerHTML = ''; // Vide la liste actuelle

        rappels.forEach((rappel) => {
            rappelGroup.appendChild(rappel); // Ajoute les rappels triés
        });
    }

    // Fonction pour mettre à jour le filtre
    function updateFilter(groupName) {
        // Logique pour mettre à jour le filtre selon le groupe sélectionné
        // Vous pouvez implémenter votre propre logique ici

        // Exemple: Afficher ou masquer les lignes de rappel en fonction du groupe
        const allRappelGroups = document.querySelectorAll('.rappelGroup');
        allRappelGroups.forEach(function (rappelGroup) {
            if (groupName === 'View All' || rappelGroup.dataset.groupName === groupName) {
                rappelGroup.style.display = 'table-row-group';
                sortRappelsByDate(rappelGroup);
                highlightOverdueRappels(rappelGroup);
            } else {
                rappelGroup.style.display = 'none';
            }
        });

        // Ajouter la classe selected-filter à l'élément actuellement sélectionné
        // Supprimer la classe des autres éléments
        groupRows.forEach(function (row) {
            if (row.dataset.groupName === groupName) {
                row.classList.add('selected-filter');
            } else {
                row.classList.remove('selected-filter');
                viewAllRow.classList.remove('selected-filter');
            }
        });

        // Ajouter la classe selected-filter à l'élément "View All" s'il est sélectionné
        // Retirer la classe si un autre filtre est sélectionné
        if (groupName === 'View All') {
            viewAllRow.classList.add('selected-filter');
        } else {
            viewAllRow.classList.remove('selected-filter');
        }
    }

    // Fonction pour mettre en surbrillance les rappels dont la date est dépassée
    function highlightOverdueRappels(rappelGroup) {
        const today = new Date();

        Array.from(rappelGroup.children).forEach((rappel) => {
            const dateecheance = Date(rappel.dataset.dateecheance);

            if (dateecheance < today) {
                row.style.backgroundColor = 'red';
            } else {
                row.style.backgroundColor = ''; // Réinitialise la couleur de fond
            }
        });
    }


    // Initialise la page avec "View All" en bleu et sans texte de filtre
    updateFilter('View All');

    // Ajoutez un gestionnaire d'événements pour chaque ligne de groupe
    groupRows.forEach(function (row) {
        row.addEventListener('click', function () {
            const groupName = row.dataset.groupName;
            updateFilter(groupName);
        });
    });

    // Ajoutez un gestionnaire d'événements pour la ligne "View All"
    viewAllRow.addEventListener('click', function () {
        // Logique pour afficher tous les éléments (réinitialiser le filtre)
        const allRappelGroups = document.querySelectorAll('.rappelGroup');
        allRappelGroups.forEach(function (rappelGroup) {
            rappelGroup.style.display = 'table-row-group';
            sortRappelsByDate(rappelGroup);
            highlightOverdueRappels(rappelGroup);
        });    function highlightOverdueRappels(rappelGroup) {
            const today = new Date();
    
            Array.from(rappelGroup.children).forEach((rappel) => {
                const dateecheance = Date(rappel.dataset.dateecheance);
    
                console.log(rappel.dataset);
                console.log(dateecheance < today);
                if (dateecheance < today) {
                    rappel.style.backgroundColor = 'red';
                } else {
                    rappel.style.backgroundColor = ''; // Réinitialise la couleur de fond
                }
            });
        }
        function highlightOverdueRappels(rappelGroup) {
            const today = new Date();
    
            Array.from(rappelGroup.children).forEach((rappel) => {
                const dateecheance = Date(rappel.dataset.dateecheance);
    
                console.log(rappel.dataset);
                console.log(dateecheance < today);
                const row = rappel.closest('tr');
                if (dateecheance < today) {
                    row.style.backgroundColor = 'red';
                } else {
                    row.style.backgroundColor = ''; // Réinitialise la couleur de fond
                }
            });
        }
        
        updateFilter('View All');
    });
});