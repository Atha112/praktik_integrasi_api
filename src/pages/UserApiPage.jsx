import { useState } from 'react';
import { Link } from 'react-router-dom';

import UserList from '../components/user/UserList';
import AddUserForm from '../components/user/AddUserForm';

function UserApiPage() {
  const [activePage, setActivePage] = useState('get');

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-gradient-to-br from-[#0f0c4d] to-[#312e81] text-white">
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

      <h1 className="text-center text-3xl sm:text-5xl font-bold mb-8 sm:mb-10 tracking-wide">USER MANAGEMENT API</h1>

      <div className="flex justify-center gap-4 sm:gap-5 mb-8 sm:mb-10">
        <button
          onClick={() => setActivePage('get')}
          className={`px-5 sm:px-7 py-3 sm:py-3.5 border-none rounded-xl text-white font-semibold text-sm sm:text-base cursor-pointer backdrop-blur-[10px] shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-all duration-300 ${
            activePage === 'get'
              ? 'bg-[#f9a826]'
              : 'bg-white/15 hover:bg-white/25'
          }`}
        >
          GET API
        </button>

        <button
          onClick={() => setActivePage('post')}
          className={`px-5 sm:px-7 py-3 sm:py-3.5 border-none rounded-xl text-white font-semibold text-sm sm:text-base cursor-pointer backdrop-blur-[10px] shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-all duration-300 ${
            activePage === 'post'
              ? 'bg-[#f9a826]'
              : 'bg-white/15 hover:bg-white/25'
          }`}
        >
          POST API
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-[10px] rounded-2xl p-4 sm:p-6 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
        {activePage === 'get' && <UserList />}
        {activePage === 'post' && <AddUserForm />}
      </div>
    </div>
  );
}

export default UserApiPage;