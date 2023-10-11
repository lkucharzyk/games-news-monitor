function Alert({ alert }) {
  const { type, message } = alert;
  return (
    <div className="alert">
      {type === "yellow" ? "⚠️  " : type === "red" ? "🛑" : ""}
      {message}
    </div>
  );
}

export default Alert;
