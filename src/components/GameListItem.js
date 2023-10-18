function GameListItem({ game, onOpenGame, onRemoveGameFromSaved, lastVisit }) {
  const { name, steam_appid, header_image, newsData } = game;
  let lastUpdate;
  if (newsData[0].date !== 1) {
    lastUpdate = newsData[0];
  } else {
    lastUpdate = null;
  }
  let newsHighlith;

  if (lastUpdate && lastUpdate.date > +lastVisit) {
    newsHighlith = true;
  } else {
    newsHighlith = false;
  }
  const lastUpdateDate = lastUpdate
    ? new Date(lastUpdate.date * 1000).toLocaleDateString()
    : null;

  return (
    <figure className="game-list-item box">
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

        <div className={`date ${newsHighlith ? "highlighted" : ""}`}>
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
