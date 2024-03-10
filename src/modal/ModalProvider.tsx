"use client";

import {
  DefaultValue,
  atom,
  selector,
  selectorFamily,
  useRecoilValue,
} from "recoil";

export interface Modals {
  [key: string]: { hide: boolean; close?: boolean };
}

// 다양한 모달을 관리
export const modalProviderState = atom<Modals>({
  key: "ModalProvider",
  default: {},
});

// 특정 Modal에 대한 Selector
export const modalSelector = selectorFamily({
  key: "ModalSelector",
  get:
    (key: string) =>
    ({ get }) =>
      get(modalProviderState)[key],
  set:
    (key: string) =>
    ({ set }, newValue) =>
      set(modalProviderState, (prevState) => {
        if (newValue instanceof DefaultValue) return prevState;

        // Modal을 닫는 경우 close에 true를 지정한다.
        if (prevState[key] && newValue.close) {
          const { [key]: target, ...others } = prevState;
          return others;
        }

        return { ...prevState, [key]: newValue };
      }),
});

// 현재 등록된 모달이 존재하는지 확인
const modalCountSelector = selector({
  key: "ModalAvailableCount",
  get: ({ get }) => {
    return Object.keys(get(modalProviderState)).length > 0;
  },
});

export default function ModalProvider() {
  const available = useRecoilValue(modalCountSelector);

  return (
    <div
      id="modal"
      className={`fixed ${available ? "backdrop-blur-sm" : "pointer-events-none"} z-50 h-screen w-screen`}
    />
  );
}
