import { useState, useEffect } from "react";
import "./ProductList.css";
import { useNavigate } from "react-router-dom";

export default function ProductList( { searchWords } ) {

  // se maneja el estado de los productos
  const [products, setProducts] = useState([]);

  // se maneja el error en caso de que se produzca un error en la llamada a la API
  const [error, setError] = useState(null);

  // se maneja el estado de la búsqueda
  const [sort, setSort] = useState("Popularidad");

  // se maneja el estado para la filtración
  const [filters, setFilters] = useState( { categorias: [], tipos: [] } )

  //
  const navigate = useNavigate();

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

  // Se ejecuta cuando cambia el estado de la búsqueda
  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  // Se ejecuta cuando se cambia el estado de la filtración usando operador de propagación
  const toggleFilters = (typeFilter, value) => {
    setFilters( ( prev ) => ({
      ...prev,
      [typeFilter]: prev[typeFilter].includes(value)
        ? prev[typeFilter].filter(( item ) => item !== value) 
        : [...prev[typeFilter], value],
    }))
  };

  // Se ejecutara para normalizar el texto de búsqueda
  const normalizedText = ( text ) => {
    return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  }

  // Se ejecuta cuando se cambia el estado de la filtración usando operador de propagación, es importante usar los mismos nombres que el la api utilizada
  const filteredProducts = products.filter( ( product ) => {

    // Se verifica que las categorías y tipos de productos seleccionados coincidan con las del producto actual
    const categoryFilter = filters.categorias.length === 0 || filters.categorias.includes(product.categoria);

    const typeFilter = filters.tipos.length === 0 || filters.tipos.includes(product.tipo);

    // Se normaliza el texto de búsqueda para que coincida con la información de la API
    const searchMatch = !searchWords || normalizedText( product.nombre ).includes( normalizedText( searchWords ) ) || normalizedText( product.descripcion ).includes( normalizedText( searchWords ) );

    // Se devuelve true si coincide con la información de la API y el estado de las filtraciones
    return categoryFilter && typeFilter && searchMatch;
  });

    // Se realiza el ordenamiento de productos según orden ascendente o descendente de precio que se ejecuta cuando cambia el estado de sort
    const orderedProducts = [...filteredProducts].sort((a, b) => {
      if (sort === "price-asc") {
        return a.precio - b.precio;
      } else if (sort === "price-desc") {
        return b.precio - a.precio;
      }
      return 0;
    });

    const handleImageClick = (id) => {
      navigate(`/product/${id}`);
    };

  return (
    <section className="main-content">

      <aside className="filters">
        <h2>Filtros</h2>
        <div className="filters-category">
          <div className="filter-category">
            <h3>Categorias</h3>
            <label className="filter-type">
              <input 
                type="checkbox" 
                onChange={ () => { toggleFilters("categorias", "Hombres") } }
              />
              <span>Hombres</span>
            </label>
            <label className="filter-type">
              <input
                type="checkbox" 
                onChange={ () => { toggleFilters("categorias", "Mujeres") } } 
              />
              <span>Mujeres</span>
            </label>
            <label className="filter-type">
              <input
                type="checkbox" 
                onChange={ () => { toggleFilters("categorias", "Niños") } }
              />
              <span>Niños</span>
            </label>
          </div>

          <div className="filter-category">
            <h3>Tipo de producto</h3>
            <label className="filter-type">
              <input 
                type="checkbox" 
                onChange={ () => { toggleFilters("tipos", "Prendas de abrigo") } }
              />
              <span>Prendas de abrigo</span>
            </label>
            <label className="filter-type">
              <input 
                type="checkbox" 
                onChange={ () => { toggleFilters("tipos", "Ropa interior") } }
              />
              <span>Ropa interior</span>
            </label>
            <label className="filter-type">
              <input
                type="checkbox" 
                onChange={ () => { toggleFilters("tipos", "Calzado") } }
              />
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
              <select onChange={handleSortChange} value={sort}>
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
          ) : filteredProducts.length > 0 ? (
            orderedProducts.map( ( product ) => (
              <div key={ product.id } className="product-card">
                <img 
                  src={ product.image } 
                  alt={product.nombre} 
                  className="product-image"
                  onClick={ () => handleImageClick(product.id) }  // Se llama al evento de click para navegar a la página de detalle del producto
                />
                <h3>{ product.nombre }</h3>
                <p>${ product.precio.toFixed(2) }</p>
              </div>
            ))
          ) : (
            <p className="no-results">No hay productos disponibles</p>
          ) }
        </div>
      </main>
    </section>
  )
}
