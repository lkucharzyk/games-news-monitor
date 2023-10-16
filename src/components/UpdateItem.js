function UpdateItem({ data }) {
  const { date, title, url } = data;
  return (
    <div className="update-item box">
      <div className="left-side">
        <p>{new Date(date * 1000).toLocaleDateString()}</p>
        <h5>{title}</h5>
      </div>
      <p>
        <a href={url}>STEAM</a>
      </p>
    </div>
  );
}

export default UpdateItem;
