import React from 'react';
import './PokemonCard.css';
import TypeBadge from './TypeBadge';

const PokemonCard = ({ pokemon }) => {
  // Get main type for background color
  const mainType = pokemon.types && pokemon.types.length > 0 ? pokemon.types[0].type.name : 'normal';
  
  // Format ID to be like #001
  const formattedId = `#${pokemon.id.toString().padStart(3, '0')}`;
  
  // Get high-res image if available, fallback to default sprite
  const imageUrl = pokemon.sprites?.other?.['official-artwork']?.front_default 
    || pokemon.sprites?.front_default;

  return (
    <div className={`pokemon-card type-${mainType}`}>
      <div className="card-bg-pattern"></div>
      <div className="pokemon-id">{formattedId}</div>
      <div className="pokemon-image-wrapper">
        {imageUrl && <img src={imageUrl} alt={pokemon.name} className="pokemon-image" />}
      </div>
      <div className="pokemon-name">
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </div>
      <div className="pokemon-types">
        {pokemon.types && pokemon.types.map((t) => (
          <TypeBadge key={t.type.name} type={t.type.name} />
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;