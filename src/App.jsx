import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import UserApiPage from './pages/UserApiPage';
import PokemonPage from './pages/PokemonPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-api" element={<UserApiPage />} />
        <Route path="/pokemon" element={<PokemonPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;