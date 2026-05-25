// src/pages/PokemonPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      <Link to="/" className="btn-back">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Kembali ke Beranda
      </Link>

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