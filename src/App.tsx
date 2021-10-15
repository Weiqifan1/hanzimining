import React from 'react';
import './App.css';
import {Route, Switch, RouteComponentProps} from 'react-router-dom';
import routes from "./config/routes";
import MainHeader from "./components/MainHeader";


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