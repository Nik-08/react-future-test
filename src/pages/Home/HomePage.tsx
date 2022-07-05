import { useEffect } from "react";
import { BooksList } from "../../components";
import { selectors } from "../../store/feature/books";
import { search } from "../../store/feature/books/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import css from "./style.module.scss";

export const HomePage = () => {
  const dispatch = useAppDispatch();

  const { orderBy, category } = useAppSelector((state: AppState) => ({
    orderBy: selectors.orderBy(state),
    category: selectors.category(state),
  }));

  useEffect(() => {
    dispatch(search());
  }, [dispatch, orderBy, category]); // When category change, sending request

  return (
    <div className={css.main}>
      <BooksList />
    </div>
  );
};
