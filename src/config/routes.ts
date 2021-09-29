import Welcome from "../pages/Welcome";
import Products from "../pages/Products";
import Insurance from "../pages/Insurance";
import IRoute from "../interfaces/route";

const routes: IRoute[] = [
    {
        path: '/welcome',
        name: 'Welcome',
        component: Welcome,
        exact: true
    },
    {
        path: '/products',
        name: 'Products',
        component: Products,
        exact: true
    },
    {
        path: '/insurance',
        name: 'Insurance',
        component: Insurance,
        exact: true
    }
]
export default routes;