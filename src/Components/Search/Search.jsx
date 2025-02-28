import { useState } from "react"
import "./Search.css"

export default function Search( { onSearch } ) {

  const [ searchWords, setSearchWords ] = useState("");

  const handleSearchChange = (e) => {
    const words = (e.target.value);
    setSearchWords(words);
    onSearch(words);
  }

  return (
    <section className="search">
      <input type="search" 
        placeholder="Buscar productos..."
        className="search-input"
        value={ searchWords }
        onChange={ handleSearchChange }
      />
    </section>
  )
}
