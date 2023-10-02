import { useState, useEffect } from "react";

import Header from "./components/Header";
import Search from "./components/Search";
import GamesList from "./components/GamesList";
import GameDetails from "./components/GameDetails";

const APIKey = "B143DB1BFAD78F22D9EC882124CD634E";

//http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=B143DB1BFAD78F22D9EC882124CD634E&format=json
//https://store.steampowered.com/api/appdetails?appids=1029780
//https://api.steampowered.com/ISteamNews/GetNewsForApp/v2?appid=1029780

function App() {
  const [savedGameIDs, setSavedGameIDs] = useState([1426450, 1029780, 1145360]);
  const [savedGameData, setSavedGameData] = useState([]);

  useEffect(() => {
    if (savedGameIDs) {
      async function fetchLastUpadeDates() {
        const newSavedGamesData = [];
        savedGameIDs.forEach((game) => {});
      }
    }
  }, [savedGameIDs]);

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Search />
        <section className="results">
          <GamesList />
          <GameDetails />
        </section>
      </div>
    </div>
  );
}

export default App;
