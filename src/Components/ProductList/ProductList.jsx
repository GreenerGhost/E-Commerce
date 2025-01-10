import { useState, useEffect } from "react";
import "./ProductList.css";

export default function ProductList() {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);


  // Se ejecuta solo una vez, cuando se monta el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api-ten-jet.vercel.app/products");
        // Valida que la respuesta sea valida, de lo contrario marca  un error 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Si los datos son validos entonces se transforman los datos obtenidos en formato json
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="main-content">

      <aside className="filters">
        <h2>Filtros</h2>
        <div className="filters-category">
          <div className="filter-category">
            <h3>Categorias</h3>
            <label className="filter-type">
              <input type="checkbox" />
              <span>Hombres</span>
            </label>
            <label className="filter-type">
              <input type="checkbox" />
              <span>Mujeres</span>
            </label>
            <label className="filter-type">
              <input type="checkbox" />
              <span>Niños</span>
            </label>
          </div>

          <div className="filter-category">
            <h3>Tipo de producto</h3>
            <label className="filter-type">
              <input type="checkbox" />
              <span>Prendas de abrigo</span>
            </label>
            <label className="filter-type">
              <input type="checkbox" />
              <span>Ropa interior</span>
            </label>
            <label className="filter-type">
              <input type="checkbox" />
              <span>Calzado</span>
            </label>
          </div>
        </div>
      </aside>

      <main className="collections">
        <div className="op">
          <h2>TODAS LAS COLECCIONES</h2>
          <div className="sort-options">
            <label>
              Ordenar por:
              <select>
                <option value="popularity">Popularidad</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
              </select>
            </label>
          </div>
        </div>

        <div className="products">
          { // Se realiza una evaluación del error, si especifica un error se mostrará el error, en caso contrario se mostrara la información de los productos 
          error ? (
            <p className="error-message">Hubo un error en la carga de productos: {error}</p>
          ) : (
            products.map( ( product ) => (
              <div key={ product.id } className="product-card">
                <img src={ product.image } alt={product.name} className="product-image"/>
                <h3>{ product.nombre }</h3>
                <p>${ product.precio }</p>
              </div>
            ))
          )}
        </div>
      </main>
    </section>
  )
}
