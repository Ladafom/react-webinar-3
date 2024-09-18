import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ onAdd, type }) {
  return (
    <div className="Controls">
      {type === 'cart' && <button>Перейти</button>}
      {type === 'add' && <button onClick={onAdd}>Добавить</button>}
      {type === 'delete' && <button>Удалить</button>}
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  type: PropTypes.string,
};

export default React.memo(Controls);
