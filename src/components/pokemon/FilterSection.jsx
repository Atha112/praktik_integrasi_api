const POPULAR_TYPES = [
  'all', 'normal', 'fire', 'water', 'grass', 'electric',
  'ice', 'fighting', 'poison', 'ground', 'flying',
  'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const FilterSection = ({ 
  selectedType, 
  onTypeChange, 
  sortBy, 
  onSortChange,
  searchBarComponent 
}) => {
  return (
    <div className="flex flex-col gap-5 my-6 sm:my-8 mx-auto w-full max-w-[1000px] bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-[10px]">
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        {searchBarComponent}
        
        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold text-white/70 whitespace-nowrap" htmlFor="pokemon-sort">Urutkan:</label>
          <select 
            id="pokemon-sort"
            className="sort-select px-5 py-2.5 rounded-full border border-white/20 bg-white/10 text-white text-sm font-medium outline-none cursor-pointer transition-all duration-300 hover:bg-white/20 hover:border-highlight focus:bg-white/20 focus:border-highlight focus:shadow-[0_0_10px_rgba(255,203,5,0.3)] flex-grow sm:flex-grow-0" 
            value={sortBy} 
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="id-asc">ID: Terendah ke Tertinggi</option>
            <option value="id-desc">ID: Tertinggi ke Terendah</option>
            <option value="name-asc">Nama: A - Z</option>
            <option value="name-desc">Nama: Z - A</option>
          </select>
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-white/70">Filter Tipe Pokémon:</span>
        <div className="flex gap-2.5 overflow-x-auto py-2 px-1 scrollbar-thin">
          {POPULAR_TYPES.map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded-2xl border text-sm font-semibold capitalize whitespace-nowrap cursor-pointer transition-all duration-200 ${
                selectedType === type
                  ? `type-pill-active-${type} text-white border-transparent -translate-y-0.5 shadow-[0_4px_15px_rgba(0,0,0,0.25)]`
                  : 'border-white/15 bg-white/6 text-white/80 hover:bg-white/15 hover:text-white hover:-translate-y-0.5'
              }`}
              onClick={() => onTypeChange(type)}
            >
              {type === 'all' ? 'Semua Tipe' : type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
