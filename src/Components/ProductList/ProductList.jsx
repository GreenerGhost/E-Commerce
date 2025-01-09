import "./ProductList.css";

export default function ProductList() {
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
      </main>
    </section>
  )
}
