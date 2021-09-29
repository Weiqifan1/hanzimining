
import { NavLink } from 'react-router-dom';
import classes from "./MainHeader.module.css";
import routes from "../config/routes";

const MainHeader = () => {
    return <header className={classes.header}>
        <nav>
            <ul>
                {routes.map((route, index) => {
                    return <li>
                        <NavLink activeClassName={classes.active} to={route.path}>
                            {route.name} </NavLink>
                    </li>
                })}
            </ul>
        </nav>
    </header>
};

export default MainHeader;