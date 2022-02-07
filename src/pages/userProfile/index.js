import React, { useContext, useEffect } from "react";
import { useParams, useLocation, NavLink, Link } from "react-router-dom";
import FollowAuthor from "../../components/followAuthor";
import useFetch from "../../hooks/useFetch";
import UserArticles from "./components/userArticles";
import { CurrentUserContext } from "../../contexts/currentUser";

const UserProfile = () => {
  const { slug } = useParams();
  const location = useLocation();
  const isFavorites = location.pathname.includes("favorites");
  const apiUrl = `/profiles/${slug}`;
  const [{ response, isLoading }, doFetch] = useFetch(apiUrl);
  const [currenUserState] = useContext(CurrentUserContext);

  const isAuthor = () => {
    if (!response || !currenUserState.isLoggedIn) {
      return false;
    }
    return response.profile.username === currenUserState.currentUser.username;
  };

  useEffect(() => {
    doFetch();
  }, [doFetch, slug]);

  if (!response) {
    return null;
  }

  return (
    <>
      {!isLoading && (
        <div className="profile-page">
          <div className="user-info">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">
                  <img
                    className="user-img"
                    alt=""
                    src={response.profile.image}
                  />
                  <h4>{response.profile.username}</h4>
                  <p>{response.profile.bio}</p>
                  {isAuthor() && (
                    <Link
                      to="/settings"
                      className="btn btn-sm btn-outline-secondary action-btn"
                    >
                      <i className="ion-gear-a"></i>
                      &nbsp;Edit Profile Settings
                    </Link>
                  )}
                  {!isAuthor() && (
                    <FollowAuthor
                      authorUsername={response.profile.username}
                      isFollowing={response.profile.following}
                    />
                  )}
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
                      <NavLink
                        to={`/profiles/${response.profile.username}`}
                        className="nav-link"
                        end
                      >
                        My Posts
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to={`/profiles/${response.profile.username}/favorites`}
                        className="nav-link"
                      >
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
      )}
    </>
  );
};

export default UserProfile;
