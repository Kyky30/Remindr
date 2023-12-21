document.addEventListener("DOMContentLoaded", function () {
    // Attend que le DOM soit chargé

    // Sélectionne tous les éléments de la classe 'rappelGroup'
    var rappelRows = document.querySelectorAll('.rappelGroup tr');

    // Parcours chaque ligne de rappel
    rappelRows.forEach(function (row) {
        // Obtient la date d'échéance de la ligne actuelle
        var dateEcheance = new Date(row.getAttribute('data-date'));

        // Obtient la date actuelle
        var currentDate = new Date();

        // Compare les dates
        if (dateEcheance < currentDate) {
            // Si la date d'échéance est dépassée, applique un arrière-plan rouge
            // applique la classe expired
            row.classList.add('expired');
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Attend que le DOM soit chargé

    // Sélectionne le tbody contenant les rappels
    var rappelsTableBody = document.getElementById('rappelsTable').getElementsByTagName('tbody')[0];

    // Obtient toutes les lignes de rappel
    var rappelRows = rappelsTableBody.getElementsByTagName('tr');

    // Convertit les lignes de rappel en un tableau pour le tri
    var rappelArray = Array.from(rappelRows);

    // Trie le tableau par date d'échéance (du plus urgent au moins urgent)
    rappelArray.sort(function (a, b) {
        var dateA = new Date(a.getAttribute('data-date'));
        var dateB = new Date(b.getAttribute('data-date'));

        return dateA - dateB;
    });

    // Ajoute les lignes triées au tbody
    rappelArray.forEach(function (row) {
        rappelsTableBody.appendChild(row);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with the class 'groupRow'
    const groupRows = document.querySelectorAll('.groupRow');
    //remove the class selected-filter from all rows
    // Add a click event listener to each row
    groupRows.forEach(row => {
        row.addEventListener('click', function() {
            removeSelectedFilter()
            // Log the group name
            //Ajoute la classe selected-filter à la ligne cliquée
            this.classList.add('selected-filter');
            console.log(this.dataset.groupName);
            hideRemindersNotInGroup(this.dataset.groupName);
        });
    });
});


// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Select the element with the id 'viewAllRow'
    const viewAllRow = document.getElementById('viewAllRow');

    // Add a click event listener to the element
    viewAllRow.addEventListener('click', function() {
        showAllReminders(); //Affiche tous les rappels
        document.getElementById('viewAllRow').classList.add('selected-filter');
    });
});


function hideRemindersNotInGroup(groupName) {
    // Select all reminder elements
    // enleve la classe selected-filter de viewAllRow
    document.getElementById('viewAllRow').classList.remove('selected-filter');
    var rappelRows = document.querySelectorAll('.rappelGroup tr');

    // Loop through each reminder
    rappelRows.forEach(function(row) {
        var RawGroupName = row.getAttribute('data-group-name');
        // If the reminder does not belong to the group, hide it
        if (RawGroupName !== groupName) {
            row.style.display = 'none';
        } else {
            // Otherwise, make sure it's visible
            row.style.display = '';
        }
    });
}
function showAllReminders() {
    // Select all reminder elements
    removeSelectedFilter();
    var rappelRows = document.querySelectorAll('.rappelGroup tr');
    // Loop through each reminder
    rappelRows.forEach(function(row) {
        // Make sure the reminder is visible
        row.style.display = '';
    });
}

function removeSelectedFilter() {
    // Select all elements with the class 'selected-filter'
    const selectedElements = document.querySelectorAll('.selected-filter');

    // Loop through each element
    selectedElements.forEach(element => {
        // Remove the class 'selected-filter'
        element.classList.remove('selected-filter');
    });
}