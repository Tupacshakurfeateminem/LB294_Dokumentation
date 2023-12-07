// Wähle das Formular und die Eingabefelder im Dokument aus
const form = document.querySelector('#kursForm');
const table = document.querySelector('#boersen-list');
const nameinput = document.querySelector('#kursName');
const symboleInput = document.querySelector('#kursSymbol');
const minPriceInput = document.querySelector('#minPrice');
const maxPriceInput = document.querySelector('#maxPrice');
const averagePriceInput = document.querySelector('#averagePrice');
const currentPriceInput = document.querySelector('#currentPrice');

const apiUrl = 'http://localhost:2940/api/v1/entities';

// Überprüfen, ob der Benutzer eingeloggt ist
function isLoggedIn() {
    return localStorage.getItem('accessToken') !== null;
}

// Event Listener für das Formular
form.addEventListener('submit', (event) => {
    // Verhindere das Neuladen der Seite
    event.preventDefault();

    // Überprüfen, ob der Benutzer eingeloggt ist
    if (!isLoggedIn()) {
        console.error('Sie müssen eingeloggt sein, um diese Aktion durchzuführen');
        return;
    }

    // Erfasse die Werte der Eingabefelder
    const nameValue = nameinput.value;
    const symboleValue = symboleInput.value;
    const minPriceValue = minPriceInput.value;
    const maxPriceValue = maxPriceInput.value;
    const averagePriceValue = averagePriceInput.value;
    const currentPriceValue = currentPriceInput.value;

    // Zeige die Werte der Eingabefelder in der Konsole an
    console.log(nameValue, symboleValue, minPriceValue, maxPriceValue, averagePriceValue, currentPriceValue);

    // Erstelle ein Objekt mit den Daten
    const data = {
        name: nameValue,
        symbole: symboleValue,
        minPrice: minPriceValue,
        maxPrice: maxPriceValue,
        averagePrice: averagePriceValue,
        currentPrice: currentPriceValue
    };

    // Sende die Daten an den Server
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(message => {
        console.log(message);
        // Hier können Sie weitere Aktionen nach dem Hinzufügen der Daten durchführen
        // Zum Beispiel die Tabelle aktualisieren oder eine Benachrichtigung anzeigen
    })
    .catch(error => console.error('Fehler:', error));
});
