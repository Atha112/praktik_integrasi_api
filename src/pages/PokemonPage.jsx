// src/pages/PokemonPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from '../components/pokemon/PokemonCard';
import SearchBar from '../components/pokemon/SearchBar';
import Pagination from '../components/pokemon/Pagination';
import '../App.css';

const PokemonPage = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=12');
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

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
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchPokemon = async (query) => {
    if (!query) return;

    setLoading(true);
    setIsSearching(true);

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${query}`
      );

      setPokemonData([response.data]);
    } catch (error) {
      setPokemonData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery === '') {
      fetchPokemonList(url);
    }
  }, [url, searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        searchPokemon(searchQuery.toLowerCase());
      }
    }, 500);

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
          pokemonData.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        )}
      </main>

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

export default PokemonPage;