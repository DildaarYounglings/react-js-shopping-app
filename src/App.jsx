import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { Balance } from './components/Balance'
import { IncomeAndExpense } from './components/IncomeAndExpense'
import { TransactionList } from './components/TransactionList'
import { AddTransaction } from './components/AddTransaction'
import { GlobalProvider } from './context/GlobalState'

function App() {

  return (
    <GlobalProvider>
      <Header/>
      <div className="container">
        <Balance/>
        <IncomeAndExpense/>
        <TransactionList/>
        <AddTransaction/>
      </div>
    </GlobalProvider>
  )
}

export default App
