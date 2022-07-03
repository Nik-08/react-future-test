import React, { DetailedHTMLProps, FC, SelectHTMLAttributes } from "react";
import css from "./style.module.scss";

interface SelectProps
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  items: string[];
}

export const Select: FC<SelectProps> = ({ items, ...rest }) => {
  return (
    <select className={css.select} {...rest}>
      {items.map((item, index) =>
        item === "health" ? (
          <option value={item} key={item + index}>
            {item + " fitness"}
          </option>
        ) : (
          <option value={item} key={item + index}>
            {item}
          </option>
        )
      )}
    </select>
  );
};
