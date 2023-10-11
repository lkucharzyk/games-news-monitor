import GameListItem from "./GameListItem";

function GamesList({ savedGamesData, onOpenGame, onRemoveGameFromSaved }) {
  return (
    <section className="games-list big-box">
      {savedGamesData.map((game) => (
        <GameListItem
          key={game.steam_appid}
          game={game}
          onOpenGame={onOpenGame}
          onRemoveGameFromSaved={onRemoveGameFromSaved}
        />
      ))}
    </section>
  );
}

export default GamesList;
