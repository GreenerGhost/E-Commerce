import { useState } from "react";
import ProductList from "../ProductList/ProductList";
import Search from "../Search/Search";
import Hero from "../Hero/Hero";


export default function Home( { searchWords, showSearch } ) {

  // Se maneja la búsqueda de productos en el componente Home de manera local, iniciando los valores con string vacíos
  const [ searchLocalWords, setSearchLocalWords ] = useState("");

  const handleSearch = (words) => {
    setSearchLocalWords(words);
  };

  return (
    <>
    { !showSearch && <Hero/>}
    { showSearch && <Search onSearch = { handleSearch }/>}
      <ProductList searchWords = { searchLocalWords || searchWords }/>
    </>
  )
}
