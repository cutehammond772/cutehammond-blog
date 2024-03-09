"use client";

import useModal from "@/modal/useModal";
import { X } from "react-feather";
import Refresh from "./option/Refresh";

export default function SettingsModal() {
  const { close } = useModal();

  return (
    <div className="mx-auto flex h-screen items-center justify-center">
      <div className="flex h-screen w-screen flex-col gap-4 bg-beige-100 p-4 shadow-xl dark:bg-charcoal-900 md:h-auto md:w-1/2 md:p-8">
        {/* Header Section */}
        <div className="flex flex-row items-center justify-between">
          <span className="f3-bold">설정</span>
          <button title="설정 창 닫기" onClick={close}>
            <X className="f3-bold" />
          </button>
        </div>

        {/* Main Section */}
        <div className="flex flex-grow flex-col justify-center">
          <Refresh />
        </div>
      </div>
    </div>
  );
}
