import { useState, useEffect } from "react";

import Header from "./components/Header";
import Search from "./components/Search";
import GamesList from "./components/GamesList";
import GameDetails from "./components/GameDetails";

const APIKey = "B143DB1BFAD78F22D9EC882124CD634E";

function App() {
  const [savedGameIDs, setSavedGameIDs] = useState();
  const [savedGameData, setSavedGameData] = useState([]);

  useEffect(() => {
    if (true) {
      async function fetchGamesData() {
        // const newSavedGamesData = [];
        //for (const game of savedGameIDs) {
        const res = await fetch(`http://localhost:8000/v4/search`, {
          mode: "cors",
          method: "GET",
        });
        const data = await res.json();
        console.log(data);
        //}
      }
      // async function fetchGamesData2() {

      fetchGamesData();
    }
  }, []);

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
