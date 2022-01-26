import React, { useEffect, useState, useContext } from "react";
import ArticleForm from "../../components/articleForm";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/currentUser";

const EditArticle = () => {
  const { slug } = useParams();
  const apiUrl = `/articles/${slug}`;
  const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(apiUrl);
  const [
    { response: updateArticleResponse, isLoading: updateArticleIsLoading, error: updateArticleError },
    doUpdateArticle,
  ] = useFetch(apiUrl);
  const [initialValues, setInitialValues] = useState(null);
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const [currentUserState] = useContext(CurrentUserContext);

  const handleSubmit = (article) => {
    doUpdateArticle({
      method: "put",
      data: {
        article,
      },
    });
  };

  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {
    if (!fetchArticleResponse) {
      return;
    }

    setInitialValues({
      title: fetchArticleResponse.article.title,
      body: fetchArticleResponse.article.body,
      description: fetchArticleResponse.article.description,
      tagList: fetchArticleResponse.article.tagList,
    });
  }, [fetchArticleResponse]);

  useEffect(() => {
    if (!updateArticleResponse) {
      return;
    }
    setIsSuccessfullSubmit(true);
  }, [updateArticleResponse]);

  if (currentUserState.isLoggedIn === false) {
    return <Navigate to="/" />;
  }

  if (isSuccessfullSubmit) {
    return <Navigate to={`/articles/${updateArticleResponse.article.slug}`} />;
  }

  return (
    <div>
      <ArticleForm
        errors={(updateArticleError && updateArticleError.errors) || {}}
        initialValues={initialValues}
        isLoading={updateArticleIsLoading}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditArticle;
