// src/pages/PokemonPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PokemonCard from '../components/pokemon/PokemonCard';
import SearchBar from '../components/pokemon/SearchBar';
import Pagination from '../components/pokemon/Pagination';
import FilterSection from '../components/pokemon/FilterSection';
import ErrorState from '../components/pokemon/ErrorState';
import '../App.css';

const PokemonPage = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filtering & Sorting State
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('id-asc');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Error handling State
  const [error, setError] = useState(null);

  // Helper untuk mendapatkan ID Pokémon dari detail URL
  const getPokemonIdFromUrl = useCallback((url) => {
    const parts = url.split('/').filter(Boolean);
    return parseInt(parts[parts.length - 1], 10);
  }, []);

  const fetchPokemonList = useCallback(async () => {
    // Memindahkan eksekusi ke microtask berikutnya untuk menghindari setState sinkron dalam effect
    await Promise.resolve();
    setLoading(true);
    setError(null);

    try {
      let results = [];
      let totalCount = 0;

      if (selectedType === 'all') {
        // Standard API endpoint dengan limit & offset
        const offset = (currentPage - 1) * 12;
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`
        );
        results = response.data.results;
        totalCount = response.data.count;
      } else {
        // Mengambil semua Pokémon dari kategori tipe yang dipilih
        const response = await axios.get(
          `https://pokeapi.co/api/v2/type/${selectedType}`
        );
        results = response.data.pokemon.map((p) => p.pokemon);
        totalCount = results.length;
      }

      // 1. Lakukan Pengurutan (Sorting) pada hasil daftar Pokémon
      if (sortBy === 'id-asc') {
        results.sort((a, b) => getPokemonIdFromUrl(a.url) - getPokemonIdFromUrl(b.url));
      } else if (sortBy === 'id-desc') {
        results.sort((a, b) => getPokemonIdFromUrl(b.url) - getPokemonIdFromUrl(a.url));
      } else if (sortBy === 'name-asc') {
        results.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === 'name-desc') {
        results.sort((a, b) => b.name.localeCompare(a.name));
      }

      // 2. Bagi halaman (Paginate Client-Side) jika filter tipe aktif
      let pageItems = results;
      if (selectedType !== 'all') {
        const startIndex = (currentPage - 1) * 12;
        pageItems = results.slice(startIndex, startIndex + 12);
      }

      setTotalPages(Math.ceil(totalCount / 12));

      // 3. Ambil data detail Pokémon hanya untuk halaman yang sedang aktif
      if (pageItems.length === 0) {
        setPokemonData([]);
      } else {
        const detailedData = await Promise.all(
          pageItems.map(async (pokemon) => {
            const detail = await axios.get(pokemon.url);
            return detail.data;
          })
        );
        setPokemonData(detailedData);
      }
    } catch (err) {
      console.error('Error fetching list:', err);
      setError({
        type: 'fetch',
        message: 'Gagal menghubungi PokeAPI. Silakan periksa koneksi internet Anda.'
      });
      setPokemonData([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedType, sortBy, getPokemonIdFromUrl]);

  const searchPokemon = useCallback(async (query) => {
    // Memindahkan eksekusi ke microtask berikutnya untuk menghindari setState sinkron dalam effect
    await Promise.resolve();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${query}`
      );
      setPokemonData([response.data]);
      setTotalPages(1);
      setCurrentPage(1);
    } catch (err) {
      console.error('Error searching pokemon:', err);
      setPokemonData([]);
      setError({
        type: 'search',
        message: `Pokémon "${query}" tidak ditemukan. Pastikan nama yang Anda masukkan benar (contoh: pikachu, charizard).`
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Efek untuk memicu reload daftar list Pokémon atau melakukan pencarian
  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const timer = setTimeout(() => {
        searchPokemon(searchQuery.toLowerCase().trim());
      }, 500);
      return () => clearTimeout(timer);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchPokemonList();
    }
  }, [currentPage, selectedType, sortBy, searchQuery, fetchPokemonList, searchPokemon]);

  // Ubah tipe filter, reset halaman ke awal, dan hapus text search bar
  const handleTypeChange = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
    setSearchQuery('');
  };

  // Ubah urutan sorting, reset halaman ke awal
  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
    setCurrentPage(1);
  };

  const handleRetry = () => {
    fetchPokemonList();
  };

  const handleResetSearch = () => {
    setSearchQuery('');
  };

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
      </header>

      <FilterSection
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        searchBarComponent={
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        }
      />

      <main className="pokemon-grid">
        {loading ? (
          Array.from({ length: 12 }).map((_, idx) => (
            <div key={idx} className="card-skeleton">
              <div className="skeleton-id"></div>
              <div className="skeleton-image"></div>
              <div className="skeleton-title"></div>
              <div className="skeleton-badges">
                <div className="skeleton-badge"></div>
                <div className="skeleton-badge"></div>
              </div>
            </div>
          ))
        ) : error ? (
          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center' }}>
            <ErrorState
              type={error.type}
              message={error.message}
              onAction={error.type === 'search' ? handleResetSearch : handleRetry}
            />
          </div>
        ) : pokemonData.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center' }}>
            <ErrorState
              type="search"
              message="Tidak ada Pokémon yang cocok dengan filter Anda."
              onAction={handleResetSearch}
            />
          </div>
        ) : (
          pokemonData.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        )}
      </main>

      {!loading && !searchQuery && !error && pokemonData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          hasNext={currentPage < totalPages}
          hasPrev={currentPage > 1}
        />
      )}
    </div>
  );
};

export default PokemonPage;