import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import useFetch from "../hooks/useFetch";

const CommentCard = ({ data, slug, currenUserState }) => {
  const [comment, setComment] = useState(data);
  const deleteApiUrl = `/articles/${slug}/comments/${comment.id}`;
  const [{ isLoading, responseStatus }, doDeleteComment] = useFetch(deleteApiUrl);

  const getDate = (createDate) => {
    const date = new Date(createDate);
    const changeDateFormat = dateFormat(date, "mmmm d, yyyy");

    return changeDateFormat;
  };

  const isAuthor = (commentAuthor) => {
    if (!currenUserState.isLoggedIn) {
      return false;
    }
    return commentAuthor === currenUserState.currentUser.username;
  };

  const deletePost = () => {
    doDeleteComment({
      method: "delete",
    });
  };

  useEffect(() => {
    if (isLoading || responseStatus === null) {
      return;
    }
    setComment("");
  }, [isLoading, responseStatus]);

  return (
    <>
      {!!comment && (
        <div className="card">
          <div className="card-block">
            <p className="card-text">{comment.body}</p>
          </div>
          <div className="card-footer">
            <Link to="" className="comment-author">
              <img
                src={comment.author.image}
                className="comment-author-img"
                alt=""
              />
            </Link>
            &nbsp;&nbsp;
            <Link to="" className="comment-author">
              {comment.author.username}
            </Link>
            <span className="date-posted">{getDate(comment.createdAt)}</span>
            {isAuthor(comment.author.username) && (
              <span className="mod-options" onClick={() => deletePost()}>
                <i className="ion-trash-a"></i>
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

CommentCard.propTypes = {
  data: PropTypes.object,
  slug: PropTypes.string,
  currenUserState: PropTypes.object,
};

export default CommentCard;
