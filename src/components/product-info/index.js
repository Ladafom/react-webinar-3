import './style.css'

function ProductInfo({product, onAdd}) {

  const callbacks = {
    onAdd: () => onAdd(product._id),
  };

  return (
    <div className="ProductInfo">

      {
        Object.keys(product).length ?
        <>
          <p>
            { product.description }
          </p>
          <p>
            Страна производитель: <strong>{product.madeIn?.title}</strong>
          </p>
          <p>
            Категория: <strong>{product.category?.title}</strong>
          </p>
          <p>
            Год выпуска: <strong>{product.edition}</strong>
          </p>
          <h2>
            Цена: {product.price}
          </h2>
          <button onClick={callbacks.onAdd}>Добавить</button>
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