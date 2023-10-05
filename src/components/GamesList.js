import GameListItem from "./GameListItem";

function GamesList({ savedGamesData }) {
  return (
    <section className="games-list big-box">
      {savedGamesData.map((game) => (
        <GameListItem key={game.id} game={game} />
      ))}
    </section>
  );
}

export default GamesList;
