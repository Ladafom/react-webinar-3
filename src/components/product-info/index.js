import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import './style.css'

function ProductInfo({product, onAdd}) {

  const callbacks = {
    onAdd: () => onAdd(product._id),
  };

  const store = useStore();
  const translator = store.actions.language
  const select = useSelector(state => ({
    lang: state.language.lang,
  }));

  return (
    <div className="ProductInfo">

      {
        Object.keys(product).length ?
        <>
          <p>
            { product.description }
          </p>
          <p>
            {translator.translate('productManufacture')}: <strong>{product.madeIn?.title}</strong>
          </p>
          <p>
          {translator.translate('productCategory')}: <strong>{product.category?.title}</strong>
          </p>
          <p>
          {translator.translate('productRelease')}: <strong>{product.edition}</strong>
          </p>
          <h2>
          {translator.translate('productPrice')}: {product.price}
          </h2>
          <button onClick={callbacks.onAdd}>{translator.translate('buttonAdd')}</button>
        </>
        :
        <h2>
          Loading...
        </h2>
      }

    </div>
  );
}

export default ProductInfo;