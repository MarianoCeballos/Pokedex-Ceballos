import React from 'react';
import s from '../Styles/Pagination.module.css';

function Pagination({ pokemonPerPage, totalPokemons, paginate, currentPage }) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonPerPage); i++) {
    pageNumber.push(i);
  }
  //
  let numShown = 3;
  numShown = Math.min(numShown, pageNumber.length);
  let first = currentPage - Math.floor(numShown / 2);
  first = Math.max(first, 1);
  first = Math.min(first, pageNumber.length - numShown + 1);
  const arr = [...Array(numShown)].map((_k, i) => i + first);

  return (
    <nav className={s.pagButtons}>
      {arr[0] === 1 ? null : (
        <button onClick={() => paginate(1)} className={s.btn}>
          1
        </button>
      )}
      {arr[0] === 1 ? null : <span className={s.spanDots}>...</span>}

      {arr.map((number) => (
        <div className={s.pagination} key={number}>
          <button
            disabled={currentPage === number ? true : false}
            className={s.btn}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        </div>
      ))}
      {arr[arr.length - 1] === pageNumber.length ? null : (
        <span className={s.spanDots}>...</span>
      )}
      {arr[arr.length - 1] === pageNumber.length ? null : (
        <button onClick={() => paginate(pageNumber.length)} className={s.btn}>
          {pageNumber.length}
        </button>
      )}
    </nav>
  );
}
export default Pagination;
