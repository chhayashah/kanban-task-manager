/**
 * components/LoadingSpinner.jsx
 * Centered spinner shown while tasks are being fetched.
 * Pure presentational component — no props needed.
 */

const LoadingSpinner = () => {
  return (
    <div className="spinner-wrap">
      <div className="spinner" />
      <p className="spinner-text">Loading tasks…</p>
    </div>
  );
};

export default LoadingSpinner;
