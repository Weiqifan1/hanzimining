import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Welcome from "./pages/Welcome"//from "./components/Welcome";
import Products from "./pages/Products";
import Insurance from "./pages/Insurance";
import MainHeader from "./components/MainHeader";
import ProductDetail from "./pages/ProductDetail";

function App() {


    // :productId"> */
  return (
    <div className="App">
        <MainHeader/>
        <main>
            <Route path="/welcome">
                <Welcome/>
            </Route>
            <Route path="/products">
                <Products/>
            </Route>
            <Route path="/product-detail">
                <ProductDetail/>
            </Route>
            <Route path="/insurance">
                <Insurance/>
            </Route>

        </main>
    </div>
  );
}

export default App;
