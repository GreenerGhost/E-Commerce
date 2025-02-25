import { useCart } from "../CartContext/CartContext";
import "./Cart.css";

export default function Cart() {

  const { shoppingCart } = useCart();

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
            { shoppingCart.map( ( item ) => (
              // Se utiliza un componente de función para renderizar cada producto del carro, el cual contiene las acciones de agregar, quitar y eliminar productos del carro
              <li className="cart-item" key={ item.id }>
                <div className="item-info">
                <img src={ item.image } alt={ item.nombre } className="item-info__image image-small"/>

                  <h3 className="item-info__name">{ item.nombre }</h3>
                </div>
                <p>${ item.precio.toFixed(2) } </p>
                <div className="quantity-controls">
                  <button className="quantity-btn">
                    -
                  </button>
                  <input 
                    className="quantity-input"
                    type="number" 
                    value={ item.cantidad } 
                    readOnly/>

                    <button className="quantity-btn">
                      +
                    </button>
                </div>

                <p>$0</p>

                <button className="delete-btn">
                  <i className="fas fa-trash"></i>
                </button>
              </li>
            ) ) }
          </ul>
          </>
        )
      }
    </div>
  )
}
