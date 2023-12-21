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