import Practice from "../pages/Practice";
import Tags from "../pages/Tags";
import LoadAndSave from "../pages/LoadAndSave";
import EditDeck from "../pages/EditDeck";
import SearchFlashcards from "../pages/SearchFlashcards";
import Statistics from "../pages/Statistics";
import IRoute from "../interfaces/route";
import CreateDeck from "../pages/CreateDeck";

const routes: IRoute[] = [
    {
        path: '/loadandsave',
        name: 'LoadAndSave',
        component: LoadAndSave,
        exact: true
    },
    {
        path: '/createDeck',
        name: 'CreateDeck',
        component: CreateDeck,
        exact: true
    }
    ,
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
        path: '/editdeck',
        name: 'EditDeck',
        component: EditDeck,
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