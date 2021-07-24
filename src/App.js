import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'
import React, { useState } from 'react'
import CartProvider from './store/CartProvider';

function App() {

const [cartIsShown, setCartIsShown] = useState(false)

const showcartHandler= () => {
  setCartIsShown(true)
}

const hideCartHandler = () => {
  setCartIsShown(false)
}

  return (
    <CartProvider>
      {cartIsShown && <Cart onCloseModal={hideCartHandler}/>}
      <Header onShowCart={showcartHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
