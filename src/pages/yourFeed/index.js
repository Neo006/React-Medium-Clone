import React, { useEffect } from 'react';
import Feed from '../../components/feed';
import Pagination from '../../components/pagination';
import useFetch from '../../hooks/useFetch';
import { getPaginator } from '../../utils';
import { useLocation } from 'react-router-dom';
import { stringify } from 'query-string';
import { limit } from '../../utils';
import PopularTags from '../../components/popularTags';
import Loading from '../../components/loading';
import ErrorMessage from '../../components/errorMessage';
import FeedToggler from '../../components/feedToggler';

const YourFeed = () => {
  const location = useLocation();
  const { currentPage, offset } = getPaginator(location.search);
  const stringifiedParams = stringify({
    limit,
    offset,
  });
  const apiUrl = `/articles/feed?${stringifiedParams}`;
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium Clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler />
            {isLoading && <Loading />}
            {error && <ErrorMessage />}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
                {response.articlesCount > limit && (
                  <Pagination
                    total={response.articlesCount}
                    limit={limit}
                    url={location.pathname}
                    currentPage={currentPage}
                  />
                )}
              </>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourFeed;
