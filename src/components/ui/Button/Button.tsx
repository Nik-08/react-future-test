import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import css from "./style.module.scss";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
}

export const Button: FC<ButtonProps> = ({ text, ...rest }) => {
  return (
    <button className={css.button} {...rest}>
      {text}
    </button>
  );
};
