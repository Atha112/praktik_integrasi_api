import React from 'react';
import './Pagination.css';

const Pagination = ({ onNext, onPrev, hasNext, hasPrev }) => {
  return (
    <div className="pagination-container">
      <button 
        onClick={onPrev} 
        disabled={!hasPrev}
        className="btn-paginate"
      >
        &larr; Prev
      </button>
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