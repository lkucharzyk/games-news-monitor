import { useEffect } from "react";

function GameListItem({ game, onOpenGame, onRemoveGameFromSaved }) {
  const {
    name,
    steam_appid,
    header_image,
    newsData: { newsitems },
  } = game;

  //Because the steam API return news without propety if is news update or other stuff, I try to check this by searching strings in the title (which is not perfect, but probably nothing better can be done here)
  let lastUpdateDate;

  function filterUpdates() {
    const requiredStrings = ["patch", "fix", "update"];
    const updatesNews = requiredStrings.map((string) => {
      const arrays = newsitems.filter((news) =>
        news.title.toLowerCase().includes(string)
      );
      return arrays;
    });

    const updatesNewsConcat = updatesNews[0]
      .concat(updatesNews[1])
      .concat(updatesNews[2]);
    const newsSorted = updatesNewsConcat.sort((a, b) => a.date - b.date);

    const lastUpdate = newsSorted[newsSorted.length - 1];
    lastUpdateDate = lastUpdate
      ? new Date(lastUpdate.date * 1000).toLocaleDateString()
      : null;
  }
  filterUpdates();

  return (
    <figure className="game-list-item">
      <div className="left-side" onClick={() => onOpenGame(steam_appid)}>
        <div className="logo">
          <img src={header_image} alt={`${name} logo`}></img>
        </div>
        <div className="title">
          <h5>{name}</h5>
        </div>
      </div>

      <div className="right-side">
        <div className="link">
          <a href={`https://store.steampowered.com/app/${steam_appid}`}>
            Steam page
          </a>
        </div>

        <div className="date">
          {lastUpdateDate ? (
            <>
              Last update: <br /> {lastUpdateDate}
            </>
          ) : (
            <>
              No updates <br /> data 😓
            </>
          )}
        </div>
        <div
          className="remove"
          role="button"
          onClick={() => onRemoveGameFromSaved(steam_appid)}
        >
          ❌ <br />
          Remove
        </div>
      </div>
    </figure>
  );
}

export default GameListItem;
