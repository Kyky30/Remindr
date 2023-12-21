// Récupération des éléments DOM
const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('ModalCreateGroup');
const closeModalBtn = document.getElementById('closeModalBtn');
const confirmBtn = document.getElementById('confirmBtn');

// Afficher le modal
openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Fermer le modal en cliquant sur la croix
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fermer le modal en cliquant en dehors du modal
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Ajoutez ici le code pour traiter la confirmation du modal
confirmBtn.addEventListener('click', () => {
    const textInputValue = document.getElementById('textInput').value;
    // Ajoutez ici le code pour traiter la valeur du champ texte
    console.log('Text input value:', textInputValue);
    modal.style.display = 'none';
});

document.getElementById('openModalRappelBtn').addEventListener('click', function () {
    document.getElementById('ModalCreateRappel').style.display = 'block';
});

document.getElementById('closeModalRappelBtn').addEventListener('click', function () {
    document.getElementById('ModalCreateRappel').style.display = 'none';
});


document.addEventListener('DOMContentLoaded', function () {
    // Récupération des éléments DOM
    const editButtons = document.querySelectorAll('.editBtn');
    const deleteButtons = document.querySelectorAll('.deleteBtn');
    const saveButtons = document.querySelectorAll('.saveBtn');
    const cancelButtons = document.querySelectorAll('.cancelBtn');

    // Fonction pour activer le mode d'édition
    function activateEditMode(row) {
        row.classList.add('editing');
        const cells = row.querySelectorAll('td:not(:last-child)');
        cells.forEach(cell => {
            const text = cell.textContent.trim();
            cell.innerHTML = `<input type="text" value="${text}" />`;
        });
    }

    // Fonction pour désactiver le mode d'édition
    function deactivateEditMode(row) {
        row.classList.remove('editing');
        const cells = row.querySelectorAll('td:not(:last-child)');
        cells.forEach(cell => {
            const input = cell.querySelector('input');
            cell.textContent = input.value;
        });
    }

    // Gestion des événements pour les boutons Modifier
    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            const row = this.closest('tr');
            activateEditMode(row);
            this.style.display = 'none';
            row.querySelector('.deleteBtn').style.display = 'none';
            row.querySelector('.saveBtn').style.display = 'inline-block';
            row.querySelector('.cancelBtn').style.display = 'inline-block';
        });
    });

    // Gestion des événements pour les boutons Valider
    saveButtons.forEach(button => {
        button.addEventListener('click', async function () {
            const row = this.closest('tr');
            const rappelId = row.dataset.rappelId;
            const inputs = row.querySelectorAll('input');
            const name = inputs[0].value;
            const description = inputs[1].value;
            const dateecheance = inputs[2].value;

            // Ajoutez ici la logique pour mettre à jour le rappel avec les nouvelles valeurs
            try {
                await fetch(`/update-rappel/${rappelId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, description, dateecheance }),
                });

                // Mettez à jour la vue côté client (facultatif)
                row.querySelector('td:nth-child(1)').textContent = name;
                row.querySelector('td:nth-child(2)').textContent = description;
                row.querySelector('td:nth-child(3)').textContent = dateecheance;

                
                this.style.display = 'none';
                row.querySelector('.editBtn').style.display = 'inline-block';
                row.querySelector('.deleteBtn').style.display = 'inline-block';
                row.querySelector('.saveBtn').style.display = 'none';
                row.querySelector('.cancelBtn').style.display = 'none';

                deactivateEditMode(row);
            } catch (error) {
                console.error('Error updating rappel:', error);
            }
        });
    });

    // Gestion des événements pour les boutons Annuler
    cancelButtons.forEach(button => {
        button.addEventListener('click', function () {
            const row = this.closest('tr');
            deactivateEditMode(row);
            row.querySelector('.editBtn').style.display = 'inline-block';
            row.querySelector('.deleteBtn').style.display = 'inline-block';
            row.querySelector('.saveBtn').style.display = 'none';
            this.style.display = 'none';
        });
    });

    // Gestion des événements pour les boutons Supprimer
    deleteButtons.forEach(button => {
        button.addEventListener('click', async function () {
            const row = this.closest('tr');
            const rappelId = row.dataset.rappelId;

            // Ajoutez ici la logique pour supprimer le rappel avec l'ID rappelId
            try {
                await fetch(`/delete-rappel/${rappelId}`, {
                    method: 'DELETE',
                });

                // Supprimez la ligne côté client (facultatif)
                row.remove();
            } catch (error) {
                console.error('Error deleting rappel:', error);
            }
        });
    });
});




// Récupération des éléments DOM pour le modal Ajouter un utilisateur
const openAddUserModalBtn = document.getElementById('openAddUserModalBtn');
const addUserModal = document.getElementById('AddUserModal');
const closeAddUserModalBtn = document.getElementById('closeAddUserModalBtn');
const addUserForm = document.getElementById('addUserForm');

// Afficher le modal Ajouter un utilisateur
openAddUserModalBtn.addEventListener('click', () => {
    addUserModal.style.display = 'block';
    
});

// Fermer le modal en cliquant sur la croix
closeAddUserModalBtn.addEventListener('click', () => {
    addUserModal.style.display = 'none';
});

// Fermer le modal en cliquant en dehors du modal
window.addEventListener('click', (event) => {
    if (event.target === addUserModal) {
        addUserModal.style.display = 'none';
    }
});

// Envoyer le formulaire Ajouter un utilisateur
addUserForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const groupId = addUserForm.elements.selectGroup.value;
    const userId = addUserForm.elements.selectUser.value;

    // Ajoutez ici la logique pour ajouter l'utilisateur au groupe
    try {
        await fetch(`/add-user-to-group/${groupId}/${userId}`, {
            method: 'POST',
        });

        // Mettez à jour la vue côté client (facultatif)
        // Ajoutez ici la logique pour mettre à jour votre interface utilisateur
        console.log('Utilisateur ajouté au groupe avec succès.');

        // Fermez le modal Ajouter un utilisateur
        addUserModal.style.display = 'none';
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur au groupe:', error);
    }
});




document.getElementById('openModalAddUserBtn').addEventListener('click', function () {
    document.getElementById('ModalAddUser').style.display = 'block';
});

document.getElementById('closeModalAddUserBtn').addEventListener('click', function () {
    document.getElementById('ModalAddUser').style.display = 'none';
});