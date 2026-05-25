const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-[400px] mx-auto">
      {/* Icon Search di kiri */}
      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-white/70">🔍</span>
      
      <input
        type="text"
        className="w-full py-[15px] px-[50px] rounded-full border-none bg-white/15 text-white text-lg outline-none backdrop-blur-[10px] transition-all duration-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] placeholder-white/60 focus:bg-white/25 focus:shadow-[0_0_20px_rgba(255,203,5,0.4)]"
        placeholder="Cari nama Pokémon..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      
      {/* Tombol X muncul kalau ada input */}
      {value && (
        <button
          className="absolute right-[15px] top-1/2 -translate-y-1/2 bg-white/20 border-none rounded-full w-7 h-7 flex items-center justify-center text-white text-base cursor-pointer transition-colors hover:bg-white/40"
          onClick={() => onChange('')}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;