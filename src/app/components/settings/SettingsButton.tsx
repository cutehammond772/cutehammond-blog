"use client";

import { useState } from "react";
import { Settings as Setting } from "react-feather";

import Modal from "@/modal/Modal";
import SettingsModal from "./modal/SettingsModal";

export default function SettingsButton() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button title="설정" onClick={() => setVisible((visible) => !visible)}>
        <Setting className="fp-bold" />
      </button>

      {visible && (
        <Modal close={() => setVisible(false)}>
          <SettingsModal />
        </Modal>
      )}
    </>
  );
}
