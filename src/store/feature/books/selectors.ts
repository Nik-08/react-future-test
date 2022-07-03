import { createSelector, Selector } from "reselect";

export const state: Selector<AppState, AppState["books"]> = ($state) =>
  $state.books;

export const loading = createSelector([state], ($state) => $state.loading);
export const items = createSelector([state], ($state) => $state.items);
export const error = createSelector([state], ($state) => $state.error);
export const total = createSelector([state], ($state) => $state.total);
export const category = createSelector([state], ($state) => $state.category);
export const orderBy = createSelector([state], ($state) => $state.orderBy);
export const showMore = createSelector([state], ($state) => $state.showMore);

export const startIndex = createSelector(
  [state],
  ($state) => $state.startIndex
);
export const searchQuery = createSelector(
  [state],
  ($state) => $state.searchQuery
);
export const item = createSelector([state], ($state) => $state.item);
