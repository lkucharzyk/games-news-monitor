function GameListItem({ game }) {
  const {
    name,
    steam_appid,
    header_image,
    newsData: { newsitems },
  } = game;

  const lastUpdate = newsitems[0];
  const lastUpdateDate = new Date(lastUpdate.date * 1000).toLocaleDateString();

  return (
    <figure className="game-list-item">
      <div className="left-side">
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
            "Sorry, no data 😓"
          )}
        </div>
      </div>
    </figure>
  );
}

export default GameListItem;
