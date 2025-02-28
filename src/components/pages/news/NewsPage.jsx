import { Outlet } from "react-router-dom";

function NewsPage() {
  return (
    <div>
      <h2>News Page</h2>
      <Outlet />
    </div>
  );
}

export default NewsPage;
