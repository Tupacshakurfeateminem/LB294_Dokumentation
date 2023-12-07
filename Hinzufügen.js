const form = document.querySelector('#kursForm');
const table = document.querySelector('#boersen-list');
const nameinput = document.querySelector('#kursName');
const symboleInput = document.querySelector('#kursSymbol');
const minPriceInput = document.querySelector('#minPrice');
const maxPriceInput = document.querySelector('#maxPrice');
const averagePriceInput = document.querySelector('#averagePrice');
const currentPriceInput = document.querySelector('#currentPrice');

const api_url = 'http://localhost:2940/api/v1/entities';

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
    fetch(api_url, {
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

    })
    .catch(error => console.error('Fehler:', error));
});
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

// Event-Listener für den "Löschen"-Button
table.addEventListener('click', (event) => {
  if (event.target.id === 'delete') {
    const row = event.target.parentNode.parentNode;
    const nameValue = row.children[0].textContent;

    // Sende eine DELETE-Anfrage an den Server
    fetch($,{api_url}, {
      method: 'DELETE'
    })
    .then(response => response.text())
    .then(message => {
      console.log(message);
      // Entferne die Zeile aus der Tabelle
      row.remove();
    })
    .catch(error => console.error('Fehler:', error));
  }
});

// Event-Listener für den "Ändern"-Button
table.addEventListener('click', (event) => {
  if (event.target.id === 'change') {
    const row = event.target.parentNode.parentNode;
    const nameCell = row.children[0];
    const symboleCell = row.children[1];
    const minPriceCell = row.children[2];
    const maxPriceCell = row.children[3];
    const averagePriceCell = row.children[4];
    const currentPriceCell = row.children[5];


    const nameValue = nameCell.textContent;
    const newnameValue = prompt('Geben Sie die neue Aktie ein', nameValue);
    const newsymboleValue = prompt('Geben Sie das neue Symbol ein', symboleCell.textContent);
    const newminPriceValue = prompt('Geben Sie den Mindest Preis ein', minPriceCell.textContent);
    const newmaxPriceValue = prompt('Geben Sie den Maximal Preis ein', maxPriceCell.textContent);
    const newaveragePriceValue = prompt('Geben Sie den Durchschnitts Preis ein', averagePriceCell.textContent);
    const newcurrentPriceValue = prompt('Geben Sie den aktuel Preis ein', currentPriceCell.textContent);


    // Sende eine PUT-Anfrage an den Server
    fetch(`${api_url}/${nameValue}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newnameValue,
        symbole: newsymboleValue,
        minPrice: newminPriceValue,
        maxPrice: newmaxPriceValue,
        averagePrice: newaveragePriceValue,
        currentPrice: newcurrentPriceValue
      })
    })
    .then(response => response.text())
    .then(message => {
      console.log(message);
      // Aktualisiere die Werte in der Tabelle
      nameCell.textContent = newnameValue;
      symboleCell.textContent = newsymboleValue;
      minPriceCell.textContent = newminPriceValue;
      maxPriceCell.textContent = newmaxPriceValue;
      averagePriceCell.textContent = newaveragePriceValue;
      currentPriceCell.textContent = newcurrentPriceValue;

    })
    .catch(error => console.error('Fehler:', error));
  }
});
