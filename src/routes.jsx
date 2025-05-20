import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import UserDetails from "./pages/UserDetails";

const routes = [
    { path: '/', element: <Home /> },
    { path: '/users/:id', element: <UserDetails /> },
    { path: '/create', element: <CreateUser /> },
    { path: '/edit/:id', element: <EditUser /> },
    { path: '*', element: <NotFound /> }
]

export default routes;