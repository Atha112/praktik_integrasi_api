const Pagination = ({ onNext, onPrev, hasNext, hasPrev, currentPage, totalPages }) => {
  return (
    <div className="flex justify-center items-center gap-5 mt-12">
      <button 
        onClick={onPrev} 
        disabled={!hasPrev}
        className="px-6 sm:px-8 py-3 rounded-full border-2 border-highlight bg-transparent text-highlight font-bold text-base cursor-pointer transition-all duration-300 hover:enabled:bg-highlight hover:enabled:text-black hover:enabled:shadow-[0_0_20px_rgba(255,203,5,0.6)] disabled:opacity-30 disabled:cursor-not-allowed disabled:border-white disabled:text-white"
      >
        &larr; Prev
      </button>
      
      {currentPage && totalPages && (
        <span className="text-base font-semibold text-white/80 bg-white/8 px-4 py-2 rounded-2xl border border-white/10 min-w-[100px] text-center">
          Hal {currentPage} / {totalPages}
        </span>
      )}
      
      <button 
        onClick={onNext} 
        disabled={!hasNext}
        className="px-6 sm:px-8 py-3 rounded-full border-2 border-highlight bg-transparent text-highlight font-bold text-base cursor-pointer transition-all duration-300 hover:enabled:bg-highlight hover:enabled:text-black hover:enabled:shadow-[0_0_20px_rgba(255,203,5,0.6)] disabled:opacity-30 disabled:cursor-not-allowed disabled:border-white disabled:text-white"
      >
        Next &rarr;
      </button>
    </div>
  );
};

export default Pagination;