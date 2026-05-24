import { useState } from 'react';

import UserList from '../components/user/UserList';
import AddUserForm from '../components/user/AddUserForm';

function UserApiPage() {
  const [activePage, setActivePage] = useState('get');

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>USER MANAGEMENT API</h1>

      <div style={styles.nav}>
        <button
          onClick={() => setActivePage('get')}
          style={{
            ...styles.button,
            background:
              activePage === 'get'
                ? '#f9a826'
                : 'rgba(255,255,255,0.15)',
          }}
        >
          GET API
        </button>

        <button
          onClick={() => setActivePage('post')}
          style={{
            ...styles.button,
            background:
              activePage === 'post'
                ? '#f9a826'
                : 'rgba(255,255,255,0.15)',
          }}
        >
          POST API
        </button>
      </div>

      <div style={styles.content}>
        {activePage === 'get' && <UserList />}
        {activePage === 'post' && <AddUserForm />}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    padding: '40px',
    background:
      'linear-gradient(135deg, #0f0c4d 0%, #312e81 100%)',
    color: 'white',
  },

  title: {
    textAlign: 'center',
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '40px',
    letterSpacing: '2px',
  },

  nav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '40px',
  },

  button: {
    padding: '14px 28px',
    border: 'none',
    borderRadius: '14px',
    color: 'white',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    boxShadow:
      '0 8px 20px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
  },

  content: {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '25px',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow:
      '0 10px 30px rgba(0,0,0,0.15)',
  },
};

export default UserApiPage;