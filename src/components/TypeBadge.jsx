import './TypeBadge.css';

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
      className="type-badge" 
      style={{ backgroundColor: typeColors[type] || '#777' }}
    >
      {type}
    </span>
  );
};

export default TypeBadge;