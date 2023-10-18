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
  const [openGame, setOpenGame] = useState(null);
  const [visitDate, setVisitDate] = useState(getLastVisitDateFromLS);

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

  function handleOpenGame(id) {
    setOpenGame(+id);
  }

  function handleRemoveGameFromSaved(id) {
    initialized.current = false;
    setOpenGame(null);
    setSavedGameIDs((state) => state.filter((entry) => +entry !== +id));
    setSavedGamesData((state) =>
      state.filter((entry) => +entry.steam_appid !== +id)
    );
  }

  function getIDsFromLocalStorage() {
    if (localStorage.getItem("savedGameIDs")) {
      return localStorage.getItem("savedGameIDs").split(",");
    } else {
      return [271590, 1091500, 1245620]; //some games added on start for better app presentation
    }
  }

  function getLastVisitDateFromLS() {
    if (localStorage.getItem("lastVisitDate")) {
      return localStorage.getItem("lastVisitDate");
    } else {
      return null;
    }
  }

  //update local storage
  useEffect(
    () => localStorage.setItem("savedGameIDs", savedGameIDs.toString()),
    [savedGameIDs]
  );

  //save date of user last visit
  useEffect(() => {
    const handleTabClose = (event) => {
      event.preventDefault();

      const date = Date.now().toString();
      localStorage.setItem("lastVisitDate", date);
    };
    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  //fetching game data
  useEffect(() => {
    const baseURL = "https://games-updates-monitor.onrender.com";
    if (!initialized.current) {
      initialized.current = true;
      if (savedGameIDs) {
        //fetch data aobut game from user list
        async function fetchGamesData() {
          setIsLoading(true);
          let gamesData = savedGamesData;

          for (const game of savedGameIDs) {
            if (gamesData.every((entry) => +entry.steam_appid !== +game)) {
              let singleGameData;
              try {
                const res = await fetch(
                  `${baseURL}/api/appdetails?appids=${game}&key=${process.env.API_KEY}`
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
                  `${baseURL}/ISteamNews/GetNewsForApp/v0002/?appid=${game}&count=20&key=${process.env.API_KEY}&format=json`
                );
                if (!res2.ok) {
                  throw new Error("fetch app news error");
                }
                const data2 = await res2.json();

                let unsortedNews;
                if (data2.appnews.newsitems.length > 0) {
                  unsortedNews = data2.appnews.newsitems;
                } else {
                  unsortedNews = null;
                }

                //filter news for updates
                //Because the steam API return news without propety if is news update or other stuff, I try to check this by searching strings in the title (which is not perfect, but probably nothing better can be done here
                if (unsortedNews) {
                  const requiredStrings = ["patch", "fix", "update"];
                  const updatesNews = requiredStrings.map((string) => {
                    const arrays = unsortedNews.filter((news) =>
                      news.title.toLowerCase().includes(string)
                    );
                    return arrays;
                  });

                  const updatesNewsConcat = updatesNews[0]
                    .concat(updatesNews[1])
                    .concat(updatesNews[2]);

                  const duplicatedFiltered = updatesNewsConcat.filter(
                    (value, index) => updatesNewsConcat.indexOf(value) === index
                  );

                  const sortedNews = duplicatedFiltered
                    .sort((a, b) => a.date - b.date)
                    .reverse();

                  singleGameData = {
                    ...singleGameData,
                    newsData: sortedNews,
                  };
                } else {
                  singleGameData = {
                    ...singleGameData,
                    newsData: [{ date: 1 }], //fake news for sorting
                  };
                }
              } catch (err2) {
                console.log(err2.message);
              }

              gamesData.push(singleGameData);
            }
          }
          gamesData
            .sort((a, b) => a.newsData[0].date - b.newsData[0].date)
            .reverse();
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
                onOpenGame={handleOpenGame}
                onRemoveGameFromSaved={handleRemoveGameFromSaved}
                lastVisit={visitDate}
              />
              {openGame && (
                <GameDetails
                  game={savedGamesData.filter(
                    (game) => game.steam_appid === openGame
                  )}
                  onClose={setOpenGame}
                />
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
