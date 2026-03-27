const LoadingState = ({ message = "Loading products..." }) => {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <div className="loader" />
      <p>{message}</p>
    </div>
  );
};

export default LoadingState;
