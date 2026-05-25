const ErrorState = ({ type = 'fetch', message, onAction, actionText }) => {
  // Define default values based on type
  const isSearchError = type === 'search';
  const defaultIcon = isSearchError ? '🔎' : '⚠️';
  const defaultTitle = isSearchError ? 'Pokémon Tidak Ditemukan' : 'Gagal Memuat Data';
  const defaultMessage = isSearchError 
    ? 'Maaf, kami tidak bisa menemukan Pokémon dengan nama tersebut. Coba periksa ejaan Anda.'
    : 'Terjadi masalah saat mengambil data dari PokeAPI. Silakan periksa koneksi internet Anda.';
  const defaultActionText = isSearchError ? 'Reset Pencarian' : 'Coba Lagi';

  return (
    <div className="animate-fade-in flex flex-col items-center justify-center text-center py-12 px-8 my-8 mx-auto max-w-[500px] bg-red-400/8 border border-red-400/20 rounded-2xl backdrop-blur-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
      <div className="text-6xl mb-6 drop-shadow-[0_5px_10px_rgba(255,99,99,0.3)] animate-bounce-slow">{defaultIcon}</div>
      <h3 className="text-2xl font-bold text-red-400 mb-3">{defaultTitle}</h3>
      <p className="text-base text-white/80 leading-relaxed mb-8">{message || defaultMessage}</p>
      {onAction && (
        <button 
          className={`px-7 py-3 text-sm font-bold border-none rounded-full cursor-pointer transition-all duration-300 outline-none hover:-translate-y-0.5 active:translate-y-px ${
            isSearchError
              ? 'bg-gradient-to-br from-highlight to-yellow-400 text-black shadow-[0_5px_15px_rgba(255,203,5,0.4)] hover:shadow-[0_8px_20px_rgba(255,203,5,0.6)]'
              : 'bg-gradient-to-br from-red-400 to-red-300 text-white shadow-[0_5px_15px_rgba(255,107,107,0.4)] hover:shadow-[0_8px_20px_rgba(255,107,107,0.6)]'
          }`}
          onClick={onAction}
        >
          {actionText || defaultActionText}
        </button>
      )}
    </div>
  );
};

export default ErrorState;
