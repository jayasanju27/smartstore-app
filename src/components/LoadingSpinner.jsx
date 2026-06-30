function LoadingSpinner({ message = "Loading...", fullPage = false }) {
  return (
    <div className={`loading-spinner-wrap ${fullPage ? "loading-fullpage" : ""}`}>
      <div className="loading-spinner" aria-hidden="true" />
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
}

export default LoadingSpinner;
