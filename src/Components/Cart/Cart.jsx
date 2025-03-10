import { useCart } from "../CartContext/CartContext";
import "./Cart.css";

export default function Cart() {

  const { shoppingCart, updateQuantity, removeFromCart } = useCart();

  const shippingCost = 10; // se fija el costo de envío en 10 

  const subTotalCost = shoppingCart.reduce( ( cumulativeTotal, item ) => cumulativeTotal + ( item.precio * item.cantidad ), 0 );

  const totalCost = subTotalCost + shippingCost;
  
  const handleIncreaseQuantity = ( productID ) => {
    updateQuantity( productID, 1 );
  }

  const handleDecreaseQuantity = ( productID ) => {
    // Se verifica que la cantidad del producto sea mayor que 1, de lo contrario no se hace nada
    const product = shoppingCart.find( ( item ) => item.id === productID )
    if ( product.cantidad > 1 ) {
      updateQuantity( productID, -1 );
    }
  };

  return (
    <div className="cart-container">
      <h2> TU <span>CARRITO </span></h2>
      { // Se utilizará un operador ternario para verificar que el carro está vacío, si es así se mostrará un mensaje diciendo que el carro está vacío, de lo contrario se mostraran los productos del carro
        shoppingCart.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          <>
          <div className="cart-header">
            <p>Producto</p>
            <p>Precio</p>
            <p>Cantidad</p>
            <p>Total</p>
            <p>Acción</p>
          </div>
          <ul className="cart-items">
            { shoppingCart.map( ( item ) => {

              const total = item.precio * item.cantidad;

              // Se utiliza un componente de función para renderizar cada producto del carro, el cual contiene las acciones de agregar, quitar y eliminar productos del carro
              return (
                <li className="cart-item" key={ item.id }>
                  <div className="item-info">
                  <img src={ item.image } alt={ item.nombre } className="item-info__image image-small"/>

                    <h3 className="item-info__name">{ item.nombre }</h3>
                  </div>
                  <p>${ item.precio.toFixed(2) } </p>
                  <div className="quantity-controls">
                    <button className="quantity-btn"
                    onClick={ () => handleDecreaseQuantity( item.id ) }  // Se llama al evento de click para un decremento la cantidad del producto en el carro
                    >
                      -
                    </button>
                    <input 
                      className="quantity-input"
                      type="number" 
                      value={ item.cantidad } 
                      readOnly/>

                      <button className="quantity-btn"
                        onClick={ () => handleIncreaseQuantity( item.id ) }  // Se llama al evento de click para incrementar la cantidad del producto en el carro
                      >
                        +
                      </button>
                  </div>

                  <p>${ total.toFixed(2) }</p>

                  <button className="delete-btn"
                    onClick={ () => removeFromCart( item.id ) }  // Se llama al evento de click para eliminar el producto del carro de compras
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </li>
              )
          } ) }
          </ul>
          </>
        )
      }
      <div className="cart-summary">
        <h2> TU <span>CARRITO </span></h2>
        <p>Subtotal: <span>${ subTotalCost.toFixed(2) }</span></p>
        <p>Coste del envío: <span>${ shippingCost.toFixed(2) }</span></p>
        <p className="cart-summary__total">Total: <span>${ totalCost.toFixed(2) }</span></p>
        <button className="checkout-btn">MÉTODO DE PAGO</button>
      </div>
    </div>
  )
}
