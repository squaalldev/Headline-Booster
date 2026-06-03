const Avatar = ({ size = 120, animate = true }) => {
  return (
    <div className="relative">
      <div 
        className="rounded-full bg-gradient-to-r from-[#a87a64] to-[#6e4433] flex items-center justify-center shadow-xl"
        style={{ width: size, height: size }}
      >
        <span className="text-6xl">🌎</span>
      </div>
      {animate && (
        <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full w-4 h-4 animate-pulse" />
      )}
    </div>
  );
};

export default Avatar;