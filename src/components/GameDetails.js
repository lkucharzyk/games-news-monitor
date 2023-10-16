import UpdateItem from "./UpdateItem";

function GameDetails({ game, onClose }) {
  const {
    name,
    developers,
    genres,
    header_image,
    short_description,
    website,
    newsData,
  } = game[0];
  return (
    <section className="games-details big-box">
      <div className="close" role="button" onClick={() => onClose(null)}>
        ❌
      </div>
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
        {newsData.length > 0 && (
          <div className="updates">
            <h3>Last Updates</h3>
            {newsData.map((news) => (
              <UpdateItem
                key={news.gid.toString() + news.date.toString()}
                data={news}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default GameDetails;
