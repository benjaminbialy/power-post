import React from "react";
import Button from "../Buttons/Button";

function Status({ text, setConfirm, styles = "" }) {
  return (
    <div
      className={
        "flex flex-col border-[3px] bg-white w-11/12 xs:w-96 rounded-xl self-center z-50 fixed p-4 text-gray-800 font-semibold fade-in-fast hover:cursor-pointer border-gray-200 " +
        styles
      }
    >
      <p className="w-full text-center mb-4">{text}</p>
      <div className="flex justify-evenly">
        <Button
          text="Cancel"
          onClick={() => setConfirm({ show: false, confirm: false })}
        />
        <Button
          text="Confirm"
          accent={true}
          onClick={() =>
            setConfirm((prev) => ({ ...prev, show: false, confirm: true }))
          }
        />
      </div>
    </div>
  );
}

export default Status;
