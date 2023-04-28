import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import store from "./store";

import IsLogged from "./components/isLogged";

import "./App.css";
import "./styles/modal.css";
import "./styles/slider.css";
import "./styles/tabs.css";
import theme from "./theme";
import router from "./router";

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
