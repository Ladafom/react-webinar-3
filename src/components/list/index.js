import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, onControlsClick, controlsType, cartLength }) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          <Item
            item={item}
            onControlsClick={onControlsClick}
            controlsType={controlsType}
            cartLength={cartLength}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
    }),
  ).isRequired,
  controlsType: PropTypes.string,
  cartLength: PropTypes.number,
  onControlsClick: PropTypes.func,
};

export default React.memo(List);
