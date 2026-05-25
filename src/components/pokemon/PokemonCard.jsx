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
    <div className={`type-${mainType} relative rounded-2xl p-6 cursor-pointer transition-all duration-300 overflow-hidden backdrop-blur-sm border border-white/20 flex flex-col items-center h-[320px] w-full hover:-translate-y-2.5 hover:scale-[1.02] hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] group`}>
      <div className="card-bg-pattern"></div>
      <div className="absolute top-2.5 left-[15px] font-black text-base opacity-70 text-white/80">{formattedId}</div>
      <div className="w-[150px] h-[150px] flex justify-center items-center z-[2]">
        {imageUrl && <img src={imageUrl} alt={pokemon.name} className="w-full h-auto drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]" />}
      </div>
      <div className="mt-2 text-lg font-bold tracking-wide [text-shadow:1px_1px_2px_rgba(0,0,0,0.3)]">
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </div>
      <div className="flex gap-2 mt-auto">
        {pokemon.types && pokemon.types.map((t) => (
          <TypeBadge key={t.type.name} type={t.type.name} />
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;