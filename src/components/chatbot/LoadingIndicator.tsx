
const LoadingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-secondary/10 rounded-lg px-3 py-2">
        <span className="flex gap-1">
          <span className="animate-bounce">.</span>
          <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
          <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>.</span>
        </span>
      </div>
    </div>
  );
};

export default LoadingIndicator;
