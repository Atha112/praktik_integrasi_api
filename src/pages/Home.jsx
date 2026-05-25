import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen p-6 sm:p-10 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-5xl font-bold mb-3">🚀 Integrasi Praktikum API</h1>
        <p className="text-slate-300 text-base sm:text-lg">
          Kumpulan implementasi REST API menggunakan React.js
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        <Link
          to="/user-api"
          className="no-underline text-white bg-white/8 backdrop-blur-[10px] rounded-2xl p-6 sm:p-8 transition-all duration-300 border border-white/10 hover:-translate-y-2 hover:border-blue-400 hover:shadow-[0_20px_40px_rgba(96,165,250,0.25)]"
        >
          <div className="text-5xl mb-5">👥</div>
          <h2 className="text-xl font-bold mb-3">Praktikum 1 & 2</h2>
          <p className="text-slate-300 leading-relaxed">
            Implementasi GET dan POST API.
          </p>
        </Link>

        <Link
          to="/pokemon"
          className="no-underline text-white bg-white/8 backdrop-blur-[10px] rounded-2xl p-6 sm:p-8 transition-all duration-300 border border-white/10 hover:-translate-y-2 hover:border-blue-400 hover:shadow-[0_20px_40px_rgba(96,165,250,0.25)]"
        >
          <div className="text-5xl mb-5">⚡</div>
          <h2 className="text-xl font-bold mb-3">Praktikum 3</h2>
          <p className="text-slate-300 leading-relaxed">
            Pokedex App dengan Search dan Pagination menggunakan PokeAPI.
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Home;