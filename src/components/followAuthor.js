import React from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import classNames from 'classnames';

const FollowAuthor = ({ authorUsername, isFollowing }) => {
  const followApiUrl = `/profiles/${authorUsername}/follow`;
  const [{ response }, doFetch] = useFetch(followApiUrl);
  const isFollowingWithResponse = response ? response.profile.following : isFollowing;
  const buttonText = isFollowingWithResponse ? 'Unfollow' : 'Follow';
  const buttonClasses = classNames({
    'btn': true,
    'btn-sm': true,
    'action-btn': true,
    'btn-secondary': isFollowingWithResponse,
    'btn-outline-secondary': !isFollowingWithResponse,
  });

  const follow = () => {
    doFetch({
      method: isFollowingWithResponse ? 'delete' : 'post',
    });
  };

  return (
    <button className={buttonClasses} style={{ marginRight: '10px' }} onClick={follow}>
      <i className="ion-plus-round"></i>
      &nbsp; {buttonText}
      {authorUsername}
    </button>
  );
};

FollowAuthor.propTypes = {
  authorUsername: PropTypes.string,
  isFollowing: PropTypes.bool,
};

export default FollowAuthor;
