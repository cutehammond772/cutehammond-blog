"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSetRecoilState } from "recoil";
import { modalProviderState } from "./ModalProvider";

export class ModalProviderNotFoundError extends Error {}

export const ModalContext = createContext({ close: () => {} });

export default function Modal({
  children,
  close,
}: {
  children: React.ReactNode;
  close: () => void;
}) {
  const [isClient, setIsClient] = useState(false);
  const [modalKey, setModalKey] = useState<string>();
  const setModalProvider = useSetRecoilState(modalProviderState);

  // Client Only
  useEffect(() => {
    setIsClient(true);

    // Modal Key 생성
    const key = "modal-" + Date.now();
    setModalKey(key);
  }, []);

  // Modal Provider에 등록
  useEffect(() => {
    if (!modalKey) return;

    setModalProvider((modalProvider) => ({ ...modalProvider, [modalKey]: {} }));
  }, [modalKey, setModalProvider]);

  const _close = useCallback(() => {
    if (!modalKey) return;

    setModalProvider(({ [modalKey]: target, ...modalProvider }) => ({
      ...modalProvider,
    }));

    close();
  }, [modalKey, close, setModalProvider]);

  if (!isClient) return null;

  const element = document?.querySelector("#modal");

  // Modal Provider가 존재해야 한다.
  if (!element)
    throw new ModalProviderNotFoundError("Modal Provider Not Found");

  return createPortal(
    <ModalContext.Provider value={{ close: _close }}>
      {children}
    </ModalContext.Provider>,
    element
  );
}
