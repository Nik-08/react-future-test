import reducer, { initialState, search } from "../slice";

test("Should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual(initialState);
});
