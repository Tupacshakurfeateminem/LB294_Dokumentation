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
      const symbolElement = createParagraphElement(`Symbol: ${filteredData[0].symbol}`);
      const nameElement = createParagraphElement(`Name: ${filteredData[0].name}`);
      const minPriceElement = createParagraphElement(`Mindestpreis: ${filteredData[0].minPrice} $`);
      const maxPriceElement = createParagraphElement(`Höchstpreis: ${filteredData[0].maxPrice} $`);
      const averagePriceElement = createParagraphElement(`Durchschnittspreis: ${filteredData[0].averagePrice} $`);
      const currentPriceElement = createParagraphElement(`Aktueller Preis: ${filteredData[0].currentPrice} $`);
      
      // Elemente der Börsenkurs-Anzeige hinzufügen
      appendToContainer(boersenItem, [symbolElement, nameElement, currentPriceElement, minPriceElement, maxPriceElement, averagePriceElement]);
      appendToContainer(boersenContainer, [boersenItem]); // Börsenkurs-Anzeige hinzufügen
    } else {
      // Fehlermeldung anzeigen, wenn das Symbol nicht gefunden wurde
      showError(`Symbol '${input}' nicht gefunden.`, boersenContainer);
    }
  } else {
    // Fehlermeldung für ungültige Eingabe anzeigen
    showError("Ungültige Eingabe.", boersenContainer);
  }
}

// Hilfsfunktion zum Erstellen eines <p>-Elements
function createParagraphElement(text) {
  const element = document.createElement("p");
  element.textContent = text;
  return element;
}

// Hilfsfunktion zum Hinzufügen mehrerer Elemente zu einem Container
function appendToContainer(container, elements) {
  elements.forEach(element => container.appendChild(element));
}

// Hilfsfunktion zur Anzeige einer Fehlermeldung
function showError(message, container) {
  console.error(message);
  if (container) {
    const errorElement = createParagraphElement(message);
    errorElement.classList.add("error-message");
    container.appendChild(errorElement);
  } else {
    console.error('Container nicht gefunden.');
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
      showError('Fehler beim Abrufen der Daten: ', error);
    });
}

// Event-Listener für den Klick auf den Submit-Button
document.getElementById("submitButton").addEventListener("click", function() {
  getBoersenDataFromAPI();
});
