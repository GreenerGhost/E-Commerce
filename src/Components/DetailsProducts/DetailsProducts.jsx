import { useParams } from "react-router-dom";
import "./DetailsProducts.css";
import { useEffect, useState } from "react";
import { useCart } from "../CartContext/CartContext";

export default function DetailsProducts() {

  // se obtiene el id del producto de la ruta usando useParams, que devuelve los valores de una url
  const { id } = useParams();
  
  // se maneja el estado del producto
  const [product, setProduct] = useState(null);

  // se maneja el estado de posibles errores
  const [error, setError] = useState(null);

  // se importa la función para añadir productos al carro de compras desde CartContext
  const { addToCart } = useCart();

  // se maneja la activación de la función cuando se active el botón 
  const handleAddToCart = () => {
    // Se valida que el producto esté existente y lo añade al carro de compras
    if (product) {
      addToCart(
        {
          id: product.id,
          nombre: product.nombre,
          precio: product.precio,
          image: product.image,
          cantidad: 1,
        }
      );
      alert("Producto agregado al carrito");
    }
  };

  // Se ejecuta una vez, cuando se monta el componente
  useEffect(() => {
    if (product) {
      // Se establece el título del documento para mostrar el nombre del producto
      document.title = `Productos - ${product.nombre}`;
    }
  }, [product]);

  // Se ejecuta una vez, cuando se cambia el id
  useEffect(() => {
    // Se limpia el estado del producto y el error cada vez que se cambia el id
    setProduct(null);
    setError(null);
  }, [id]);

  // Se ejecuta una vez, cuando se activa el botón de comprar


  // Se ejecuta una vez, para poder obtener los datos del producto dada su id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api-ten-jet.vercel.app/products/${id}`);
        // Valida que la respuesta sea valida, de lo contrario marca  un error 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Si los datos son validos entonces se transforman los datos obtenidos en formato json
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();

    // Este Hook funciona cada vez que se cambia el id
  }, [id]);

  // Si no se ha obtenido el producto, se muestra un mensaje de error
  if (error) {
    return <h2 className="error-message">{ error }</h2>;
  }

  // Si se ha obtenido el producto, se muestra el detalle del producto
  return (
    <div className="details-product">
      {
        product ? (
          <>
            <img src={product.image} alt={product.nombre} className="image-small"/>
            <img src={product.image} alt={product.nombre}/>
            <div className="product-info">
              <h1 className="name">{ product.nombre }</h1>
              <p className="price">${ product.precio.toFixed(2) }</p>
              <p className="description">{ product.descripcion }</p>
              <div className="size-options">
                <button>S</button>
                <button>M</button>
                <button>L</button>
                <button>XL</button>
              </div>
              <button 
                className="add-to-shopping-cart"
                onClick={ handleAddToCart }  // Se llama al evento de click para añadir el producto al carro de compras
              >
                Agregar al carrito
              </button>
              <p className="note"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, similique voluptatibus? Nihil dolorum nesciunt perspiciatis laborum recusandae placeat eligendi, quia repellat vel deserunt molestias necessitatibus laudantium atque quo. Praesentium, laboriosam! </p>
            </div>
          </>
        ) : (
          // se muestra un elemento de carga cuando el producto aun no se encuentra disponible
          <p>Cargando producto...</p>
        )
      }
    </div>
  );
}
