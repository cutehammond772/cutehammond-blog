"use client";

import { useCallback, useEffect, useState } from "react";
import { Key } from "react-feather";

import useModal from "@/modal/useModal";
import useAuth from "@/auth/useAuth";

import Modal from "@/modal/Modal";
import AuthModal from "../modal/AuthModal";

export default function AuthOption() {
  // Settings Modal에 접근할 수 있습니다.
  const { hide, show } = useModal();
  const [visible, setVisible] = useState(false);

  const { id, state, refresh } = useAuth();

  const handler = useCallback(() => {
    // Settings Modal을 숨깁니다.
    hide();

    // Auth Modal을 활성화합니다.
    setVisible(true);
  }, [hide]);

  const close = useCallback(() => {
    // Settings Modal을 다시 보이게 합니다.
    show();

    // Auth Modal을 비활성화합니다.
    setVisible(false);
  }, [show]);

  useEffect(() => {
    if (state === "notLoaded") refresh();
  }, [state, refresh]);

  return (
    <>
      <button
        title="관리자 인증"
        onClick={handler}
        className="fp-bold grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-4 bg-beige-300 p-4 text-start dark:bg-charcoal-700"
      >
        <Key className="row-span-full self-center" />
        {state !== "isLoading" ? (
          <>
            <span>{id ? `관리자 로그아웃 : ${id}` : "관리자 인증"}</span>
            <span className="text-text-700 dark:text-text-300">
              {id
                ? `현재 관리자 상태를 로그아웃합니다.`
                : "관리자 인증을 수행합니다."}
            </span>
          </>
        ) : (
          <>
            <span>인증 정보를 확인하는 중</span>
            <span className="text-text-700 dark:text-text-300">
              서버에서 인증 정보를 불러오고 있습니다.
            </span>
          </>
        )}
      </button>

      {visible && (
        <Modal close={close}>
          <AuthModal />
        </Modal>
      )}
    </>
  );
}
