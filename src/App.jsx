import React, { useState } from 'react';
import './App.css';
import { Header } from './components/header';
import { Body } from './components/Body';
import { Footer } from './components/Footer';

function App() {

  return (
  <React.Fragment>
    <Header/>
    <Body/>
    <Footer/>
  </React.Fragment>
  )
}

export default App
