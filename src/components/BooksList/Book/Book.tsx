import { FC } from "react";
import css from "../style.module.scss";
import bookCover from "../../../assets/bookCover.png";

export const Book: FC<BookItem> = ({ volumeInfo }) => {
  return (
    <div className={css.book__wrapper}>
      <div className={css.book__image}>
        {volumeInfo.imageLinks ? (
          <img src={volumeInfo.imageLinks.smallThumbnail} alt='' />
        ) : (
          <img src={bookCover} alt='' />
        )}
      </div>
      <div className={css.book__info}>
        {volumeInfo.categories && (
          <p className={css.book__category}>{volumeInfo.categories[0]}</p>
        )}
        <h3 className={css.book__name}>{volumeInfo.title}</h3>
        <span className={css.book__autors}>
          {volumeInfo.authors &&
            volumeInfo.authors.map((author, index) => (
              <span key={index + author} className={css.book__autor}>
                {author}
              </span>
            ))}
        </span>
      </div>
    </div>
  );
};
