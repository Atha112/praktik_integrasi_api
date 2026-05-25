import './SearchBar.css';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-container">
      {/* Icon Search di kiri */}
      <span className="search-icon">🔍</span>
      
      <input
        type="text"
        className="search-input"
        placeholder="Cari nama Pokémon..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      
      {/* Tombol X muncul kalau ada input */}
      {value && (
        <button className="clear-btn" onClick={() => onChange('')}>
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;