import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ onClick, type }) {

  return (
    <div className="Controls">
      {type === 'openCart' && <button onClick={onClick}>Перейти</button>}
      {type === 'closeModal' && <button onClick={onClick}>Закрыть</button>}
      {type === 'add' && <button onClick={onClick}>Добавить</button>}
      {type === 'delete' && <button onClick={onClick}>Удалить</button>}
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  type: PropTypes.string,
};

export default React.memo(Controls);
