import {
  Routes,
  Route,
  useNavigate,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  RouterProvider,
  NavLink,
} from "react-router-dom";
import NewsPage from "./pages/news/NewsPage";
import NewsList from "./pages/news/NewsList";
import NewsDetail from "./pages/news/NewsDetail";
function App() {
  const AppLayout = () => (
    <>
      <div>
        <ul className="flex space-x-2">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/news"}>News</NavLink>
          </li>
          <li>
            <NavLink to={"/news/tags"}>News by tags</NavLink>
          </li>
          <li>
            <NavLink to={"/adminpanel"}>Admin Panel</NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppLayout />}>
        <Route path="/" element={<div>INDEX</div>}></Route>

        <Route path="/news" element={<NewsPage />}>
          <Route index element={<NewsList />} />
          <Route path="tags" element={<div>Tags</div>} />
          <Route path=":id" element={<NewsDetail />} />
        </Route>
        <Route path="/adminpanel" element={<div>Admin panel</div>}>
          <Route index element={<div>HELLO FROM ADMIN</div>} />
        </Route>
      </Route>
    )
  );
  return (
    <div className="m-4">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
