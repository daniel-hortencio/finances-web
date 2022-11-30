import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { Provider } from "react-redux";

import { store } from "../store";

const chakraGlobalStyles = extendTheme({
  styles: {
    global: () => ({
      li: {
        listStyle: "none",
      },
    }),
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const methods = useForm();

  return (
    <Provider store={store}>
      <ChakraProvider theme={chakraGlobalStyles}>
        <FormProvider {...methods}>
          <Component {...pageProps} />
        </FormProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
