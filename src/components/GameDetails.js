function GameDetails({ game }) {
  console.log(game);
  const { name } = game[0];
  return (
    <section className="games-details big-box">
      <h1>{name}</h1>
    </section>
  );
}

export default GameDetails;
