import React from "react";

export default function Modal({ open, setOpen, children }) {
  return (
    open && (
      <div
        onClick={() => setOpen(false)}
        className="fixed left-0 top-0 grid h-[100vh] w-[100vw] place-items-center bg-black/20"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-fit rounded-md bg-white p-4"
        >
          {children}
        </div>
      </div>
    )
  );
}
