import { extendTheme, withDefaultVariant } from "@chakra-ui/react";

const Button = {
  variants: {
    solid: {
      bg: "#131624",
      _hover: { bg: "#0E1224" },
      _active: { bg: "#0E1224" },
    },
  },
};

export default extendTheme({
  components: {
    Button,
  },
  styles: {
    global: () => ({
      body: {
        bg: "#1b1f35",
      },
    }),
  },
});
