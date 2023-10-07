function SearchResultItem({ game, onAddGameToSaved, clearFoundGames }) {
  return (
    <div className="search-result-item">
      <div className="title">{game.name}</div>
      <div
        className="btn"
        role="button"
        onClick={() => {
          onAddGameToSaved(game.appid);
          clearFoundGames();
        }}
      >
        Add to Your list ➕
      </div>
    </div>
  );
}

export default SearchResultItem;
