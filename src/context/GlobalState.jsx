import React,{createContext,useContext,useReducer} from 'react';
import AppReducer from './AppReducer';

//  Initial state
const initialState = {
    transactions:[
    ]
}
const GlobalContext = createContext(initialState);

//  Global State
export const GlobalContextData = () => useContext(GlobalContext);

//  Provider compnent
export const GlobalProvider = ({children}) => {
    const [state,dispatch] = useReducer(AppReducer,initialState);
    // Actions
    function deleteTransaction(id){
      dispatch({type:'DELETE_TRANSACTION',payload:id});
    }
    function addTransaction(transaction){
      dispatch({type:'ADD_TRANSACTION',payload:transaction});
    }
  return (
    <GlobalContext.Provider value={{transactions:state.transactions,deleteTransaction,addTransaction}}>
        {children}
    </GlobalContext.Provider>
  )
}
