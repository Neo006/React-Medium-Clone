import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import CommentCard from "./commentCard";
import BackendErrorMessages from "./backendErrorMessages";

const AddComment = ({ slug, currenUserState }) => {
  const apiUrl = `/articles/${slug}/comments`;
  const [{ response, error }, doFetch] = useFetch(apiUrl);
  const [body, setBody] = useState("");
  const [comments, setComments] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    doFetch({
      method: "post",
      data: {
        comment: {
          body,
        },
      },
    });
  };

  useEffect(() => {
    if (!response) {
      return;
    }

    setBody("");
    setComments((prevState) => {
      return [response.comment, ...prevState];
    });
    setErrorMessage("");
  }, [response]);

  useEffect(() => {
    if (!error) {
      return;
    }
    setErrorMessage(error.errors);
  }, [error]);

  return (
    <>
      {errorMessage && <BackendErrorMessages backendErrors={errorMessage} />}
      <form
        onSubmit={handleSubmit}
        className="card comment-form ng-untouched ng-pristine ng-valid"
      >
        <fieldset>
          <div className="card-block">
            <textarea
              className="form-control ng-valid ng-untouched ng-pristine"
              placeholder="Write a comment..."
              rows="3"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>
          <div className="card-footer">
            <img
              className="comment-author-img"
              src={currenUserState.currentUser.image}
              alt=""
            />
            <button className="btn btn-sm btn-primary" type="submit">
              Post Comment
            </button>
          </div>
        </fieldset>
      </form>
      {!!comments &&
        comments.length &&
        comments.map((comment) => (
          <Fragment key={comment.id}>
            <CommentCard
              data={comment}
              slug={slug}
              currenUserState={currenUserState}
            />
          </Fragment>
        ))}
    </>
  );
};

AddComment.propTypes = {
  slug: PropTypes.string,
  currenUserState: PropTypes.object,
};

export default AddComment;
