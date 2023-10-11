import GameListItem from "./GameListItem";

function GamesList({ savedGamesData, onRemoveGameFromSaved }) {
  return (
    <section className="games-list big-box">
      {savedGamesData.map((game) => (
        <GameListItem
          key={game.steam_appid}
          game={game}
          onRemoveGameFromSaved={onRemoveGameFromSaved}
        />
      ))}
    </section>
  );
}

export default GamesList;
