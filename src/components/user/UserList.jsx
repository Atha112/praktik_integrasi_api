import { useState, useEffect } from 'react';
import axios from 'axios';

import UserTable from './UserTable';
import LoadingSpinner from './LoadingSpinner';

export default function UserList() {
  // State data user
  const [users, setUsers] = useState([]);

  // State loading
  const [loading, setLoading] = useState(true);

  // State error
  const [error, setError] = useState(null);

  // State search
  const [searchTerm, setSearchTerm] =
    useState('');

  // Function ambil data API
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );

      setUsers(response.data);
    } catch (err) {
      setError(
        'Gagal mengambil data dari API'
      );

      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect jalan sekali saat component muncul
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);

  // Filter search
  const filteredUsers = users.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      user.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Conditional rendering
  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="text-center p-8">
        <p className="text-red-400 mb-4">{error}</p>

        <button
          onClick={fetchUsers}
          className="px-4 py-2 bg-blue-500 text-white border-none rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Daftar Pengguna</h1>

      <input
        type="text"
        placeholder="Cari user..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        className="w-full p-3 mb-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 outline-none transition-all duration-300 focus:bg-white/15 focus:border-white/40"
      />

      <p className="mb-4 text-white/70">
        Menampilkan {filteredUsers.length} user
      </p>

      <UserTable users={filteredUsers} />

      <button
        onClick={fetchUsers}
        className="mt-4 px-5 py-2.5 bg-emerald-500 text-white border-none rounded-lg cursor-pointer hover:bg-emerald-600 transition-colors font-medium"
      >
        Refresh
      </button>
    </div>
  );
}