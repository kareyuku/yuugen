import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/landing";
import AnimePage from "./pages/animePage";
import EpisodePage from "./pages/episodePage";
import AddAnimePage from "./pages/addAnimePage";
import ProfilePage from "./pages/profilePage";
import AdminPage from "./pages/adminPage";
import GroupPage from "./pages/groupPage";

export default createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/anime/:slug",
    element: <AnimePage />,
  },
  {
    path: "/anime/:slug/episode/:episodeNumber",
    element: <EpisodePage />,
  },
  {
    path: "/add/anime",
    element: <AddAnimePage />,
  },
  {
    path: "/profile/:username",
    element: <ProfilePage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/group/:groupId",
    element: <GroupPage />,
  },
]);
