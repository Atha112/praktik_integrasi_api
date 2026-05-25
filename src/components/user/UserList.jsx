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
      <div>
        <p>{error}</p>

        <button onClick={fetchUsers}>
          Coba Lagi
        </button>
      </div>
    );

  return (
    <div style={styles.container}>
      <h1>Daftar Pengguna</h1>

      <input
        type="text"
        placeholder="Cari user..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        style={styles.input}
      />

      <p>
        Menampilkan {filteredUsers.length} user
      </p>

      <UserTable users={filteredUsers} />

      <button
        onClick={fetchUsers}
        style={styles.button}
      >
        Refresh
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
  },

  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '1rem',
  },

  button: {
    marginTop: '1rem',
    padding: '10px 20px',
  },
};