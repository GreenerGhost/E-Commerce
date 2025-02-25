import React, { children, createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ( { children } ) => {

  // Se implementan las constantes para los estados del carro de compras
  const [shoppingCart, setShoppingCart] =useState([]);

  // Se implementa la función para añadir productos al carro de compras
  const addToCart = (product) => {
    setShoppingCart( (previousCart) => {

      // Se verifica si el producto ya está en el carro de compras
      const existingProduct = previousCart.findIndex(
        (item) => item.id === product.id
      );

      // Verifica el resultado de findIndex que devuelve 0 o 1 si el producto está en el carro de compras, de lo contrario regresa un -1, por lo que se añadirá el producto al carro de compras
      if (existingProduct >= 0) {
        const updatedCart = [...previousCart];
        updatedCart[existingProduct].quantity += 1;
        return updatedCart;
      } else {
        return [...previousCart, {...product, quantity: 1 }];
      }
    });
  };

  return (
    // Provider envuelve a los componentes en un proveedor de contexto para especificar el valor de este contexto para todos los componentes hijos
    <CartContext.Provider value = { { shoppingCart, addToCart } }>
      { children }
    </CartContext.Provider>
  )
};

export const useCart = () => useContext( CartContext );