import './ErrorState.css';

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
    <div className="error-container">
      <div className="error-icon">{defaultIcon}</div>
      <h3 className="error-title">{defaultTitle}</h3>
      <p className="error-message">{message || defaultMessage}</p>
      {onAction && (
        <button 
          className={`error-btn ${isSearchError ? 'secondary' : ''}`}
          onClick={onAction}
        >
          {actionText || defaultActionText}
        </button>
      )}
    </div>
  );
};

export default ErrorState;
