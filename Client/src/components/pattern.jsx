const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="flex-1 hidden lg:flex items-center justify-center">
      <div className="max-w-xs text-center">
        <div className="grid grid-cols-3 gap-2 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl  ${
                i % 2 === 1 ? "bg-primary/50 animate-pulse" : "bg-primary/80"   
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;