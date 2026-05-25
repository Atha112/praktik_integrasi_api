// src/pages/PokemonPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PokemonCard from '../components/pokemon/PokemonCard';
import SearchBar from '../components/pokemon/SearchBar';
import Pagination from '../components/pokemon/Pagination';
import FilterSection from '../components/pokemon/FilterSection';
import ErrorState from '../components/pokemon/ErrorState';

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
    <div className="min-h-screen w-full bg-gradient-to-br from-primary-bg via-secondary-bg to-accent-bg bg-fixed text-white">
      <div className="max-w-7xl mx-auto p-4 sm:p-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/8 text-white no-underline rounded-xl text-sm font-semibold border border-white/12 backdrop-blur-[10px] transition-all duration-300 cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.1)] mb-5 w-fit hover:bg-white/20 hover:border-white/25 hover:-translate-y-0.5"
        >
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

        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-6xl font-black tracking-[5px] bg-gradient-to-r from-highlight to-red-400 bg-clip-text text-transparent mb-6">POKEDEX</h1>
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

        <main className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
          {loading ? (
            Array.from({ length: 12 }).map((_, idx) => (
              <div key={idx} className="card-skeleton w-full h-[320px] rounded-2xl bg-white/5 border border-white/8 p-6 flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-[15px] left-[15px] w-[45px] h-4 rounded bg-white/8"></div>
                <div className="w-[120px] h-[120px] rounded-full bg-white/8 mt-5"></div>
                <div className="w-[130px] h-5 rounded bg-white/8 mt-6"></div>
                <div className="flex gap-2 mt-auto w-full justify-center">
                  <div className="w-[65px] h-6 rounded-xl bg-white/8"></div>
                  <div className="w-[65px] h-6 rounded-xl bg-white/8"></div>
                </div>
              </div>
            ))
          ) : error ? (
            <div className="col-span-full flex justify-center">
              <ErrorState
                type={error.type}
                message={error.message}
                onAction={error.type === 'search' ? handleResetSearch : handleRetry}
              />
            </div>
          ) : pokemonData.length === 0 ? (
            <div className="col-span-full flex justify-center">
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
    </div>
  );
};

export default PokemonPage;