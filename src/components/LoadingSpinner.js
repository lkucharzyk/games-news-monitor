import loadingGif from "../imgs/loading.gif";

function LoadingSpinner({ size, message = "" }) {
  return (
    <div className="loading">
      <img src={loadingGif} alt="loading" style={{ maxWidth: `${size}px` }} />
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoadingSpinner;
