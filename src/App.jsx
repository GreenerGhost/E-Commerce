import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Components/Home/Home"
import Navbar from "./Components/Navbar/Navbar"
import DetailsProducts from "./Components/DetailsProducts/DetailsProducts"
import { CartProvider } from "./Components/CartContext/CartContext"

function App() {

  return (
    <>
     {/* Se provee el contexto del carro de compras */} 
      <CartProvider>
        {/* Se utiliza Route para especificar las rutas y los componentes que se van a renderizar */} 
        <Router>
          <Navbar/>
          {/* Se utiliza Routes para navegar entre componentes */} 
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/product/:id" exact element={<DetailsProducts />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  )
}

export default App
