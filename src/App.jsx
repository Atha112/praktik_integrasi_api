import { useState } from 'react';

import UserList from './components/UserList';
import AddUserForm from './components/AddUserForm';

function App() {
  const [activePage, setActivePage] =
    useState('get');

  return (
    <div>
      <div style={styles.nav}>
        <button
          onClick={() => setActivePage('get')}
          style={styles.button}
        >
          GET API
        </button>

        <button
          onClick={() => setActivePage('post')}
          style={styles.button}
        >
          POST API
        </button>
      </div>

      {activePage === 'get' && (
        <UserList />
      )}

      {activePage === 'post' && (
        <AddUserForm />
      )}
    </div>
  );
}

const styles = {
  nav: {
    display: 'flex',
    gap: '10px',

    padding: '20px',

    justifyContent: 'center',
  },

  button: {
    padding: '10px 16px',

    border: 'none',

    borderRadius: '10px',

    background: '#acacac',

    color: 'white',

    cursor: 'pointer',
  },
};

export default App;