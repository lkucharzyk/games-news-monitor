function GameListItem() {
  return (
    <figure className="game-list-item">
      <div>
        <img
          src="https://cdn.akamai.steamstatic.com////steam////apps////1029780////capsule_184x69.jpg?t=1690884674"
          alt="data.capsule_imagev5"
        ></img>
      </div>
      <div>
        <h5>Game title data.name</h5>
      </div>

      <div>Last news: date</div>
    </figure>
  );
}

export default GameListItem;
