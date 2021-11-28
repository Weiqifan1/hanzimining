import Welcome from "../pages/Welcome";
import Products from "../pages/Products";
import Insurance from "../pages/Insurance";
import PasteHeisig from "../pages/PasteHeisig";
import DisplayAllHeisig from "../pages/DisplayAllHeisig";
import Statistics from "../pages/Statistics";
import IRoute from "../interfaces/route";

const routes: IRoute[] = [
    {
        path: '/pasteheisig',
        name: 'PasteHeisig',
        component: PasteHeisig,
        exact: true
    },
    {
        path: '/displayallheisig',
        name: 'DisplayAllHeisig',
        component: DisplayAllHeisig,
        exact: true
    },
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
        path: '/statistics',
        name: 'Statistics',
        component: Statistics,
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