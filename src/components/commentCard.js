import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import Loading from './loading';
import ErrorMessage from './errorMessage';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

const CommentCard = ({ slug, currenUserState }) => {
  const apiUrl = `/articles/${slug}/comments`;
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);
  const [deleteApiUrl, setDeleteApiUrl] = useState('');
  const [{ isLoading: isDeleteLoading }, doDeleteComment] = useFetch(deleteApiUrl);

  const getDate = (createDate) => {
    const date = new Date(createDate);
    const changeDateFormat = dateFormat(date, 'mmmm d, yyyy');

    return changeDateFormat;
  };

  const isAuthor = (commentAuthor) => {
    if (!currenUserState.isLoggedIn) {
      return false;
    }
    return commentAuthor === currenUserState.currentUser.username;
  };

  const deletePost = (commentId) => {
    setDeleteApiUrl(`/articles/${slug}/comments/${commentId}`);
  };

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!deleteApiUrl) {
      return;
    }
    doDeleteComment({
      method: 'delete',
    });
  }, [deleteApiUrl]);

  useEffect(() => {
    if (isDeleteLoading) {
      return;
    }
    doFetch();
  }, [isDeleteLoading]);

  return (
    <>
      {isLoading && <Loading />}
      {error && <ErrorMessage />}
      {!isLoading &&
        response &&
        response.comments.map((comment) => (
          <Fragment key={comment.id}>
            <div className="card">
              <div className="card-block">
                <p className="card-text">{comment.body}</p>
              </div>
              <div className="card-footer">
                <Link to="" className="comment-author">
                  <img src={comment.author.image} className="comment-author-img" alt="" />
                </Link>
                &nbsp;&nbsp;
                <Link to="" className="comment-author">
                  {comment.author.username}
                </Link>
                <span className="date-posted">{getDate(comment.createdAt)}</span>
                {isAuthor(comment.author.username) && (
                  <span className="mod-options" onClick={() => deletePost(comment.id)}>
                    <i className="ion-trash-a"></i>
                  </span>
                )}
              </div>
            </div>
          </Fragment>
        ))}
    </>
  );
};

CommentCard.propTypes = {
  slug: PropTypes.string.isRequired,
  currenUserState: PropTypes.object,
};

export default CommentCard;
