/**
 * components/LoadingSpinner.jsx
 * Centered spinner shown while tasks are being fetched.
 * Pure presentational component — no props needed.
 */

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      {/* Animated ring */}
      <div className="w-10 h-10 border-4 border-slate-200 border-t-brand-500 rounded-full animate-spin" />
      <p className="text-sm text-slate-500 font-medium tracking-wide">
        Loading tasks…
      </p>
    </div>
  );
};

export default LoadingSpinner;
