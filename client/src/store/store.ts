import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { alertSlice, updateEntrySlice } from "./slices";
import { apiQuery } from "./queries";

const store = configureStore({
    reducer: {
        alertSlice,
        updateEntrySlice,
        [apiQuery.reducerPath]: apiQuery.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiQuery.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
