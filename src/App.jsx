import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import './App.css';

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=12');
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  
  // State tambahan buat handle search global
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // 1. Fungsi Pagination Normal (seperti screenshot)
  const fetchPokemonList = async (apiUrl) => {
    setLoading(true);
    setIsSearching(false);
    try {
      const response = await axios.get(apiUrl);
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);

      const pokemonDetails = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const detail = await axios.get(pokemon.url);
          return detail.data;
        })
      );
      
      setPokemonData(pokemonDetails);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Fungsi Search Global (Nembak API langsung)
  const searchPokemon = async (query) => {
    if (!query) return; // Kalau kosong, ga ngapa2in
    
    setLoading(true);
    setIsSearching(true); // Tandai lagi mode search (biar pagination ilang)
    
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`);
      // Masukin hasil cari ke array (biar bisa di-map di grid)
      setPokemonData([response.data]);
    } catch (error) {
      // Kalau gak ketemu, kosongin array
      setPokemonData([]);
    } finally {
      setLoading(false);
    }
  };

  // Effect: Jalan kalau URL berubah (Mode Pagination)
  useEffect(() => {
    if (searchQuery === "") {
      fetchPokemonList(url);
    }
  }, [url, searchQuery]);

  // Effect: Jalan kalau Search Query berubah (Mode Search)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        searchPokemon(searchQuery.toLowerCase());
      }
    }, 500); // Delay 500ms biar gak nembak API tiap ketik

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleNext = () => nextUrl && setUrl(nextUrl);
  const handlePrev = () => prevUrl && setUrl(prevUrl);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>POKEDEX</h1>
        <SearchBar onSearch={setSearchQuery} />
      </header>

      <main className="pokemon-grid">
        {loading ? (
          Array.from({ length: 12 }).map((_, idx) => (
            <div key={idx} className="card-skeleton"></div>
          ))
        ) : (
          // Tampilan tetap di map sini, layout tidak berubah
          pokemonData.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        )}
      </main>

      {/* Pagination ilang kalau lagi searching */}
      {!loading && !isSearching && (
        <Pagination 
          onNext={handleNext} 
          onPrev={handlePrev} 
          hasNext={!!nextUrl} 
          hasPrev={!!prevUrl} 
        />
      )}
    </div>
  );
};

export default App;