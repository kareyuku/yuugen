import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

import Landing from "./pages/landing";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import AnimePage from "./pages/animePage";
import EpisodePage from "./pages/episodePage";
import AddAnimePage from "./pages/addAnimePage";
import ProfilePage from "./pages/profilePage";
import AdminPage from "./pages/adminPage";
import IsLogged from "./components/isLogged";

import "./styles/modal.css";
import "./styles/slider.css";
import "./styles/tabs.css";
import GroupPage from "./pages/groupPage";
import theme from "./theme";

const router = createBrowserRouter([
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

const getTheme = theme;

export default () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={getTheme}>
        <IsLogged>
          <RouterProvider router={router} />
        </IsLogged>
      </ChakraProvider>
    </Provider>
  );
};
