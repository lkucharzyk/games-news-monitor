import { useState, useEffect } from "react";

import Header from "./components/Header";
import Search from "./components/Search";
import GamesList from "./components/GamesList";
import GameDetails from "./components/GameDetails";

const APIKey = "B143DB1BFAD78F22D9EC882124CD634E";

function App() {
  const [savedGameIDs, setSavedGameIDs] = useState([169208, 115555, 140669]);
  const [savedGamesData, setSavedGamesData] = useState([]);

  async function searchInDB(query) {
    const res = await fetch(`http://localhost:8000/v4/search`, {
      mode: "cors",
      method: "POST",
      body: `search ${query}; fields name,game;`,
    });
    const data = await res.json();
    console.log(data);
  }

  //fetch data aobut game from user list
  useEffect(() => {
    if (savedGameIDs) {
      // async function fetchGamesData() {
      //let incompleteData;
      async function fetchGamesData() {
        const res = await fetch(`http://localhost:8000/v4/games`, {
          mode: "cors",
          method: "POST",
          body: `fields name,updated_at,release_dates; where id = (${savedGameIDs.join()});`,
        });
        const data = await res.json();

        const releasesIds = data.map((game) => ({
          title: game.name,
          releaseID: game.release_dates ? game.release_dates[0] : null,
        }));

        const releasesIdsString = releasesIds
          .filter((id) => id.releaseID !== null)
          .map((id) => id.releaseID)
          .join();

        const res2 = await fetch(`http://localhost:8000/v4/release_dates`, {
          mode: "cors",
          method: "POST",
          body: `fields *; where id = (${releasesIdsString});`,
        });
        const data2 = await res2.json();

        // console.log(data);
        // console.log(data2);

        const finalData = data.map((game) => {
          const releaseDate = data2.filter((date) => date.game === game.id);
          //console.log(releaseDate[0].human);
          return {
            ...game,
            lastReleaseDate: releaseDate[0] ? releaseDate[0].human : "no data",
          };
        });
        console.log(finalData);
      }
      fetchGamesData();
    }
  }, [savedGameIDs]);

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Search />
        <section className="results">
          <GamesList savedGamesData={savedGamesData} />
          <GameDetails />
        </section>
      </div>
    </div>
  );
}

export default App;
