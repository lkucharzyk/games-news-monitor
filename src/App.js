import { useState, useEffect, useRef } from "react";

import Header from "./components/Header";
import Search from "./components/Search";
import GamesList from "./components/GamesList";
import GameDetails from "./components/GameDetails";
import LoadingSpinner from "./components/LoadingSpinner";
import Alert from "./components/Alert";

function App() {
  const [savedGameIDs, setSavedGameIDs] = useState(getIDsFromLocalStorage);
  const [savedGamesData, setSavedGamesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const initialized = useRef(false);

  function handleAddGameToSaved(id) {
    initialized.current = false;
    if (savedGameIDs.every((entry) => +entry !== +id)) {
      setSavedGameIDs((state) => [...state, id]);
    } else {
      setAlert({ type: "yellow", message: "Game already added" });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
  }

  function handleRemoveGameFromSaved(id) {
    initialized.current = false;
    setSavedGameIDs((state) => state.filter((entry) => +entry !== +id));
    setSavedGamesData((state) =>
      state.filter((entry) => +entry.steam_appid !== +id)
    );
  }

  function getIDsFromLocalStorage() {
    if (localStorage.getItem("savedGameIDs")) {
      return localStorage.getItem("savedGameIDs").split(",");
    } else {
      return [];
    }
  }

  //update local storage
  useEffect(
    () => localStorage.setItem("savedGameIDs", savedGameIDs.toString()),
    [savedGameIDs]
  );

  //fetching game data
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      if (savedGameIDs) {
        //fetch data aobut game from user list
        async function fetchGamesData() {
          setIsLoading(true);
          let gamesData = savedGamesData;

          for (const game of savedGameIDs) {
            if (gamesData.every((entry) => +entry.steam_appid !== +game)) {
              console.log(`game ${game} fetched`);
              let singleGameData;
              try {
                const res = await fetch(
                  `http://localhost:8000/api/appdetails?appids=${game}&key=${process.env.API_KEY}`
                );
                if (!res.ok) {
                  throw new Error("fetch app details error");
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
                  throw new Error("fetch app news error");
                }
                const data2 = await res2.json();
                singleGameData = { ...singleGameData, newsData: data2.appnews };
              } catch (err2) {
                console.log(err2.message);
              }

              gamesData.push(singleGameData);
            } else {
              console.log(`game NOT ${game} fetched`);
            }
          }
          // console.log(gamesData);
          setSavedGamesData(gamesData);
          setIsLoading(false);
        }

        fetchGamesData();
      }
    }
  }, [savedGameIDs, savedGamesData]);

  return (
    <div className="App">
      <Header />
      <div className="container">
        {alert && <Alert alert={alert} />}
        <Search onAddGameToSaved={handleAddGameToSaved} />
        <section className="results">
          {isLoading ? (
            <LoadingSpinner size={100} />
          ) : (
            <>
              <GamesList
                savedGamesData={savedGamesData}
                onRemoveGameFromSaved={handleRemoveGameFromSaved}
              />
              <GameDetails />
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
