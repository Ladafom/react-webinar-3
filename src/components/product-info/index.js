import './style.css'

function ProductInfo({product, onAdd, productInfoContent}) {

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
            {productInfoContent.productManufacture}: <strong>{product.madeIn?.title}</strong>
          </p>
          <p>
          {productInfoContent.productCategory}: <strong>{product.category?.title}</strong>
          </p>
          <p>
          {productInfoContent.productRelease}: <strong>{product.edition}</strong>
          </p>
          <h2>
          {productInfoContent.productPrice}: {product.price}
          </h2>
          <button onClick={callbacks.onAdd}>{productInfoContent.buttonAdd}</button>
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