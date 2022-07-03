import { ChangeEventHandler, FormEventHandler, useCallback } from "react";
import {
  search,
  setCategories,
  setOrderBy,
  setSearchQuery,
} from "../../store/feature/books/slice";
import { useAppDispatch } from "../../store/hooks";
import { Button, Input, Select, Container } from "../";
import css from "./style.module.scss";

const categoryOptions = [
  "all",
  "art",
  "biography",
  "business",
  "comics",
  "computers",
  "cooking",
  "fiction",
  "gardening",
  "health",
  "history",
  "medical",
  "nature",
  "poetry",
  "science",
];

const sortOptions = ["relevance", "newest"];

export const Header = () => {
  const dispatch = useAppDispatch();

  const getSearchValue: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      dispatch(setSearchQuery(e.target.value || ""));
    },
    [dispatch]
  );

  const changeCategory: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => {
      dispatch(setCategories(e.target.value));
    },
    [dispatch]
  );

  const changeOrderBy: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => {
      dispatch(setOrderBy(e.target.value));
    },
    [dispatch]
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(search());
    },
    [dispatch]
  );

  return (
    <header className={css.header}>
      <Container>
        <h1 className={css.header__title}>Search for books</h1>
        <form className={css.header__search} onSubmit={onSubmit}>
          <Input placeholder='Search' type='text' onChange={getSearchValue} />
          <Button text={"Search"} type='submit' />
        </form>
        <div className={css.header__filter}>
          <div className={css.header__filter_category}>
            <span className={css.header__filter_text}>Categories</span>
            <Select items={categoryOptions} onChange={changeCategory} />
          </div>
          <div className={css.header__filter_sort}>
            <span className={css.header__filter_text}>Sorting by</span>
            <Select items={sortOptions} onChange={changeOrderBy} />
          </div>
        </div>
      </Container>
    </header>
  );
};
