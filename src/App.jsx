import React, { useState } from 'react';
import './App.css';
import { ShopingCartStateProvider } from './context/ShopingCartState';
import { ShoppingPage } from './components/ShoppingPage';

function App() {

  return (
  <ShopingCartStateProvider>
    <ShoppingPage/>
  </ShopingCartStateProvider>
  )
}

export default App
