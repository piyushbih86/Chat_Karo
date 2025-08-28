const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 to-base-200 p-12">
      <div className="max-w-md text-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl transform -rotate-6"></div>
        <div className="grid grid-cols-3 gap-4 mb-12 relative z-10">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-white/10 backdrop-blur-sm shadow-lg ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="text-3xl font-bold mb-4 text-base-content">{title}</h2>
        <p className="text-base-content/70 text-lg">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;