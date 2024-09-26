import { memo } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useStore from '../../store/use-store';
import './style.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const store = useStore();
  const translator = store.actions.language

  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
  };

  return (
    <div to={props.item._id} className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link to={`/products/${props.item._id}`} className={cn('title')}>{props.item.title}</Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {translator.translate('piece')}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}> {translator.translate('buttonDelete')} </button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
