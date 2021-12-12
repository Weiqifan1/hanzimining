import Practice from "../pages/Practice";
import Products from "../pages/Products";
import Insurance from "../pages/Insurance";
import LoadAndSave from "../pages/LoadAndSave";
import SearchFlashcards from "../pages/SearchFlashcards";
import Statistics from "../pages/Statistics";
import IRoute from "../interfaces/route";

const routes: IRoute[] = [
    {
        path: '/loadandsave',
        name: 'LoadAndSave',
        component: LoadAndSave,
        exact: true
    },
    {
        path: '/searchflashcards',
        name: 'Search',
        component: SearchFlashcards,
        exact: true
    },
    {
        path: '/practice',
        name: 'Practice',
        component: Practice,
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