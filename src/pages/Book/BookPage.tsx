import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "../../components";
import { selectors } from "../../store/feature/books";
import { fetchSingleBook } from "../../store/feature/books/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import css from "./style.module.scss";

import bookCover from "../../assets/bookCover.png";

export const BookPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { item } = useAppSelector((state: AppState) => ({
    item: selectors.item(state),
  }));

  useEffect(() => {
    dispatch(fetchSingleBook(id!));
  }, [dispatch, id]);

  return (
    <div className={css.book__page}>
      {item && (
        <>
          <div className={css.book__page_header}>
            <Link to={"/"}>
              <Button text={"← Back"} />
            </Link>
          </div>
          <div className={css.book__page_body}>
            <div className={css.book__page_image}>
              {item.volumeInfo.imageLinks ? (
                <img src={item.volumeInfo.imageLinks.smallThumbnail} alt='' />
              ) : (
                <img src={bookCover} alt='' />
              )}
            </div>

            <div className={css.book__page_content}>
              <p className={css.book__page_categories}>
                {item.volumeInfo.categories &&
                  item.volumeInfo.categories.map((category, index) => (
                    <span
                      key={index + category}
                      className={css.book__page_category}
                    >
                      {category}
                    </span>
                  ))}
              </p>
              <h2 className={css.book__page_name}>{item.volumeInfo.title}</h2>
              <span className={css.book__page_autors}>
                {item.volumeInfo.authors &&
                  item.volumeInfo.authors.map((author, index) => (
                    <span key={index + author} className={css.book__page_autor}>
                      {author}
                    </span>
                  ))}
              </span>
              {item.volumeInfo.description && (
                <p className={css.book__page_description}>
                  {item.volumeInfo.description}
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
