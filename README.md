# 🚌Stockholm Transport Departure Schedule🚇

This React app displays a live departure schedule for trains, metro, and buses in Stockholm, using the [Trafiklab.se](https://www.trafiklab.se/) open API. The app shows upcoming schedules from selected stations and allows users to filter by specific lines.

The project is designed for local deployment, intended to run on for example on a raspberry pi connected to a monitor. For example in a pub environment🍺.
## Features
- Displays real-time departure schedules for trains, metro, and buses in Stockholm.
- Allows users to select specific stations and see upcoming departures.
- Option to filter by specific lines (e.g., specific train, metro, or bus).

## Technologies Used
- React
- [Trafiklab.se](https://www.trafiklab.se/) Open API
- HTML, CSS, JavaScript
- Axios (for API requests)

## Getting Started

To run the app locally, follow these steps:

### Prerequisites
- Node.js (v14 or above)
- npm (or yarn)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Mammamu4/Foo-Bar-Departures.git
   cd Foo-Bar-Departures

2. Install dependencies:
   ```bash
    npm install

3. Obtain an API key from [Trafiklab.se](https://www.trafiklab.se/).

4. Setup environment variables.

5. Specify stations and specific lines in [departures.json](https://github.com/Mammamu4/Foo-Bar-Departures/blob/main/src/assets/departures.json)
```javascript
{
  "allowedDepartures": ["Buss 179", "Tunnelbana 11", "Tåg 41"],
  "stations": [740012883, 740000701] // Kista centrum and Helenelund
  // Stationids are found through the trafiklab.se open API
}
```



5. Build project and serve!

### Environmental Variables Explanation
   - **VITE_RESROBOT_ACCESS_ID**
      - Your api key
   - **VITE_UPDATE_FREQUENCY**
      - Update frequency for api fetch in ms (60000 = 1 min)
   - **VITE_RESROBOT_API_BASE_URL**
      - API base url (https://api.resrobot.se/v2.1/departureBoard)
   - **VITE_API_DURATION**
      - Timespan to fetch departures in minutes,
      - 60 means fetching all departures 1 hour ahead of now
## Authors

- [@mammamu4](https://www.github.com/mammamu4)

