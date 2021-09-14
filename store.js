import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

let store;

const initialState = {
  user: null,
  categories: null,
  cbcPosts: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ON_LOGIN":
      return {
        ...state,
        user: action.user,
      };
    case "ON_LOGOUT": {
      return {
        ...state,
        user: null,
      };
    }
    case "LOAD_CATEGORIES": {
      return {
        ...state,
        categories: action.categories,
      };
    }
    case "LOAD_CBC_POST": {
      return {
        ...state,
        cbcPosts: action.posts,
      };
    }
    default:
      return state;
  }
};

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
