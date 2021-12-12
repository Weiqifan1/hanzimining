import Practice from "../pages/Practice";
import Tags from "../pages/Tags";
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
        path: '/tags',
        name: 'Tags',
        component: Tags,
        exact: true
    },
    {
        path: '/statistics',
        name: 'Statistics',
        component: Statistics,
        exact: true
    }
]
export default routes;