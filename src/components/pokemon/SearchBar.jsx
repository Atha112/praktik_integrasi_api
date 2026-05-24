import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
    onSearch(e.target.value);
  };

  // Fungsi untuk hapus pencarian
  const handleClear = () => {
    setInput('');
    onSearch(''); // Kirim string kosong ke parent biar balik ke list
  };

  return (
    <div className="search-container">
      {/* Icon Search di kiri */}
      <span className="search-icon">🔍</span>
      
      <input
        type="text"
        className="search-input"
        placeholder="Cari Pokemon..."
        value={input}
        onChange={handleChange}
      />
      
      {/* Tombol X muncul kalau ada input */}
      {input && (
        <button className="clear-btn" onClick={handleClear}>
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;