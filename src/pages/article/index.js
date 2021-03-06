import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { Link, Navigate } from 'react-router-dom';
import Loading from '../../components/loading';
import ErrorMessage from '../../components/errorMessage';
import TagList from '../../components/tagList';
import { CurrentUserContext } from '../../contexts/currentUser';
import AddToFavorites from '../../components/addToFavorites';
import FollowAuthor from '../../components/followAuthor';
import Comments from '../../components/comments';
import dateFormat from 'dateformat';

const Article = () => {
  const { slug } = useParams();
  const apiUrl = `/articles/${slug}`;
  const [{ response: fetchArticleResponse, isLoading: fetchArticleIsLoading, error: fetchArticleError }, doFetch] = useFetch(apiUrl);
  const [{ responseStatus: deleteArticleResponseStatus }, doDeleteArticle] = useFetch(apiUrl);
  const [currenUserState] = useContext(CurrentUserContext);
  const [isSuccessfullDelete, setIsSuccessfullDelete] = useState(false);

  const getDate = (createDate) => {
    const date = new Date(createDate);
    const changeDateFormat = dateFormat(date, "mmmm d, yyyy");

    return changeDateFormat;
  };

  const isAuthor = () => {
    if (!fetchArticleResponse || !currenUserState.isLoggedIn) {
      return false;
    }
    return fetchArticleResponse.article.author.username === currenUserState.currentUser.username;
  };

  const deleteArticle = () => {
    doDeleteArticle({
      method: 'delete',
    });
  };

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!deleteArticleResponseStatus) {
      return;
    }
    setIsSuccessfullDelete(true);
  }, [deleteArticleResponseStatus]);

  if (isSuccessfullDelete) {
    return <Navigate to="/" />;
  }

  return (
    <div className="article-page">
      <div className="banner">
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="container">
            <h1>{fetchArticleResponse.article.title}</h1>
            <div className="article-meta">
              <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
                <img src={fetchArticleResponse.article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
                  {fetchArticleResponse.article.author.username}
                </Link>
                <span className="date">{getDate(fetchArticleResponse.article.createdAt)}</span>
              </div>
              {isAuthor() && (
                <span>
                  <Link
                    className="btn btn-outline-secondary btn-sm"
                    style={{ marginRight: '10px' }}
                    to={`/articles/${fetchArticleResponse.article.slug}/edit`}
                  >
                    <i className="ion-edit"></i>
                    &nbsp; Edit Article
                  </Link>
                  <button className="btn btn-outline-danger btn-sm" onClick={deleteArticle}>
                    <i className="ion-trash-a"></i>
                    &nbsp; Delete Article
                  </button>
                </span>
              )}
              {!isAuthor() && (
                <span>
                  <FollowAuthor
                    authorUsername={fetchArticleResponse.article.author.username}
                    isFollowing={fetchArticleResponse.article.author.following}
                  />
                  <AddToFavorites
                    isFavorited={fetchArticleResponse.article.favorited}
                    favoritesCount={fetchArticleResponse.article.favoritesCount}
                    articleSlug={fetchArticleResponse.article.slug}
                  />
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {fetchArticleIsLoading && <Loading />}
        {fetchArticleError && <ErrorMessage />}
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <>
            <div className="row article-content">
              <div className="col-xs-12">
                <div>
                  <p>{fetchArticleResponse.article.body}</p>
                </div>
                <TagList tags={fetchArticleResponse.article.tagList} />
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                <Comments />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Article;
