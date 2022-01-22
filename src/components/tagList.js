import React from 'react';
import PropTypes from 'prop-types';

const TagList = ({ tags }) => {
  return (
    <ul className="tag-list">
      {tags.map((tag) => (
        <li className="tag-default tag-pill tag-outline" key={tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
};

TagList.propTypes = {
  tags: PropTypes.array.isRequired,
};

export default TagList;
