import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPaginator, limit } from '../../../utils';
import { stringify } from 'query-string';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../../components/loading';
import ErrorMessage from '../../../components/errorMessage';
import Feed from '../../../components/feed';
import Pagination from '../../../components/pagination';

const getApiUrl = ({ username, offset, isFavorites }) => {
  const params = isFavorites ? { limit, offset, favorited: username } : { limit, offset, author: username };

  return `/articles?${stringify(params)}`;
};

const UserArticles = ({ username, location, isFavorites, url }) => {
  const { currentPage, offset } = getPaginator(location.search);
  const apiUrl = getApiUrl({ username, offset, isFavorites });
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, isFavorites, currentPage]);

  return (
    <div>
      {isLoading && <Loading />}
      {error && <ErrorMessage />}
      {!isLoading && response && (
        <>
          <Feed articles={response.articles} />
          {response.articlesCount > limit && (
            <Pagination total={response.articlesCount} limit={limit} url={url} currentPage={currentPage} />
          )}
        </>
      )}
    </div>
  );
};

UserArticles.propTypes = {
  username: PropTypes.string,
  location: PropTypes.object,
  isFavorites: PropTypes.bool,
  url: PropTypes.string,
};

export default UserArticles;
