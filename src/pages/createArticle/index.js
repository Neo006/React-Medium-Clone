import React, { useEffect, useState } from 'react';
import ArticleForm from '../../components/articleForm';
import useFetch from '../../hooks/useFetch';
import { Navigate } from 'react-router-dom';

const CreateArticle = () => {
  const apiUrl = '/articles';
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);
  const initialValues = {
    title: '',
    body: '',
    description: '',
    tagList: [],
  };
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);

  const handleSubmit = (article) => {
    doFetch({
      method: 'post',
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

  if (isSuccessfullSubmit && response) {
    return <Navigate to={`/articles/${response.article.slug}`} />;
  }

  return (
    <div>
      <ArticleForm
        errors={(error && error.errors) || {}}
        initialValues={initialValues}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateArticle;
