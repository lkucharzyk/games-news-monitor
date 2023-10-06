function GameListItem({ game }) {
  const { name, lastReleaseDate } = game;
  //const updateDate = new Date(updated_at * 1000).toLocaleDateString();

  return (
    <figure className="game-list-item">
      <div>
        <img
          src="https://cdn.akamai.steamstatic.com////steam////apps////1029780////capsule_184x69.jpg?t=1690884674"
          alt="data.capsule_imagev5"
        ></img>
      </div>
      <div>
        <h5>{name}</h5>
      </div>

      <div>
        {lastReleaseDate
          ? `Last update: ${lastReleaseDate}`
          : "Sorry, no data 😓"}
      </div>
    </figure>
  );
}

export default GameListItem;
