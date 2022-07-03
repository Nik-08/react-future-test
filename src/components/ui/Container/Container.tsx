import { FC, ReactNode } from "react";
import css from "./style.module.scss";

interface ContainerProps {
  children: ReactNode;
}

export const Container: FC<ContainerProps> = ({ children }) => {
  return <div className={css.container}>{children}</div>;
};
