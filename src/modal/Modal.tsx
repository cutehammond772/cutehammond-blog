"use client";

import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRecoilState } from "recoil";
import { modalSelector } from "./ModalProvider";

export class ModalProviderNotFoundError extends Error {}

export const ModalContext = createContext({
  close: () => {},
  hide: () => {},
  show: () => {},
});

export default function Modal({
  children,
  close,
}: {
  children: React.ReactNode;
  close: () => void;
}) {
  const [isClient, setIsClient] = useState(false);
  const modalKey = useRef<string>("modal-" + Date.now());
  const [modal, setModal] = useRecoilState(modalSelector(modalKey.current));

  // Client Only
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Modal Provider에 등록
  useEffect(() => {
    if (modal) return;

    setModal((prev) => ({ ...prev, hide: false }));
  }, [modal, setModal]);

  const _close = useCallback(() => {
    setModal((prev) => ({ ...prev, close: true }));
    close();
  }, [setModal, close]);

  const _hide = useCallback(() => {
    setModal((prev) => ({ ...prev, hide: true }));
  }, [setModal]);

  const _show = useCallback(() => {
    setModal((prev) => ({ ...prev, hide: false }));
  }, [setModal]);

  if (!isClient) return null;

  const element = document?.querySelector("#modal");

  // Modal Provider가 존재해야 한다.
  if (!element)
    throw new ModalProviderNotFoundError("Modal Provider Not Found");

  return createPortal(
    <ModalContext.Provider value={{ close: _close, hide: _hide, show: _show }}>
      <div
        className={`${modal?.hide ? "invisible" : "visible"} absolute h-screen w-screen`}
      >
        {children}
      </div>
    </ModalContext.Provider>,
    element
  );
}
