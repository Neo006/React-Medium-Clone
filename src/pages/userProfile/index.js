import React from 'react';
import { useParams, useLocation, NavLink } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import useFetch from '../../hooks/useFetch';
import UserArticles from './components/userArticles';

const UserProfile = () => {
  const { slug } = useParams();
  const location = useLocation();
  const isFavorites = location.pathname.includes('favorites');
  const apiUrl = `/profiles/${slug}`;
  const [{ response }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (!response) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img className="user-img" alt="" src={response.profile.image} />
              <h4>{response.profile.username}</h4>
              <p>{response.profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink to={`/profiles/${response.profile.username}`} className="nav-link" end>
                    My Posts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={`/profiles/${response.profile.username}/favorites`} className="nav-link">
                    Favorited Posts
                  </NavLink>
                </li>
              </ul>
            </div>
            <UserArticles
              username={response.profile.username}
              location={location}
              isFavorites={isFavorites}
              url={location.pathname}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
