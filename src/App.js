import { useState, useEffect } from "react";

import Header from "./components/Header";
import Search from "./components/Search";
import GamesList from "./components/GamesList";
import GameDetails from "./components/GameDetails";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [savedGameIDs, setSavedGameIDs] = useState([323190, 1121640, 1426450]);
  const [savedGamesData, setSavedGamesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleAddGameToSaved(id) {
    setSavedGameIDs((state) => [...state, id]);
  }

  useEffect(() => {
    if (savedGameIDs) {
      //fetch data aobut game from user list
      async function fetchGamesData() {
        setIsLoading(true);
        const gamesData = [];
        for (const game of savedGameIDs) {
          let singleGameData;
          try {
            const res = await fetch(
              `http://localhost:8000/api/appdetails?appids=${game}&key=${process.env.API_KEY}`
            );
            if (!res.ok) {
              throw new Error("fetch1 error");
            }
            const data = await res.json();
            singleGameData = data[Object.keys(data)[0]].data;
          } catch (err) {
            console.log(err.message);
          }

          try {
            const res2 = await fetch(
              `http://localhost:8000/ISteamNews/GetNewsForApp/v0002/?appid=${game}&count=10&key=${process.env.API_KEY}&format=json`
            );
            if (!res2.ok) {
              throw new Error("fetch2 error");
            }
            const data2 = await res2.json();
            singleGameData = { ...singleGameData, newsData: data2.appnews };
          } catch (err2) {
            console.log(err2.message);
          }

          gamesData.push(singleGameData);
        }
        setSavedGamesData(gamesData);
        setIsLoading(false);
      }

      fetchGamesData();
    }
  }, [savedGameIDs]);

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Search onAddGameToSaved={handleAddGameToSaved} />
        <section className="results">
          {isLoading ? (
            <LoadingSpinner size={100} />
          ) : (
            <>
              <GamesList savedGamesData={savedGamesData} />
              <GameDetails />
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
