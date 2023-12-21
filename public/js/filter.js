document.addEventListener('DOMContentLoaded', function () {
    const viewAllRow = document.getElementById('viewAllRow');
    const groupRows = document.querySelectorAll('.groupRow');
    const rappelsTable = document.getElementById('rappelsTable');

 // Fonction pour trier les rappels par date d'échéance
    function sortRappelsByDate(rappelGroup) {
        const rappels = Array.from(rappelGroup.children).sort((a, b) => {
            const dateAString = a.dataset.date;
            const dateBString = b.dataset.date;

            if (dateAString && dateBString) {
                const dateA = new Date(dateAString);
                const dateB = new Date(dateBString);

                return dateA - dateB;
            } else {
                console.error('Attribut data-date manquant:', a, b);
                return 0;
            }
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
            const dateString = rappel.dataset.date;
            console.log(dateString);

            if (dateString) {
                const dateecheance = new Date(dateString);

                if (!isNaN(dateecheance)) {
                    if (dateecheance < today) {
                        rappel.style.backgroundColor = 'red';
                    } else {
                        rappel.style.backgroundColor = ''; // Réinitialise la couleur de fond
                    }
                } else {
                    console.error('Date invalide:', dateString);
                }
            } else {
                console.error('Attribut data-date manquant:', rappel);
            }
        });
    }

    // Initialise la page avec "View All" en bleu et sans texte de filtre
    updateFilter('View All');

    // Ajoutez un gestionnaire d'événements pour chaque ligne de groupe
    groupRows.forEach(function (row) {
        row.addEventListener('click', function () {
            const groupName = row.dataset.groupName;
            console.log(row.dataset.groupName);
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
        });
        updateFilter('View All');
    });
});
