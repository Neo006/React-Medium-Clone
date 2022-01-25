import React, { useContext, useEffect, useState } from "react";
import ArticleForm from "../../components/articleForm";
import useFetch from "../../hooks/useFetch";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/currentUser";

const CreateArticle = () => {
  const apiUrl = "/articles";
  const [{ response, error }, doFetch] = useFetch(apiUrl);
  const initialValues = {
    title: "",
    body: "",
    description: "",
    tagList: [],
  };
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const [currentUserState] = useContext(CurrentUserContext);

  const handleSubmit = (article) => {
    doFetch({
      method: "post",
      data: {
        article,
      },
    });
  };

  useEffect(() => {
    if (!response) {
      response;
    }
    setIsSuccessfullSubmit(true);
  }, [response]);

  if (currentUserState.isLoggedIn === false) {
    return <Navigate to="/" />;
  }

  if (isSuccessfullSubmit && response) {
    return <Navigate to={`/articles/${response.article.slug}`} />;
  }

  return (
    <div>
      <ArticleForm
        errors={(error && error.errors) || {}}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateArticle;
