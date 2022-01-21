import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const FeedToggler = ({ tagName }) => {
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <NavLink to="/feed" className="nav-link">
            Your feed
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            Global feed
          </NavLink>
        </li>
        {tagName && (
          <li className="nav-item">
            <NavLink to={`/tags/${tagName}`} className="nav-link">
              <i className="ion-pound"></i>
              {tagName}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

FeedToggler.propTypes = {
  tagName: PropTypes.string,
};

export default FeedToggler;
