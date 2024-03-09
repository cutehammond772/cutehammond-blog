"use client";

import { useState } from "react";
import { Settings as Setting } from "react-feather";
import Modal from "@/modal/Modal";
import Settings from "./Settings";

export default function SettingsButton() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button onClick={() => setVisible((visible) => !visible)}>
        <Setting className="fp-bold" />
      </button>

      {visible && (
        <Modal close={() => setVisible(false)}>
          <Settings />
        </Modal>
      )}
    </>
  );
}
