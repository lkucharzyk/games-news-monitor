import GameListItem from "./GameListItem";

function GamesList({
  savedGamesData,
  onOpenGame,
  onRemoveGameFromSaved,
  lastVisit,
}) {
  return (
    <section className="games-list big-box">
      {savedGamesData.map((game) => (
        <GameListItem
          key={game.steam_appid}
          game={game}
          onOpenGame={onOpenGame}
          onRemoveGameFromSaved={onRemoveGameFromSaved}
          lastVisit={lastVisit}
        />
      ))}
    </section>
  );
}

export default GamesList;
