function GameDetails({ game }) {
  console.log(game);
  const { name, developers, genres, header_image, short_description, website } =
    game[0];
  return (
    <section className="games-details big-box">
      <div className="header">
        {header_image && <img src={header_image} alt={name} />}
      </div>
      <div className="body">
        <h2>{name}</h2>
        {short_description && (
          <div className="description">{short_description}</div>
        )}

        <ul>
          {developers && (
            <li>
              <b>Developer(s): </b> {developers.join(", ")}
            </li>
          )}
          {genres && (
            <li>
              <b>Genres: </b>{" "}
              {genres.map((genre) => genre.description).join(", ")}
            </li>
          )}

          {website && (
            <li>
              <b>Website: </b>
              <a href={website}>{website}</a>
            </li>
          )}
        </ul>
        <div className="updates">
          <h3>Last Updates</h3>
        </div>
      </div>
    </section>
  );
}

export default GameDetails;
