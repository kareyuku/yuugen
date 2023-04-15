import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

import Landing from "./pages/landing";
import { ChakraProvider } from "@chakra-ui/react";
import AnimePage from "./pages/animePage";
import EpisodePage from "./pages/episodePage";
import AddAnimePage from "./pages/addAnimePage";
import ProfilePage from "./pages/profilePage";
import AdminPage from "./pages/adminPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/anime/:name",
    element: <AnimePage />,
  },
  {
    path: "/anime/:name/episode/:episodeNumber",
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
]);

export default () => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  );
};
