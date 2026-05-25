import './Pagination.css';

const Pagination = ({ onNext, onPrev, hasNext, hasPrev, currentPage, totalPages }) => {
  return (
    <div className="pagination-container">
      <button 
        onClick={onPrev} 
        disabled={!hasPrev}
        className="btn-paginate"
      >
        &larr; Prev
      </button>
      
      {currentPage && totalPages && (
        <span className="page-info">
          Hal {currentPage} / {totalPages}
        </span>
      )}
      
      <button 
        onClick={onNext} 
        disabled={!hasNext}
        className="btn-paginate"
      >
        Next &rarr;
      </button>
    </div>
  );
};

export default Pagination;