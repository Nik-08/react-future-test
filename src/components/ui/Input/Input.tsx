import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import css from "./style.module.scss";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const Input: FC<InputProps> = ({ ...rest }) => {
  return <input className={css.input} {...rest} />;
};
