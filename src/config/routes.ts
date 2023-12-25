import Practice from "../pages/Practice";
import Tags from "../pages/Tags";
import LoadAndSave from "../pages/LoadAndSave";
import EditDeck from "../pages/EditDeck";
import SearchFlashcards from "../pages/SearchFlashcards";
import Statistics from "../pages/Statistics";
import IRoute from "../interfaces/route";
import CreateDeck from "../pages/CreateDeck";
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import MergeFiles from "../pages/MergeFiles";

const routes: IRoute[] = [
    {
        path: '/hanzimining',
        name: 'Home',
        component: Home,
        exact: true
    },
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
    },
    {
        path: '/mergefiles',
        name: 'MergeFiles',
        component: MergeFiles,
        exact: true
    },
    {
        path: '/editdeck',
        name: 'EditDeck',
        component: EditDeck,
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
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
        exact: true
    }
]
export default routes;