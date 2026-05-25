const typeColors = {
  grass: '#78c850',
  poison: '#a040a0',
  fire: '#f08030',
  water: '#6890f0',
  electric: '#f8d030',
  psychic: '#f85888',
  normal: '#a8a878',
  ground: '#e0c068',
  bug: '#a8b820',
  fairy: '#ee99ac',
  fighting: '#c03028'
  // tambahkan sendiri jika perlu
};

const TypeBadge = ({ type }) => {
  return (
    <span 
      className="px-3 py-1 rounded-full text-[0.7rem] font-semibold text-white uppercase tracking-wide shadow-[0_2px_5px_rgba(0,0,0,0.2)]" 
      style={{ backgroundColor: typeColors[type] || '#777' }}
    >
      {type}
    </span>
  );
};

export default TypeBadge;