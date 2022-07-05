import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./feature/books";

export const store = configureStore({
  reducer: {
    books: bookReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
