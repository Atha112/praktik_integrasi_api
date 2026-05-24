import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="hero">
        <h1>🚀 Integrasi Praktikum API</h1>
        <p>
          Kumpulan implementasi REST API menggunakan React.js
        </p>
      </div>

      <div className="card-grid">
        <Link to="/user-api" className="card">
          <div className="icon">👥</div>
          <h2>Praktikum 1 & 2</h2>
          <p>
            Implementasi GET dan POST API.
          </p>
        </Link>

        <Link to="/pokemon" className="card">
          <div className="icon">⚡</div>
          <h2>Praktikum 3</h2>
          <p>
            Pokedex App dengan Search dan Pagination menggunakan PokeAPI.
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Home;