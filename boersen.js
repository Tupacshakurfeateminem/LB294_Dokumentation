const apiUrl = 'http://localhost:2940/api/v1/entities'; // API-URL für Börsendaten

// Funktion zum Anzeigen von Börsendaten basierend auf dem eingegebenen Börsensymbol
function displayBoersenData(data) {
  const boersenContainer = document.querySelector(".boersen-container");
  boersenContainer.innerHTML = ''; // Leeren des Container-Elements

  const input = document.getElementById("input").value.trim(); // Eingabewert abrufen und Trimmen

  // Überprüfen, ob die Eingabe ein String ist
  if (typeof input === 'string' || input instanceof String) {
    const filteredData = data.filter(item => item.symbol === input);

    if (filteredData.length > 0) {
      // Erstellen der Börsenkurs-Anzeige für das gefilterte Symbol
      const boersenItem = document.createElement("div");
      boersenItem.classList.add("boersen-item");

      // Elemente für Börsenkurs erstellen und hinzufügen
      const symbolElement = document.createElement("p");
      symbolElement.textContent = `Symbol: ${filteredData[0].symbol}`;

      const nameElement = document.createElement("p");
      nameElement.textContent = `Name: ${filteredData[0].name}`;

      const minPriceElement = document.createElement("p");
      minPriceElement.textContent = `Mindestpreis: ${filteredData[0].minPrice} $`;

      const maxPriceElement = document.createElement("p");
      maxPriceElement.textContent = `Höchstpreis: ${filteredData[0].maxPrice} $`;

      const averagePriceElement = document.createElement("p");
      averagePriceElement.textContent = `Durchschnittspreis: ${filteredData[0].averagePrice} $`;

      const currentPriceElement = document.createElement("p");
      currentPriceElement.textContent = `Aktueller Preis: ${filteredData[0].currentPrice} $`;
      
      // Elemente der Börsenkurs-Anzeige hinzufügen
      boersenItem.appendChild(symbolElement);
      boersenItem.appendChild(nameElement);
      boersenItem.appendChild(currentPriceElement);
      boersenItem.appendChild(minPriceElement);
      boersenItem.appendChild(maxPriceElement);
      boersenItem.appendChild(averagePriceElement);

      boersenContainer.appendChild(boersenItem); // Börsenkurs-Anzeige hinzufügen
    } else {
      // Fehlermeldung anzeigen, wenn das Symbol nicht gefunden wurde
      console.error(`Symbol '${input}' nicht gefunden.`);
      const errorElement = document.createElement("p");
      errorElement.textContent = `Symbol '${input}' nicht gefunden.`;
      errorElement.classList.add("error-message"); // Klasse zum Styling oder zur Anzeige hinzufügen

      boersenContainer.appendChild(errorElement); // Fehlermeldung hinzufügen
    }
  } else {
    // Fehlermeldung für ungültige Eingabe anzeigen
    console.error("Ungültige Eingabe.");
  }
}

// Funktion zum Abrufen von Börsendaten über die API
function getBoersenDataFromAPI() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayBoersenData(data); // Anzeige der Börsendaten
    })
    .catch(error => {
      console.error('Fehler beim Abrufen der Daten:', error);
    });
}

// Event-Listener für den Klick auf den Submit-Button
document.getElementById("submitButton").addEventListener("click", function() {
  getBoersenDataFromAPI();
});