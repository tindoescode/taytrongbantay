import styles from "../styles/Modal.module.css";
import tw, { css, styled } from "twin.macro";

export default function Modal({
  title = "Modal Title",
  onProcess = { text: "Save", f: () => {} },
  onCancel = { text: "Cancel", f: () => {} },
  children,
}) {
  const onModalClick = (e) => {
    e.preventDefault();
    onProcess.f();
  };

  const onModalCancel = (e) => {
    e.preventDefault();
    onCancel.f();
  };
  return (
    <>
      <div tw="z-10 fixed h-screen left-0 right-0 top-0 bottom-0 bg-pink-500 opacity-90"></div>
      <div
        id="Modal"
        css={[
          tw`w-screen p-3 overflow-y-auto md:w-11/12`,
          css`
            position: fixed;
            left: 50%;
            top: 50%;
            max-height: 80%;
            transform: translate(-50%, -50%);
            z-index: 50;
          `,
        ]}
      >
        <div
          className={`${styles.Modal}`}
          tw="p-4 mx-0 md:mx-4 bg-white shadow rounded-xl transform-gpu flex flex-col"
        >
          <div tw="text-2xl">{title}</div>
          <p tw="row-span-3">{children}</p>

          <div tw="flex justify-end">
            <button
              onClick={onModalClick}
              tw="p-4 bg-green-500 hover:bg-green-400 transition transform hover:-translate-y-1 rounded shadow mr-1 px-4 text-white"
            >
              {onProcess.text}
            </button>
            <button
              onClick={onModalCancel}
              tw="p-4 bg-red-500 hover:bg-red-400 transition transform hover:-translate-y-1 rounded shadow mr-1 px-4 text-white"
            >
              {onCancel.text}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
