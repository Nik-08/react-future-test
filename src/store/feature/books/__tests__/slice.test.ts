import reducer, { initialState, search, loadMore } from "../slice";
import { book1, booksState } from "../__mock__/books";

test("Should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual(initialState);
});

test("Should set loading while search pending", () => {
  const requestId = "9c611832-329f-49d0-88ec-b7bb2e62d6d3";
  const action = search.pending(requestId);
  const nextState = reducer(initialState, action);

  expect(nextState.loading).toBe(true);
  expect(nextState.items.length).toBe(0);
  expect(nextState.error).toBe(null);
});

test("Should set search result", () => {
  const items: BookItem[] = [book1];
  const payload = {
    items,
    totalItems: 10,
  };
  const action = search.fulfilled(payload, "test");
  const nextState = reducer(initialState, action);

  expect(nextState.loading).toBe(false);
  expect(nextState.items).toBe(items);
  expect(nextState.error).toEqual(null);
});

test("Should save error to state", () => {
  const error = new Error("Test error");
  const action = search.rejected(error, "test");
  const nextState = reducer(initialState, action);

  expect(nextState.loading).toBe(false);
  expect(nextState.items).toStrictEqual([]);
  expect(nextState.error).toBeDefined();
});

test("Should set loading while loadMore pending", () => {
  const requestId = "9c611832-329f-49d0-88ec-b7bb2e62d6d3";
  const action = loadMore.pending(requestId);

  const nextState = reducer(booksState, action);

  expect(nextState.loading).toBe(true);
  expect(nextState.items.length).toBe(2);

  expect(nextState.error).toBe(null);
});

test("Should set loadMore result", () => {
  const items: BookItem[] = [...booksState.items];
  const payload = {
    items,
    totalItems: 10,
  };

  const action = loadMore.fulfilled(payload, "test");
  const nextState = reducer(booksState, action);

  expect(nextState.loading).toBe(false);
  expect(nextState.items.length).toBe(4);
  expect(nextState.error).toEqual(null);
});

test("Should save error showMore to state", () => {
  const error = new Error("Test error");
  const action = loadMore.rejected(error, "test");
  const nextState = reducer(booksState, action);

  expect(nextState.loading).toBe(false);
  expect(nextState.showMore).toBe(false);
  expect(nextState.items).toEqual(booksState.items);
  expect(nextState.error).toBeDefined();
});
