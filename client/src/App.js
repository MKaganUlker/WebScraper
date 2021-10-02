import React,{Fragment} from 'react';
import './App.css';


//components
import InputProduct from './components/inputProduct';
import ListProducts from './components/ListProducts';
function App() {
  return  ( 
    <Fragment>
      <div className="container">
         <InputProduct />
         <ListProducts /> 
      </div>
      
    </Fragment>
  );
}

export default App;
