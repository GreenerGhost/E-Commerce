import { useState } from "react";
import ProductList from "../ProductList/ProductList";
import Search from "../Search/Search";


export default function Home( { searchWords } ) {

  // Se maneja la búsqueda de productos en el componente Home de manera local, iniciando los valores con string vacíos
  const [ searchLocalWords, setSearchLocalWords ] = useState("");

  const handleSearch = (words) => {
    setSearchLocalWords(words);
  };

  return (
    <>
      <Search onSearch = { handleSearch }/>
      <ProductList searchWords = { searchLocalWords || searchWords }/>
    </>
  )
}
