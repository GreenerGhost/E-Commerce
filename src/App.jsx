import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Components/Home/Home"
import Navbar from "./Components/Navbar/Navbar"
import DetailsProducts from "./Components/DetailsProducts/DetailsProducts"

function App() {

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/product/:id" exact element={<DetailsProducts />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
