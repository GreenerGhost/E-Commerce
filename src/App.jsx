import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Components/Home/Home"
import Navbar from "./Components/Navbar/Navbar"
import DetailsProducts from "./Components/DetailsProducts/DetailsProducts"
import { CartProvider } from "./Components/CartContext/CartContext"
import Cart from "./Components/Cart/Cart"
import { useState } from "react"
import Search from "./Components/Search/Search"

function App() {

  // Se maneja la búsqueda de productos inicializando la constante como una cadena vacía
  const [searchWords, setSearchWords] = useState();

  const handleSearch = (words) => {
    setSearchWords(words.toLowerCase());
  };


  return (
    <>
     {/* Se provee el contexto del carro de compras */} 
      <CartProvider>
        {/* Se utiliza Route para especificar las rutas y los componentes que se van a renderizar */} 
        <Router>
          <Navbar/>
          {/* Se utiliza Routes para navegar entre componentes */} 
          <Routes>
            {/* Se pasan props al elemento Home para buscar elementos por palabras */}
            <Route path="/" exact element={<Home searchWords = { searchWords } />} />
            <Route path="/product/:id" exact element={<DetailsProducts/>} />
            <Route path="/shopping-cart" element={<Cart/>} />
            <Route path="/search" element={<Search onSearch = { handleSearch }/>} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  )
}

export default App
