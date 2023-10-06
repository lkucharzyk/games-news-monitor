import GameListItem from "./GameListItem";

function GamesList({ savedGamesData }) {
  return (
    <section className="games-list big-box">
      {savedGamesData.map((game) => (
        <GameListItem key={game.steam_appid} game={game} />
      ))}
    </section>
  );
}

export default GamesList;
