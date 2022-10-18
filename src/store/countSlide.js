const initialState = { count: 0 };


const createCountSlide = (set) => ({
  ...initialState,

  increment: () =>
    set((state) => {
      state.countSlide.count += 1;
    }),
});

export default createCountSlide;
