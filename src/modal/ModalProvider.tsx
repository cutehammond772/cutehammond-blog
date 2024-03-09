"use client";

import { atom, selector, useRecoilValue } from "recoil";

export interface Modals {
  [key: string]: {};
}

// 다양한 모달을 관리
export const modalProviderState = atom<Modals>({
  key: "ModalProvider",
  default: {},
});

// 현재 등록된 모달이 존재하는지 확인
const modalAvailable = selector({
  key: "ModalAvailableCount",
  get: ({ get }) => {
    return Object.keys(get(modalProviderState)).length > 0;
  },
});

export default function ModalProvider() {
  const available = useRecoilValue(modalAvailable);

  return (
    <div
      id="modal"
      className={`fixed ${available ? "backdrop-blur-sm" : "pointer-events-none"} z-50 h-screen w-screen`}
    />
  );
}
