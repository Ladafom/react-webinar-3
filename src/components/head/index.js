import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title, onLangChange, lang }) {

  return (
    <div className="Head">
      {
        title ?
        <h1>{title}</h1>
        :
        <h1>Loading...</h1>
      }
      <div className='Head-lang'>
        <button
          className={lang === 'en' ? 'Head-lang__active' : ''}
          onClick={()=>onLangChange('en')}
        >
          En
        </button>
        <button
          className={lang === 'ru' ? 'Head-lang__active' : ''}
          onClick={()=>onLangChange('ru')}
        >
          Ru
        </button>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
