import './FilterSection.css';

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
    <div className="filter-section">
      <div className="filter-controls-row">
        {searchBarComponent}
        
        <div className="sort-container">
          <label className="sort-label" htmlFor="pokemon-sort">Urutkan:</label>
          <select 
            id="pokemon-sort"
            className="sort-select" 
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
      
      <div className="type-filter-container">
        <span className="type-filter-label">Filter Tipe Pokémon:</span>
        <div className="type-pills-scroll">
          {POPULAR_TYPES.map((type) => (
            <button
              key={type}
              className={`type-pill ${type} ${selectedType === type ? 'active' : ''}`}
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
