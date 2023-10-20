import { useState, useEffect, useRef } from "react";

import LoadingSpinner from "./LoadingSpinner";
import SearchResultItem from "./SearchResultItem";

function Search({ onAddGameToSaved }) {
  const [gamesList, setGamesList] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [foundGames, setFoundGames] = useState([]);

  const inputEl = useRef(null);

  function clearFoundGames() {
    setFoundGames([]);
    inputEl.current.value = "";
  }

  function search(e) {
    const query = e.target.value;
    if (query.length < 3) {
      setFoundGames([]);
      return;
    }
    const found = gamesList.filter((game) =>
      game.name.toLowerCase().includes(query.toLowerCase())
    );
    setFoundGames(found);
  }

  useEffect(() => {
    const baseURL = "https://games-updates-monitor-backend.onrender.com";
    async function fetchGamesList() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${baseURL}/ISteamApps/GetAppList/v0002/?key=${process.env.REACT_APP_API_KEY}&format=json`
        );
        if (!res.ok) {
          throw new Error("fetch game list error");
        }
        const data = await res.json();
        setGamesList(data.applist.apps);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    }
    //fetchGamesList();
  }, []);

  return (
    <section className="search">
      {isLoading && (
        <LoadingSpinner
          size={20}
          message="Preparing game list. This can take few seconds"
        />
      )}
      <input
        type="text"
        placeholder="Search for games..."
        disabled={isLoading}
        onChange={(e) => search(e)}
        ref={inputEl}
      />
      {foundGames && (
        <div className="search-results">
          {foundGames.map((game) => (
            <SearchResultItem
              key={game.appid + "s"}
              game={game}
              onAddGameToSaved={onAddGameToSaved}
              clearFoundGames={clearFoundGames}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Search;
