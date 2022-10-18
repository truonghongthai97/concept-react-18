import create from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import createAuthSlide from "./authSlice";
import createCountSlide from "./countSlide";

const options = { name: "demo-store" };

const useStore = create(
  devtools(
    immer(
      (...args) => ({
        authSlide: createAuthSlide(...args),
        countSlide: createCountSlide(...args),
      }),
      options
    )
  )
);

export default useStore;
