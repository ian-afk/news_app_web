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
import NewsTags from "./pages/news/NewsTags";
import AdminPanel from "./pages/AdminPanel";
import Statistics from "./pages/Statistics";
function App() {
  const getNavClass = ({ isActive }) =>
    isActive
      ? "text-blue-500 font-bold border-b-2 border-blue-500"
      : "text-gray-700 font-bold";

  const AppLayout = () => (
    <>
      <div>
        <ul className="flex space-x-2">
          <li>
            <NavLink to={"/"} className={getNavClass}>
              Statistics
            </NavLink>
          </li>
          <li>
            <NavLink to={"/news"} end className={getNavClass}>
              News
            </NavLink>
          </li>
          <li>
            <NavLink to={"/news/tags"} className={getNavClass}>
              News by tags
            </NavLink>
          </li>
          <li>
            <NavLink to={"/adminpanel"} className={getNavClass}>
              Admin Panel
            </NavLink>
          </li>
        </ul>
      </div>

      <Outlet />
    </>
  );
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppLayout />}>
        <Route path="/" element={<Statistics />}></Route>

        <Route path="/news" element={<NewsPage />}>
          <Route index element={<NewsList />} />
          <Route path="tags" element={<NewsTags />} />
          <Route path=":id" element={<NewsDetail />} />
        </Route>
        <Route path="/adminpanel" element={<AdminPanel />}>
          <Route index element={<div>HELLO FROM ADMIN</div>} />
        </Route>
      </Route>
    )
  );
  return (
    <div className="mt-4 grid grid-cols-10 justify-center w-[70vw] mx-auto">
      <div className="col-span-10 flex justify-center flex-col">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
