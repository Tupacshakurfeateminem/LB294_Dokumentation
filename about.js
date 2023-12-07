// Wähle das Formular und die Eingabefelder im Dokument aus
const form = document.querySelector('form');
const table = document.querySelector('table');
const nameinput = document.querySelector('#name');
const symboleInput = document.querySelector('#symbole');
const minPriceInput = document.querySelector('#minPrice');
const maxPriceInput = document.querySelector('#maxPrice');
const averagePriceInput = document.querySelector('#averagePrice');
const currentprice = document.querySelector('#currentprice');


const apiUrl = 'http://localhost:2940/api/v1/entities';

// Überprüfen, ob der Benutzer eingeloggt ist
function isLoggedIn() {
    return localStorage.getItem('accessToken') !== null;
  }
  
  // Füge einen Event-Listener hinzu, der auf das Absenden des Formulars reagiert
  form.addEventListener('submit', (event) => {
    // Verhindere das Neuladen der Seite
    event.preventDefault();
  
    // Überprüfen, ob der Benutzer eingeloggt ist
    if (!isLoggedIn()) {
      console.error('Sie müssen eingeloggt sein, um diese Aktion durchzuführen');
      return;
    }
  
    // Erfasse die Werte der Eingabefelder
    const locationValue = locationInput.value;
    const temperatureValue = temperatureInput.value;
    const descriptionValue = descriptionInput.value;
 // Zeige die Werte der Eingabefelder in der Konsole an
 console.log(nameValue, symboleValue, minPriceValue, maxPricevalue, averagePricevalue, currentPricevalue);

 // Erstelle ein Objekt mit den Daten
 const data = {
   name:  nameValue,
   symbole: symboleValue,
   minPrice: minPriceValue,
   maxPrice: maxPriceValue,
   averagePrice: averagePricevalue,
   currentPrice: currentPricevalue

 };

 // Sende die Daten an den Server
 fetch(api_url, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(data)
 })
 .then(response => response.text())
 .then(message => console.log(message))
 .catch(error => console.error('Fehler:', error));


// Laden Sie die Daten aus der JSON-Datei und erstellen Sie eine Tabelle mit den Daten
fetch(api_url)
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      const row = document.createElement('tr');
      const nameCell = document.createElement('td');
      const symboleCell = document.createElement('td');
      const minPriceCell = document.createElement('td');
      const maxPriceCell = document.createElement('td');
      const averagePriceCell = document.createElement('td');
      const currentPriceCell = document.createElement('td');
      const actionCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      const changeButton = document.createElement('button');

      // Füllen der Tabellenzellen mit Daten
      nameCell.textContent = item.name;
      symboleCell.textContent = item.symbole;
      minPriceCell.textContent = item.minPrice;
      maxPriceCell.textContent = item.maxPrice;
      averagePriceCell.textContent = item.averagePrice;
      currentPriceCell.textContent = item.currentPrice;

      deleteButton.textContent = 'Löschen';
      changeButton.textContent = 'Ändern';

      deleteButton.id = 'delete';
      changeButton.id = 'change';

      actionCell.appendChild(deleteButton);
      actionCell.appendChild(changeButton);

      row.appendChild(nameCell);
      row.appendChild(symboleCell);
      row.appendChild(minPriceCell);
      row.appendChild(maxPriceCell);
      row.appendChild(averagePriceCell);
      row.appendChild(currentPriceCell);

      table.appendChild(row);
    });
  })
  .catch(error => console.error('Fehler:', error));
// Funktion zum Hinzufügen von Börsen Daten
function addBoersenData(name, symbole, minPrice, maxPrice, averagePrice, currentPrice) {
    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, symbole, minPrice, maxPrice, averagePrice, currentPrice })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Success') {
            showNotification('Daten erfolgreich hinzugefügt', true);
        } else {
            showNotification('Fehler beim Hinzufügen der Daten', false);
        }
        getBörsenData(); // Liste nach dem Hinzufügen aktualisieren
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// ... (Weitere Funktionen bleiben unverändert)

// Funktion zur Anzeige von Benachrichtigungen
function showNotification(message, isSuccess) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    notification.style.backgroundColor = isSuccess ? 'green' : 'red';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 4000);
}

// Event Listener für das Formular
const BoersenForm = document.getElementById("kursForm");
BoersenForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("kursName").value;
    const symbole = document.getElementById("kursSymbol").value;
    const minPrice = document.getElementById("minPrice").value;
    const maxPrice = document.getElementById("maxPrice").value;
    const averagePrice = document.getElementById("averagePrice").value;
    const currentPrice = document.getElementById("currentPrice").value;

    addBörsenData(name, symbole, minPrice, maxPrice, averagePrice, currentPrice);
});

// Beim Laden der Seite vorhandene Daten abrufen
document.addEventListener("DOMContentLoaded", function () {
    getBörsenData();
});
fetch(`${api_url}/${nameValue}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newNamenValue,
      symbole: newSymboleValue,
      minPrice: newMinPriceValue,
      maxPrice: newMaxPriceValue,
      averagePrice: newAveragePriceValue,
      currentPrice: newCurrentPriceValue 
    })
  })
     // Sende eine DELETE-Anfrage an den Server
  
      .catch(error => console.error('Fehler:', error));
    // Event-Listener für den "Löschen"-Button
table.addEventListener('click', (event) => {
    if (event.target.id === 'delete') {
      const row = event.target.parentNode.parentNode;
      const nameValue = row.children[0].textContent;
  
      // Sende eine DELETE-Anfrage an den Server
      fetch(`${api_url}/${locationValue}`, {
        method: 'DELETE'
     } )
      .then(response => response.text())
      .then(message => {
        console.log(message);
        // Entferne die Zeile aus der Tabelle
        row.remove();
      })
      .catch(error => console.error('Fehler:', error));
    }
  });})