import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

import PrivateRoute from "../common/PrivateRoute";

const AdminLayout = () => {
  return (
    <PrivateRoute>
      <div>
        <header>Header</header>
        <aside>
          Sidebar |
          <Link to="/admin/about">About | </Link>
          <Link to="/admin/dashboard">Dashboard | </Link>
          <Link to="/admin/chat">Chat</Link>
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    </PrivateRoute>
  );
};

export default AdminLayout;
