import React, { Fragment, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CurrentUserContext } from "../contexts/currentUser";
import useFetch from "../hooks/useFetch";
import CommentCard from "./commentCard";
import ErrorMessage from "./errorMessage";
import Loading from "./loading";

const Comments = () => {
  const { slug } = useParams();
  const [currenUserState] = useContext(CurrentUserContext);
  const apiUrl = `/articles/${slug}/comments`;
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  return (
    <>
      {isLoading && <Loading />}
      {error && <ErrorMessage />}
      {!isLoading &&
        response &&
        response.comments.map((comment) => (
          <Fragment key={comment.id}>
            <CommentCard data={comment} slug={slug} currenUserState={currenUserState} />
          </Fragment>
        ))}
    </>
  );
};

export default Comments;
