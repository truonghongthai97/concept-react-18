import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import GlobalLoader from "./components/common/GlobalLoader";

import router from "./router";
import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <Suspense fallback={<GlobalLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </ChakraProvider>
  );
}

export default App;
