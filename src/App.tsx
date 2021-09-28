import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Welcome from "./pages/Welcome"//from "./components/Welcome";
import Products from "./pages/Products";
import MainHeader from "./components/MainHeader";

function App() {

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

        </main>
    </div>
  );
}

export default App;
