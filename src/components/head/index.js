import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title }) {
  return (
    <div className="Head">
      {
        title ?
        <h1>{title}</h1>
        :
        <h1>Loading...</h1>
      }
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
