import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch, RouteComponentProps} from 'react-router-dom';
import routes from "./config/routes";
import Welcome from "./pages/Welcome"//from "./components/Welcome";
import Products from "./pages/Products";
import Insurance from "./pages/Insurance";
import MainHeader from "./components/MainHeader";
import ProductDetail from "./pages/ProductDetail";


const App: React.FunctionComponent<{}> = props => {

  return (
    <div className="App">
        <MainHeader/>
        <Switch>
            {routes.map((route, index) => {
                return (
                    <Route
                        key = {index}
                        path = {route.path}
                        exact={route.exact}
                        render={(props: RouteComponentProps<any>) => (
                            <route.component
                                name = {route.name}
                                {...props}
                                {...route.props}
                            />
                        )}
                    />
                )})}
        </Switch>
    </div>
  );
}

export default App;

/*
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
*/
