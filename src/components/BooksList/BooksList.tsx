import { FC, useCallback } from "react";
import { Link } from "react-router-dom";
import { selectors } from "../../store/feature/books";
import { loadMore } from "../../store/feature/books/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Container, Button, Spinner } from "../ui";
import { Book } from "./Book/Book";
import css from "./style.module.scss";

export const BooksList: FC = () => {
  const { items, loading, error, total, showMore } = useAppSelector(
    (state: AppState) => ({
      items: selectors.items(state),
      loading: selectors.loading(state),
      total: selectors.total(state),
      error: selectors.error(state),
      showMore: selectors.showMore(state),
    })
  );
  const dispatch = useAppDispatch();

  const showMoreHandler = useCallback(() => {
    dispatch(loadMore());
  }, [dispatch]);

  return (
    <>
      <Container>
        <p className={css.books__total}>Found {total} results</p>
        <div className={css.books__wrapper}>
          {items &&
            items.map((item, index) => (
              <Link to={item.id} key={item.id + item.volumeInfo.title + index}>
                <Book {...item} />
              </Link>
            ))}
        </div>
        {error ? <p className={css.books__error}>{error}</p> : null}
        {loading ? <Spinner /> : null}
      </Container>

      {showMore && (
        <Button text={"Show More"} type='button' onClick={showMoreHandler} />
      )}
    </>
  );
};
