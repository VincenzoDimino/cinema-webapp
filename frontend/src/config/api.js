// URL base dell'API backend (Spring Boot)

// Questo approccio permette di usare la STESSA web app
// sia in locale che in produzione (Render).

// - In produzione (Render):
//   viene usata la variabile d'ambiente REACT_APP_API_URL
//   che punta all'URL pubblico del backend deployato.

// - In sviluppo locale:
//   se la variabile non esiste, viene usato localhost:8080.

const API_BASE_URL =
    process.env.REACT_APP_API_URL || "http://localhost:8080/api";

export default API_BASE_URL;
