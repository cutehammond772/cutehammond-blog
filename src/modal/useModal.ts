import { useContext } from "react";
import { ModalContext } from "./Modal";

export default function useModal() {
  return useContext(ModalContext);
}
