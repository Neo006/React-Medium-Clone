import React from 'react';
import PropTypes from 'prop-types';
import { range } from '../utils';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const PaginationItem = ({ page, currentPage, url }) => {
  const liClasses = classNames({
    'page-item': true,
    'active': currentPage === page,
  });

  return (
    <li className={liClasses}>
      <Link to={`${url}?page=${page}`} className="page-link">
        {page}
      </Link>
    </li>
  );
};

PaginationItem.propTypes = {
  page: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

const Pagination = ({ total, limit, url, currentPage }) => {
  const pagesCount = Math.ceil(total / limit);
  const pages = range(1, pagesCount);

  return (
    <ul className="pagination">
      {pages.map((page) => (
        <PaginationItem page={page} currentPage={currentPage} url={url} key={page} />
      ))}
    </ul>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
